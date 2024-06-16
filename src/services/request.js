import axios from "axios";
const axiosInstance = axios.create({
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user_token"));
    let tokenWithoutQuotes = token && token?.replace(/"/g, "");
    if (token && tokenWithoutQuotes) {
      config.headers.Authorization = `Bearer ${tokenWithoutQuotes}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      // message.success(response.data.message);
    }

    return {
      status: true,
      message: response?.data?.message || "success",
      result: response.data.data,
    };
  },
  (error) => {
    let errorMessage = "Lỗi hệ thống";
    if (error?.message?.includes("Network Error")) {
      errorMessage = "";
    } else if (error?.response?.status === 401) {
      window.localStorage.clear();
      window.location.href = "/login";
    } else if (error?.response?.status === 400) {
      errorMessage = error?.response?.data?.message;

      if (errorMessage === "Json Web Token is Expired, Try again ") {
        window.localStorage.clear();
      } else {
        return {
          status: false,
          message: errorMessage,
          result: null,
        };
      }
    } else if (error?.response?.status === 404 || 502) {
      errorMessage = error?.response?.data?.message;
      return {
        status: false,
        message: "Lỗi hệ thống",
        result: null,
      };
    } else {
      return Promise.reject(error);
    }
  }
);

/**
 *
 * @param method
 * @param url
 * @param data
 */
export const request = (method, url, data, config) => {
  const prefix = "";

  url = prefix + url;

  if (method === "post") {
    return axiosInstance.post(url, data, config);
  } else if (method === "delete") {
    return axiosInstance.delete(url);
  } else if (method === "put") {
    return axiosInstance.put(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
