import axios from "axios";

const DEFAULT_AXIOS_CONFIG = {
  baseURL: `${import.meta.env.VITE_URL}`,
  headers: {
    common: {
      Accept: "application/json",
    },
  },
};

const controller = new AbortController();

export const service = axios.create(DEFAULT_AXIOS_CONFIG);

service.interceptors.request.use(
  (config) => {
    config.signal = controller.signal;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
