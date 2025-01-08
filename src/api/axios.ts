import { storage } from "@/utils/storage";
import axios from "axios";

const http = axios.create({
  baseURL: "https://lms-be-development.hammercode.org/api/v1",
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = storage.auth.getKey();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default http;
