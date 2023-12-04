import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import moment from 'moment';
import { a as articleService } from './article.store.reducer-8158fd50.mjs';
import { resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import 'vue-bundle-renderer/runtime';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'axios';

const _imports_0 = "" + buildAssetsURL("withdrawal.47afbf96.png");
const _sfc_main = {
  name: "ListArticle",
  data() {
    return {
      titleArticle: "Articles",
      dataArticle: [],
      isLoading: false,
      currentPage: 1,
      currentLimit: 12,
      isStopGetArticle: false,
      idArticle: ""
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
          self.handleGetPopularArticles("news", newPage, this.idArticle);
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
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "popular_articles" }, _attrs))} data-v-4c6a200c><div class="popular_articles__block" data-v-4c6a200c><div class="popular_articles__block__heading" data-v-4c6a200c><div class="popular_articles__block__heading__title" data-v-4c6a200c></div><div class="body_container" data-v-4c6a200c><div class="popular_articles__block__heading__name" data-v-4c6a200c><div class="body_container" data-v-4c6a200c><div class="body_article__breadcrumb" data-v-4c6a200c><a${ssrRenderAttr("href", "/")} data-v-4c6a200c> Trang ch\u1EE7 </a> &gt; `);
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
  _push(`</div><h1 data-v-4c6a200c>All Blog</h1><div class="popular_articles__block__heading__name__description" data-v-4c6a200c> Blog gi\xFAp c\xE1c nh\xE0 \u0111\xE0o t\u1EA1o m\u1EDBi x\xE2y d\u1EF1ng v\xE0 nu\xF4i d\u01B0\u1EE1ng c\u1ED9ng \u0111\u1ED3ng v\u1EEFng m\u1EA1nh t\u1EEB n\u1EC1n m\xF3ng. </div></div></div></div></div><div class="body_container" data-v-4c6a200c><div class="popular_articles__block__body container-fluid" data-v-4c6a200c><div class="row" data-v-4c6a200c><!--[-->`);
  ssrRenderList($data.dataArticle, (articleItem, index2) => {
    _push(`<div class="popular_articles__block__item col-12 col-sm-4" data-v-4c6a200c><div class="popular_articles__block__item__card" data-v-4c6a200c><a${ssrRenderAttr("href", "/post/" + articleItem.post_slug)} data-v-4c6a200c>`);
    if (articleItem.post_avatar) {
      _push(`<div class="popular_articles__block__item__card__avatar" data-v-4c6a200c>`);
      if ($options.validURL(articleItem.post_avatar.media_thumbnail)) {
        _push(`<img${ssrRenderAttr("src", articleItem.post_avatar.media_thumbnail)}${ssrRenderAttr("alt", articleItem.post_title)} data-v-4c6a200c>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div class="popular_articles__block__item__card__meta" data-v-4c6a200c><div class="popular_articles__block__item__card__title" data-v-4c6a200c>${ssrInterpolate(articleItem.post_title)}</div><div class="popular_articles__block__item__card__bottom" data-v-4c6a200c> \u0110\u1ECDc th\xEAm <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" data-v-4c6a200c><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" data-v-4c6a200c></path></svg></div></div></a></div></div>`);
  });
  _push(`<!--]--></div></div></div></div>`);
  if ($data.isLoading) {
    _push(`<div class="body_container" data-v-4c6a200c><div class="article__loading" data-v-4c6a200c><div class="spinner-border m-5" role="status" data-v-4c6a200c></div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ((!$data.dataArticle || $data.dataArticle.length === 0) && !$data.isLoading) {
    _push(`<div class="advisor_category__empty w-100" data-v-4c6a200c><img${ssrRenderAttr("src", _imports_0)} data-v-4c6a200c><div class="advisor_category__empty__heading" data-v-4c6a200c> Danh s\xE1ch b\xE0i vi\u1EBFt tr\u1ED1ng! </div></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4c6a200c"]]);

export { index as default };
//# sourceMappingURL=index-e9c54880.mjs.map
