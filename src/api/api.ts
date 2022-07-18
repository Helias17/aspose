import axios from "axios";
import { AuthData } from "../types/type";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const userApi = {
  async signIn(data: AuthData) {
    return axiosInstance.get(`users/${data.email}/${data.password}`);
  },
  async signUp(data: AuthData) {
    return axiosInstance.post("users/", data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
