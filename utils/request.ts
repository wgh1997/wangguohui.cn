import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
