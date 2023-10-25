<template>
  <div class="popular_articles">
    <!-- <div class="body_container"> -->
    <div class="popular_articles__block">
      <div class="popular_articles__block__heading">
        <div class="popular_articles__block__heading__title"></div>
        <div class="body_container">
          <div class="popular_articles__block__heading__name">
            <div class="body_container">
              <div class="body_article__breadcrumb">
                <a :href="'/'"> Trang chủ </a>
                >
                <router-link :to="'article'"> Blog </router-link>
              </div>
              <h1>All Blog</h1>
              <div class="popular_articles__block__heading__name__description">
                Blog giúp các nhà đào tạo mới xây dựng và nuôi dưỡng cộng đồng
                vững mạnh từ nền móng.
              </div>
            </div>

            <!-- <h1>{{ titleArticle }} </h1> -->
          </div>
        </div>
      </div>

      <div class="body_container">
        <div class="popular_articles__block__body container-fluid">
          <div class="row">
            <div
              class="popular_articles__block__item col-12 col-sm-4"
              v-for="(articleItem, index) in dataArticle"
              :key="'item_articles_' + index"
            >
              <div class="popular_articles__block__item__card">
                <a :href="'/post/' + articleItem.post_slug">
                  <template v-if="articleItem.post_avatar">
                    <div class="popular_articles__block__item__card__avatar">
                      <img
                        :src="articleItem.post_avatar.media_thumbnail"
                        v-if="validURL(articleItem.post_avatar.media_thumbnail)"
                        :alt="articleItem.post_title"
                      />
                    </div>
                  </template>

                  <div class="popular_articles__block__item__card__meta">
                    <div class="popular_articles__block__item__card__title">
                      {{ articleItem.post_title }}
                    </div>

                    <!-- <div
                      class="popular_articles__block__item__card__description"
                    >
                      {{ truncateString(articleItem.post_excerpt, 85, "...") }}
                    </div> -->
                    <div class="popular_articles__block__item__card__bottom">
                      Đọc thêm
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                          d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->

    <div class="body_container" v-if="isLoading">
      <div class="article__loading">
        <div class="spinner-border m-5" role="status"></div>
      </div>
    </div>

    <div
      class="advisor_category__empty w-100"
      v-if="(!dataArticle || dataArticle.length === 0) && !isLoading"
    >
      <img src="../../assets/media/withdrawal.png" />
      <div class="advisor_category__empty__heading">
        Danh sách bài viết trống!
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// import { stringProcess } from "../modules/stringProcess";
import { articleService } from "../store/article.store.reducer";

export default {
  name: "ListArticle",

  data() {
    return {
      titleArticle: "Articles",
      dataArticle: [],
      isLoading: false,
      currentPage: 1,
      currentLimit: 12,
      isStopGetArticle: false,
      idArticle: "",
    };
  },

  created() {
    if (process.client) {
      // Mã JavaScript dựa trên window chỉ chạy trên máy khách
      const currentURL = window.location.href;
      //   console.log(currentURL);
      const urlObj = new URL(currentURL);

      // Lấy giá trị của tham số "post_category" từ chuỗi truy vấn
      const id = urlObj.searchParams.get("post_category");
      this.idArticle = id;

      this.handleGetPopularArticles("news", this.currentPage, id);
    } else {
      this.handleGetPopularArticles("news", this.currentPage, "");
    }
    let self = this;
    if (process.client) {
      document.addEventListener("scroll", self.handleScroll, true);
    }
  },
  watch: {
    // locale(e) {
    //   this.handleGetPopularArticles("news", this.currentPage, e);
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 100);
    // },
  },

  methods: {
    // truncateString(string, number, text) {
    //   return stringProcess.truncateString(string, number, text);
    // },
    momentNew(dateTime, format) {
      return moment(dateTime).format(format);
    },
    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },

    handleScroll() {
      var self = this;
      if (self.$route.path !== "/post") {
        window.removeEventListener("scroll", self.handleScroll, true);
      }

      // Tính toán phần còn lại của cuộn để load thêm câu hỏi.
      if (!self.isLoading && !self.isStopGetArticle) {
        var remaining =
          document.documentElement.scrollHeight -
          (window.innerHeight + window.pageYOffset);
        if (remaining < 400) {
          let newPage = this.currentPage + 1;
          self.handleGetPopularArticles("news", newPage, this.idArticle);
          this.currentPage = newPage;
        }
      }
    },

    handleGetPopularArticles(articleType, articlePage, articleCategory) {
      this.isLoading = true;
      articleService
        .getArticleByType(
          articleType,
          articlePage,
          articleCategory,
          this.currentLimit
        )
        .then((response) => {
          if (response && response.length) {
            this.dataArticle = this.dataArticle.concat(response);
          } else {
            this.isStopGetArticle = true;
          }

          this.isLoading = false;
        })
        .catch((error) => {
          //Error
          this.isLoading = false;
          this.isStopGetArticle = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

:root {
  --color-secondary: #b966e7;
  --color-primary: #2f57ef;
}

.body_article {
  width: 100%;
  float: left;
  padding-bottom: 40px;

  &__breadcrumb {
    // margin-top: 30px;
    width: 100%;
    float: left;
    font-size: 16px;
    margin-bottom: 10px;
    z-index: 99;
    position: inherit;
    // padding: 10px;

    a {
      color: $primaryBackground;
    }
  }
}

.popular_articles {
  width: 100%;
  float: left;

  h1 {
    width: 100%;
    font-weight: 700;
    font-size: 36px;
    font-family: $fontFamily;
    // margin-left: 10px;
    // margin-bottom: 5px;
    padding: 10px 0;

    @include breakpoint(phablet) {
      font-size: 26px;
    }
  }

  &__block {
    width: 100%;
    float: left;
    margin-top: 10px;

    &__heading {
      width: 100%;
      float: left;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      position: relative;
      margin: 0 auto;
      padding: 60px 0px 235px;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;

      &__title {
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -4;
        background: linear-gradient(
          270deg,
          #b966e7 0%,
          #2f57ef 100%
        ) !important;
      }
    }

    &__name {
      width: calc(100% - 150px);
      float: left;
      font-size: 26px;
      font-family: $fontFamily;

      h2 {
        font-size: 26px;
        color: $textColor;
        font-weight: 700;
      }
    }
    .popular_articles__block__heading__name__description {
      font-size: 18px;
      font-weight: 400;
      color: var(--color-heading);
    }

    &__body {
      width: calc(100% + 16px);
      margin-top: 16px;
      margin-left: -8px;
      margin-right: -8px;
      padding-bottom: 10px;
    }

    &__item {
      padding: 8px;
      margin-top: 8px;

      &__card:hover {
        transform: scale(
          1.05
        ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
        transition: 0.2s all ease-in-out;
      }

      &__card {
        width: 100%;
        height: 100%;
        // border: 2px solid #767676;
        border-radius: 8px;
        box-sizing: border-box;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        &__avatar {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          height: 200px;
          position: relative;
          padding: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        &__meta {
          width: 100%;
          float: left;
          padding: 20px;
        }

        &__title {
          font-weight: 700;
          font-size: 22px;
          color: $primaryBackground;
          float: left;
          width: 100%;
          word-wrap: break-word;
          margin-top: 4px;
          font-family: $fontFamily;
          margin-bottom: 10px;
        }

        &__description {
          width: 100%;
          float: left;
          font-size: 16px;
          font-weight: 200;
          margin-top: 4px;
          word-wrap: break-word;
          font-family: $fontFamily;
          margin-bottom: 10px;
          color: $primaryBackground;
        }

        &__bottom {
          width: 100%;
          float: left;
          font-size: 16px;
          font-weight: 600;
          margin-top: 4px;
          word-wrap: break-word;
          font-family: $fontFamily;
          margin-bottom: 10px;
          color: $primaryBackground;
        }
      }
    }

    &__more {
      width: 150px;
      float: left;
      text-align: right;
      cursor: pointer;
      user-select: none;

      svg {
        width: 18px;
        height: 18px;
        fill: #aaa;
        margin-top: -2px;
      }
    }
  }

  .article__loading {
    text-align: center;
    color: #aaa;
  }

  .advisor_category {
    &__empty {
      width: 100%;
      text-align: center;
      padding: 0 0 100px 0;

      img {
        width: 200px;
        margin: 0 auto;
        margin-top: 100px;
      }

      &__heading {
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #888;
      }
    }
  }
}
</style>
