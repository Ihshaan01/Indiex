import axios from "axios";
import { useUserStore } from "../store/userStore";

// Axios instance with middleware
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
});

// Request interceptor for attaching token
apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().clearUser(); // Clear user data if token is invalid
    }
    return Promise.reject(error);
  }
);

export default apiClient;
