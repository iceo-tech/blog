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
    };
  },

  created() {
    const route = useRoute();
    console.log(route, "route");

    this.handleGetPopularArticles(route.params.slug);
  },

  methods: {
    handleGetPopularArticles(params) {
      console.log(params);
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
    // box-sizing: border-box;
    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

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

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        // box-sizing: border-box;
        // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }

      a {
        color: $primaryColor;
      }
    }
  }
}
</style>
