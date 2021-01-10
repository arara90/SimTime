import axios from "axios";
import { getCookie } from "./cookie";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  headers: {
    Authorization: "JWT " + getCookie("access"),
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export const axiosFormInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  headers: {
    Authorization: "JWT " + getCookie("access"),
    "content-type": "multipart/form-data",
  },
});
