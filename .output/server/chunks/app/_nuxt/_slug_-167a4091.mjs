import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { a as articleService } from './article.store.reducer-8158fd50.mjs';
import { useRoute } from 'vue-router';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
import 'axios';

const _imports_0 = "" + buildAssetsURL("bg-image-10.4af1a41e.jpeg");
const _sfc_main = {
  name: "article_detail",
  data() {
    return {
      dataArticle: [],
      dataListArticle: []
    };
  },
  created() {
    const route = useRoute();
    this.handleGetPopularArticles(route.params.slug);
  },
  watch: {
    dataArticle(e) {
      var _a;
      let categoryId = (_a = e == null ? void 0 : e.post_category) == null ? void 0 : _a._id;
      this.handleGetListArticles("news", 1, categoryId);
    }
  },
  methods: {
    handleGetPopularArticles(params) {
      articleService.getArticleBySlug(params).then((response) => {
        if (response) {
          this.dataArticle = response.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    handleGetListArticles(articleType, articlePage, articleCategory) {
      this.isLoading = true;
      articleService.getArticleByType(articleType, articlePage, articleCategory, "3").then((response) => {
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
      }).catch((error) => {
        this.isLoading = false;
        this.isStopGetArticle = true;
      });
    },
    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
        "i"
      );
      return !!pattern.test(str);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "body_article",
    id: "body_article"
  }, _attrs))}><div class="body_container"><div class="body_article__header"><div class="body_article__header__wrapper"><img${ssrRenderAttr("src", _imports_0)} alt="Education Images"></div><div class="body_article__header__content"><h1 class="article_h1">${ssrInterpolate($data.dataArticle.post_title)}</h1><div class="body_article__header__content__excerpt">${ssrInterpolate($data.dataArticle.post_excerpt)}</div></div></div><div class="body_article__breadcrumb"><img${ssrRenderAttr("src", (_b = (_a = $data.dataArticle) == null ? void 0 : _a.post_avatar) == null ? void 0 : _b.media_thumbnail)} alt="Education Images"><div class="article_content">${$data.dataArticle.post_content}</div>`);
  if ($data.dataListArticle && $data.dataListArticle.length > 0) {
    _push(`<div class="article_list"><h1 class="article_h1">B\xE0i vi\u1EBFt t\u01B0\u01A1ng t\u1EF1</h1><!--[-->`);
    ssrRenderList($data.dataListArticle, (articleItem, index) => {
      _push(`<div class="body_article__breadcrumb__card"><a${ssrRenderAttr("href", "/post/" + articleItem.post_slug)}>`);
      if (articleItem.post_avatar) {
        _push(`<div class="body_article__breadcrumb__card__avatar">`);
        if ($options.validURL(articleItem.post_avatar.media_thumbnail)) {
          _push(`<img${ssrRenderAttr("src", articleItem.post_avatar.media_thumbnail)}${ssrRenderAttr("alt", articleItem.post_title)}>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="body_article__breadcrumb__card__body"><div class="body_article__breadcrumb__card__body__title">${ssrInterpolate(articleItem.post_title)}</div><div class="body_article__breadcrumb__card__body__bottom"> \u0110\u1ECDc th\xEAm <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg></div></div></a><br></div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/post/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-167a4091.mjs.map
