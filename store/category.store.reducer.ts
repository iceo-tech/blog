import { axiosGetInstanceBackend } from "../helpers/axios-config";

interface GetAllCategoryDto extends URLSearchParams {
  page?: number;
  limit?: number;
  display_name?: string;
  ids?: string;
  user_nation?: string;
}
class categoryClass {
  public getAllCategory = async (dataFilter: GetAllCategoryDto) => {
    let config = {
      headers: {
        "X-Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUyMDExMzQsImRhdGEiOnsiX2lkIjoiNjMyMTJkMDIwNzIxNmZjOTdhZWYyZGQyIiwia2V5IjoiOWE1M2VjNmFmOTNhY2ZmY2M2NzY2YzUyYzk1MzQ3YzAiLCJzaWduYXR1cmUiOiJkZjI0OWJmOGFkZDI4YTljMmFjN2FkZTJhOGQ5ZTk3MCIsInNlc3Npb24iOiI2MzI5ODNlZTdmNDM0NjE0MTkyMmQzOGUifSwiaWF0IjoxNjYzNjY1MTM0fQ.6EQIem9T7epllpKEC6qQEV-Ya0Kwj5cOjhcg2vzSx0U`,
      },
    };
    let dataObject = new URLSearchParams(dataFilter).toString();
    let dataUrl = `https://education-api-dev.iceo.tech/api/post/list-category?${dataObject}`;
    return await axiosGetInstanceBackend(dataUrl, config);
  };

  public getCategoryBySlug = async (slug: string) => {
    if (!slug) {
      return null;
    }
    let config = {
      headers: {
        "X-Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUyMDExMzQsImRhdGEiOnsiX2lkIjoiNjMyMTJkMDIwNzIxNmZjOTdhZWYyZGQyIiwia2V5IjoiOWE1M2VjNmFmOTNhY2ZmY2M2NzY2YzUyYzk1MzQ3YzAiLCJzaWduYXR1cmUiOiJkZjI0OWJmOGFkZDI4YTljMmFjN2FkZTJhOGQ5ZTk3MCIsInNlc3Npb24iOiI2MzI5ODNlZTdmNDM0NjE0MTkyMmQzOGUifSwiaWF0IjoxNjYzNjY1MTM0fQ.6EQIem9T7epllpKEC6qQEV-Ya0Kwj5cOjhcg2vzSx0U`,
      },
    };
    let dataUrl = `https://devapi2.lgbt.appuni.io/api/category/detail-category/${slug}`;
    return await axiosGetInstanceBackend(dataUrl, config);
  };
}

export const categoryService = new categoryClass();
