<template>
  <div class="body_article" id="body_article">
    <div class="body_container">
      <div class="body_article__header">
        <div class="body_article__header__wrapper">
          <img src="../../public/bg-image-10.jpeg" alt="Education Images" />
        </div>
        <div class="body_article__header__content">
          <h1 class="article_h1">{{ dataArticle.post_title }}</h1>
          <div class="body_article__header__content__excerpt">
            {{ dataArticle.post_excerpt }}
          </div>
        </div>
      </div>
      <div class="body_article__breadcrumb">
        <img
          :src="dataArticle?.post_avatar?.media_thumbnail"
          alt="Education Images"
        />

        <div class="article_content" v-html="dataArticle.post_content"></div>

        <div
          class="article_list"
          v-if="dataListArticle && dataListArticle.length > 0"
        >
          <h1 class="article_h1">Bài viết tương tự</h1>

          <div
            class="body_article__breadcrumb__card"
            v-for="(articleItem, index) in dataListArticle"
            :key="'item_articles_' + index"
          >
            <a :href="'/post/' + articleItem.post_slug">
              <!-- <a href="#" style="display: none"> -->
              <div
                class="body_article__breadcrumb__card__avatar"
                v-if="articleItem.post_avatar"
              >
                <img
                  :src="articleItem.post_avatar.media_thumbnail"
                  v-if="validURL(articleItem.post_avatar.media_thumbnail)"
                  :alt="articleItem.post_title"
                />
              </div>

              <div class="body_article__breadcrumb__card__body">
                <div class="body_article__breadcrumb__card__body__title">
                  {{ articleItem.post_title }}
                </div>
                <div class="body_article__breadcrumb__card__body__bottom">
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
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { articleService } from "../../store/article.store.reducer";
import { useRoute } from "vue-router";

export default {
  name: "article_detail",

  data() {
    return {
      dataArticle: [],
      dataListArticle: [],
    };
  },

  created() {
    const route = useRoute();

    this.handleGetPopularArticles(route.params.slug);
  },

  watch: {
    dataArticle(e) {
      let categoryId = e?.post_category?._id;
      this.handleGetListArticles("news", 1, categoryId);
    },
  },

  methods: {
    handleGetPopularArticles(params) {
      articleService
        .getArticleBySlug(params)
        .then((response) => {
          if (response) {
            this.dataArticle = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleGetListArticles(articleType, articlePage, articleCategory) {
      this.isLoading = true;
      articleService
        .getArticleByType(articleType, articlePage, articleCategory, "3")
        .then((response) => {
          if (response && response.length) {
            const optionType = [];

            for (let item of response) {
              if (item._id !== this.dataArticle._id) {
                optionType.push(item);
              }
            }

            console.log(optionType, "optionType");
            this.dataListArticle = optionType;
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
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/main.scss";

.body_article {
  width: 100%;
  float: left;
  // margin: 10px;
  position: relative;
  padding: 10px;
  content: "";
  // margin-top: 80px;
  @include breakpoint(phablet) {
    top: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  h1.article_h1 {
    width: 100%;
    font-weight: 700;
    font-size: 36px;
    margin-top: 10px;
    padding: 10px;

    @include breakpoint(phablet) {
      font-size: 26px;
      text-align: center;
    }
  }

  figure,
  .image {
    max-width: 100% !important;
    margin: 16px 0 !important;
  }

  .article_content {
    width: 100%;
    float: left;
    margin-top: 20px;
    margin-bottom: 50px;
    padding: 10px;
    max-width: 100%;
    // box-sizing: border-box;
    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @include breakpoint(phablet) {
      width: 80%;
    }

    img {
      max-width: 100% !important;
      margin: 0 auto;
      border-radius: 16px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    text-align: justify;

    h2,
    h3,
    h4,
    h5 {
      font-size: 22px;
      font-weight: 700;
      color: $primaryColor;
      text-align: left;
      width: auto;

      float: left;
      margin-top: 16px;
      margin-bottom: 10px;
    }

    p,
    li {
      font-size: 16px !important;
      font-family: $fontFamily !important;
      color: $primaryBackground;
      line-height: 1.5;
      width: 100%;
      float: left;
      font-weight: 400;
      padding-bottom: 0;
      word-wrap: break-word;
      word-break: break-word;
      -webkit-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;
      white-space: normal !important;

      div {
        width: 100% !important;
      }

      iframe {
        border: 0;
        margin: 0 0 20px 0;
      }
    }

    span {
      font-size: 16px !important;
      font-family: $fontFamily !important;
      color: $primaryBackground;
      line-height: 1.5;
      width: 100%;
      padding-bottom: 0;

      div {
        width: 100% !important;
      }

      iframe {
        border: 0;
        margin: 0 0 20px 0;
      }
    }

    img {
      margin: 15px 0 15px 0;
      max-width: 100% !important;
      height: auto !important;
    }

    p {
      margin: 5px 0;
    }

    iframe {
      border: 0;
      width: 100%;
      max-height: 500px;
    }

    figure {
      max-width: 100%;
      text-align: center;
    }

    h2,
    h3,
    h4 {
      font-weight: 900;
      color: $primaryBackground;
      margin-top: 16px;
      font-size: 22px;
      margin-bottom: 16px;
    }
  }

  .article_list {
    width: 100%;
    display: inline-block;
  }

  .body_article {
    width: 100%;
    float: left;
    padding-bottom: 40px;

    &__header {
      position: relative !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      flex-direction: column !important;
      width: 100% !important;
      padding: 44px 140px 50px !important;
      background: #fff !important;
      border-radius: 4px 4px 0 0 !important;
      margin: 120px auto 0 !important;

      @include breakpoint(phablet) {
        padding: 0px !important;
      }

      &__wrapper {
        display: block !important;
        position: absolute !important;
        top: -243px !important;
        bottom: -250px !important;
        left: 50% !important;
        -webkit-transform: translateX(-50%) !important;
        -moz-transform: translateX(-50%) !important;
        transform: translateX(-50%) !important;
        height: -moz-calc(100% + 243px) !important;
        height: calc(100% + 243px) !important;
        width: 100vw !important;
        min-width: 1024px !important;
        z-index: -4 !important;
        img {
          position: absolute !important;
          inset: 0px !important;
          box-sizing: border-box !important;
          padding: 0px !important;
          border: none !important;
          margin: auto !important;
          display: block !important;
          width: 0px !important;
          height: 0px !important;
          min-width: 100% !important;
          max-width: 100% !important;
          min-height: 100% !important;
          max-height: 100% !important;
        }
      }

      &__content {
        text-align: center !important;
        &__excerpt {
          font-size: 18px;
        }
      }
    }

    &__breadcrumb {
      // margin-top: 30px;
      width: 100%;
      float: left;
      font-size: 16px;
      margin-bottom: 10px;
      padding: 10px;
      box-sizing: border-box;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      padding: 50px 100px;

      @include breakpoint(phablet) {
        padding: 0;
      }

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        // box-sizing: border-box;
        // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }

      a {
        color: $primaryBackground;
      }

      &__card:hover {
        transform: scale(
          1.01
        ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
        transition: 0.2s all ease-in-out;
      }

      &__card {
        display: flex;
        max-height: 150px;
        border-radius: 2px;
        align-items: center;
        height: 100%;
        margin-top: 30px !important;
        padding: 0;
        box-sizing: border-box;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        @include breakpoint(small_phablet) {
          display: inline;
        }

        a {
          color: $primaryBackground;
          display: contents;
          // color: var(--color-heading);
          text-decoration: none;
          outline: none;
          transition: 0.3s;
        }

        &__avatar {
          width: 290px;
          border-radius: 2px;
          overflow: hidden;
          position: relative;
          padding: 0;
          height: 150px;
          min-width: 290px;
          min-height: 150px;

          @include breakpoint(small_phablet) {
            width: auto;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        &__body {
          padding: 30px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          &__title {
            font-size: 26px;
            font-weight: 700;
          }

          &__bottom {
            display: flex;
            // justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
        }
      }
    }
  }
}
</style>
