import axios from "axios";
import { isTokenExpired } from "./auth";

const api = axios.create({ baseURL: "http://localhost:8000" });

api.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (isTokenExpired(token) && refreshToken) {
        const response = await axios.post("/auth/refresh/", { refresh: refreshToken });
        token = response.data.access;
        localStorage.setItem("access_token", token);
    }

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export default api;
