import moment from "moment";
import { a as articleService } from "./article.store.reducer-8158fd50.js";
import { resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "devalue";
import "defu";
import "klona";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "h3";
import "ufo";
import "jquery";
import "axios";
const _imports_0 = "" + __buildAssetsURL("withdrawal.47afbf96.png");
const index_vue_vue_type_style_index_0_scoped_0339d6c9_lang = "";
const _sfc_main = {
  name: "ListArticle",
  data() {
    return {
      titleArticle: "Articles",
      dataArticle: [],
      isLoading: false,
      currentPage: 1,
      currentLimit: 12,
      isStopGetArticle: false
    };
  },
  created() {
    {
      this.handleGetPopularArticles("news", this.currentPage, "");
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
        "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return !!pattern.test(str);
    },
    handleScroll() {
      var self = this;
      if (self.$route.path !== "/post") {
        window.removeEventListener("scroll", self.handleScroll, true);
      }
      if (!self.isLoading && !self.isStopGetArticle) {
        var remaining = document.documentElement.scrollHeight - (window.innerHeight + window.pageYOffset);
        if (remaining < 400) {
          let newPage = this.currentPage + 1;
          self.handleGetPopularArticles("news", newPage);
          this.currentPage = newPage;
        }
      }
    },
    handleGetPopularArticles(articleType, articlePage, articleCategory) {
      this.isLoading = true;
      articleService.getArticleByType(
        articleType,
        articlePage,
        articleCategory,
        this.currentLimit
      ).then((response) => {
        if (response && response.length) {
          this.dataArticle = this.dataArticle.concat(response);
        } else {
          this.isStopGetArticle = true;
        }
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.isStopGetArticle = true;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "popular_articles" }, _attrs))} data-v-0339d6c9><div class="popular_articles__block" data-v-0339d6c9><div class="popular_articles__block__heading" data-v-0339d6c9><div class="popular_articles__block__heading__title" data-v-0339d6c9></div><div class="body_container" data-v-0339d6c9><div class="popular_articles__block__heading__name" data-v-0339d6c9><div class="body_container" data-v-0339d6c9><div class="body_article__breadcrumb" data-v-0339d6c9><a${ssrRenderAttr("href", "/")} data-v-0339d6c9> Trang chủ </a> &gt; `);
  _push(ssrRenderComponent(_component_router_link, { to: "article" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Blog `);
      } else {
        return [
          createTextVNode(" Blog ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><h1 data-v-0339d6c9>All Blog</h1><div class="popular_articles__block__heading__name__description" data-v-0339d6c9> Blog giúp các nhà đào tạo mới xây dựng và nuôi dưỡng cộng đồng vững mạnh từ nền móng. </div></div></div></div></div><div class="body_container" data-v-0339d6c9><div class="popular_articles__block__body container-fluid" data-v-0339d6c9><div class="row" data-v-0339d6c9><!--[-->`);
  ssrRenderList($data.dataArticle, (articleItem, index2) => {
    _push(`<div class="popular_articles__block__item col-12 col-sm-4" data-v-0339d6c9><div class="popular_articles__block__item__card" data-v-0339d6c9><a${ssrRenderAttr("href", "/post/" + articleItem.post_slug)} data-v-0339d6c9>`);
    if (articleItem.post_avatar) {
      _push(`<div class="popular_articles__block__item__card__avatar" data-v-0339d6c9>`);
      if ($options.validURL(articleItem.post_avatar.media_thumbnail)) {
        _push(`<img${ssrRenderAttr("src", articleItem.post_avatar.media_thumbnail)}${ssrRenderAttr("alt", articleItem.post_title)} data-v-0339d6c9>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="popular_articles__block__item__card__meta" data-v-0339d6c9><div class="popular_articles__block__item__card__title" data-v-0339d6c9>${ssrInterpolate(articleItem.post_title)}</div><div class="popular_articles__block__item__card__bottom" data-v-0339d6c9> Đọc thêm <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" data-v-0339d6c9><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" data-v-0339d6c9></path></svg></div></div></a></div></div>`);
  });
  _push(`<!--]--></div></div></div></div>`);
  if ($data.isLoading) {
    _push(`<div class="body_container" data-v-0339d6c9><div class="article__loading" data-v-0339d6c9><div class="spinner-border m-5" role="status" data-v-0339d6c9></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ((!$data.dataArticle || $data.dataArticle.length === 0) && !$data.isLoading) {
    _push(`<div class="advisor_category__empty w-100" data-v-0339d6c9><img${ssrRenderAttr("src", _imports_0)} data-v-0339d6c9><div class="advisor_category__empty__heading" data-v-0339d6c9> Danh sách bài viết trống! </div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/post/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0339d6c9"]]);
export {
  index as default
};
//# sourceMappingURL=index-ed4bd63e.js.map