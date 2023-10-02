var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { a as axiosGetInstanceBackend } from "../server.mjs";
class articleSearch {
  constructor() {
    __publicField(this, "getPopularArticle", async (page, limit) => {
      let dataUrl = `https://mainapi.fudaly.appuni.io/api/posts?post_type=news&page=${page}&limit=${limit}`;
      return await axiosGetInstanceBackend(dataUrl, {});
    });
    // getArticleList = async (type: string, page: number, limit: number) => {
    //   let dataUrl = `https://mainapi.fudaly.appuni.io/api/posts?post_type=${type}&page=${page}&limit=${limit}`;
    //   return await axiosGetInstanceBackend(dataUrl, {});
    // };
    // getArticleList = async (type: string, page: number, limit: number) => {
    //   let dataUrl = `
    //   https://mainapi.whiteg.appuni.io/api/post/list?page=${page}&limit=${limit}&order_by=DESC`;
    //   return await axiosGetInstanceBackend(dataUrl, {});
    // };
    __publicField(this, "getArticleList", async (type, page, category, limit) => {
      let dataUrl = `
    https://education-api.iceo.tech/api/post/list?page=${page}&limit=${limit}&order_by=DESC&post_category=${category || ""}`;
      return await axiosGetInstanceBackend(dataUrl, {});
    });
  }
}
const articleHelper = new articleSearch();
class articleClass {
  constructor() {
    __publicField(this, "getPopularArticle", async (page, limit) => {
      return await articleHelper.getPopularArticle(page, limit).then((response) => {
        if (response && response.data) {
          return response.data;
        } else {
          return [];
        }
      }).catch((error) => {
        return error;
      });
    });
    __publicField(this, "getArticleByType", async (type, page, category, limit) => {
      return await articleHelper.getArticleList(type, page, category, limit).then((response) => {
        if (response && response.data) {
          return response.data;
        } else {
          return [];
        }
      }).catch((error) => {
        return error;
      });
    });
    __publicField(this, "getArticleBySlug", async (slug) => {
      if (!slug) {
        return null;
      }
      let dataUrl = `https://education-api.iceo.tech/api/post/detail/${slug}`;
      return await axiosGetInstanceBackend(dataUrl, {});
    });
  }
}
const articleService = new articleClass();
export {
  articleService as a
};
//# sourceMappingURL=article.store.reducer-8158fd50.js.map
