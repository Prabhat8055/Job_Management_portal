import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8083/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 1000,
});

export default apiClient;