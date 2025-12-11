import axios from "axios";

const customAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

customAxios.interceptors.request.use(config => {
    return config;
});

customAxios.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);

export default customAxios;