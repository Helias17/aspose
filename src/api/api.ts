import axios from "axios";
import { AuthData } from "../types/type";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const userApi = {
  async signIn(data: number) {
    return axiosInstance.get(`users/${data}`);
  },
  async signUp(data: AuthData) {
    return axiosInstance.post("users/", data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
