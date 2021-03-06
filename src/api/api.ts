import axios from "axios";
import { AuthData, FormDataType } from "../types/type";

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

export const weatherApi = {
  async getCityWeather(location: string) {
    return axiosInstance.get(`weather/${location}`);
  },
  async getCitiesList() {
    return axiosInstance.get(`weather`);
  },
};

export const feedbackApi = {
  async submitFeedback(data: FormDataType) {
    return axiosInstance.post("feedback/", data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
