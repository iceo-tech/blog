import { articleHelper } from "../helpers/article.helper";
import { axiosGetInstanceBackend } from "../helpers/axios-config";
class articleClass {
  public getPopularArticle = async (page: number, limit: number) => {
    return await articleHelper
      .getPopularArticle(page, limit)
      .then((response: any) => {
        if (response && response.data) {
          return response.data;
        } else {
          return [];
        }
      })
      .catch((error: any) => {
        return error;
      });
  };

  public getArticleByType = async (
    type: string,
    page: number,
    category: string,
    limit: number
  ) => {
    // let dataUrl = `https://mainapi.fudaly.appuni.io/api/posts?post_type=news&page=${page}&limit=${limit}`;

    // return await axiosGetInstanceBackend(dataUrl, {}).then((response: any) => {
    //   if (response && response.data) {
    //     return response.data;
    //   } else {
    //     return [];
    //   }
    // })
    // .catch((error: any) => {
    //   return error;
    // });

    return await articleHelper
      .getArticleList(type, page, category, limit)
      .then((response: any) => {
        if (response && response.data) {
          return response.data;
        } else {
          return [];
        }
      })
      .catch((error: any) => {
        return error;
      });
  };

  public getArticleBySlug = async (slug: string) => {
    if (!slug) {
      return null;
    }
    let dataUrl = `https://education-api.iceo.tech/api/post/detail/${slug}`;
    return await axiosGetInstanceBackend(dataUrl, {});
  };
}

export const articleService = new articleClass();
