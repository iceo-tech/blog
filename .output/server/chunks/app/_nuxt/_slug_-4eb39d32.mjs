import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { a as articleService } from './article.store.reducer-8158fd50.mjs';
import { useRoute } from 'vue-router';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
      dataArticle: []
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
      articleService.getArticleBySlug(params).then((response) => {
        if (response) {
          this.dataArticle = response.data;
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "body_article",
    id: "body_article"
  }, _attrs))}><div class="body_container"><div class="body_article__header"><div class="body_article__header__wrapper"><img${ssrRenderAttr("src", _imports_0)} alt="Education Images"></div><div class="body_article__header__content"><h1 class="article_h1">${ssrInterpolate($data.dataArticle.post_title)}</h1><div class="body_article__header__content__excerpt">${ssrInterpolate($data.dataArticle.post_excerpt)}</div></div></div><div class="body_article__breadcrumb"><img${ssrRenderAttr("src", (_b = (_a = $data.dataArticle) == null ? void 0 : _a.post_avatar) == null ? void 0 : _b.media_thumbnail)} alt="Education Images"><div class="article_content">${$data.dataArticle.post_content}</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/post/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-4eb39d32.mjs.map
