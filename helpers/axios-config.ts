import axios from "axios";

export const axiosPostInstanceBackend = (
  url: string,
  data: any,
  config: any
) => {
  return axios
    .post(url, data, {
      ...config,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        (Number(error.response.status) === 401 ||
          Number(error.response.status) === 403)
      ) {
        localStorage.removeItem("user");
        // window.location.href = "/login";
      } else {
        return error;
      }
    });
};

export const axiosPutInstanceBackend = (
  url: string,
  data: any,
  config: any
) => {
  return axios
    .put(url, data, {
      ...config,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        (Number(error.response.status) === 401 ||
          Number(error.response.status) === 403)
      ) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        return error;
      }
    });
};

export const axiosDeleteInstanceBackend = (
  url: string,
  data: any,
  config: any
) => {
  return axios
    .delete(url, {
      ...config,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        (Number(error.response.status) === 401 ||
          Number(error.response.status) === 403)
      ) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        return error;
      }
    });
};

export const axiosPatchInstanceBackend = (
  url: string,
  data: any,
  config: any
) => {
  return axios
    .patch(url, data, {
      ...config,
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        (Number(error.response.status) === 401 ||
          Number(error.response.status) === 403)
      ) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        return error;
      }
    });
};

export const axiosGetInstanceBackend = (url: string, config: any) => {
  return axios
    .get(url, {
      ...config,
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        (Number(error.response.status) === 401 ||
          Number(error.response.status) === 403)
      ) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        return error;
      }
    });
};

// export const axiosInstance = axios.create({
//   baseURL: process.env.NEW_BACKEND_URL,
//   withCredentials: true,
//   responseType: "json",
//   timeout: 5000,
// });

// axiosInstance.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
