import { axiosGetInstanceBackend } from "./axios-config";

class articleSearch {
  getPopularArticle = async (page: number, limit: number) => {
    let dataUrl = `https://mainapi.fudaly.appuni.io/api/posts?post_type=news&page=${page}&limit=${limit}`;
    return await axiosGetInstanceBackend(dataUrl, {});
  };

  // getArticleList = async (type: string, page: number, limit: number) => {
  //   let dataUrl = `https://mainapi.fudaly.appuni.io/api/posts?post_type=${type}&page=${page}&limit=${limit}`;
  //   return await axiosGetInstanceBackend(dataUrl, {});
  // };

  // getArticleList = async (type: string, page: number, limit: number) => {
  //   let dataUrl = `
  //   https://mainapi.whiteg.appuni.io/api/post/list?page=${page}&limit=${limit}&order_by=DESC`;
  //   return await axiosGetInstanceBackend(dataUrl, {});
  // };

  getArticleList = async (
    type: string,
    page: number,
    category: string,
    limit: number
  ) => {
    let dataUrl = `
    https://education-api.iceo.tech/api/post/list?page=${page}&limit=${limit}&order_by=DESC&post_category=${
      category || ""
    }`;
    return await axiosGetInstanceBackend(dataUrl, {});
  };
}

export const articleHelper = new articleSearch();
