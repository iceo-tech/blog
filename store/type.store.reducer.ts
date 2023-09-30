import { axiosGetInstanceBackend } from "../helpers/axios-config";

interface GetAllTypeDto extends URLSearchParams {
  page?: number;
  limit?: number;
  display_name?: string;
  ids?: string;
  user_nation?: string;
}
class typeClass {
  public getAllType = async (dataFilter: GetAllTypeDto) => {
    let config = {
      headers: {
        "X-Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUyMDExMzQsImRhdGEiOnsiX2lkIjoiNjMyMTJkMDIwNzIxNmZjOTdhZWYyZGQyIiwia2V5IjoiOWE1M2VjNmFmOTNhY2ZmY2M2NzY2YzUyYzk1MzQ3YzAiLCJzaWduYXR1cmUiOiJkZjI0OWJmOGFkZDI4YTljMmFjN2FkZTJhOGQ5ZTk3MCIsInNlc3Npb24iOiI2MzI5ODNlZTdmNDM0NjE0MTkyMmQzOGUifSwiaWF0IjoxNjYzNjY1MTM0fQ.6EQIem9T7epllpKEC6qQEV-Ya0Kwj5cOjhcg2vzSx0U`,
      },
    };
    let dataObject = new URLSearchParams(dataFilter).toString();
    let dataUrl = `https://devapi2.lgbt.appuni.io/api/event-type/list-type?${dataObject}`;
    return await axiosGetInstanceBackend(dataUrl, config);
  };

  public getTypeBySlug = async (slug: string) => {
    if (!slug) {
      return null;
    }
    let config = {
      headers: {
        "X-Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUyMDExMzQsImRhdGEiOnsiX2lkIjoiNjMyMTJkMDIwNzIxNmZjOTdhZWYyZGQyIiwia2V5IjoiOWE1M2VjNmFmOTNhY2ZmY2M2NzY2YzUyYzk1MzQ3YzAiLCJzaWduYXR1cmUiOiJkZjI0OWJmOGFkZDI4YTljMmFjN2FkZTJhOGQ5ZTk3MCIsInNlc3Npb24iOiI2MzI5ODNlZTdmNDM0NjE0MTkyMmQzOGUifSwiaWF0IjoxNjYzNjY1MTM0fQ.6EQIem9T7epllpKEC6qQEV-Ya0Kwj5cOjhcg2vzSx0U`,
      },
    };
    let dataUrl = `https://devapi2.lgbt.appuni.io/api/type/detail-type/${slug}`;
    return await axiosGetInstanceBackend(dataUrl, config);
  };
}

export const typeService = new typeClass();
