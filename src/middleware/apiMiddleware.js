import axios from "axios";
import useAuthStore from "../store/authStore";

// Axios instance with middleware
const apiClient = axios.create({
  baseURL: "https://backend-main-zeta.vercel.app/api", // Replace with your backend URL
});

// Request interceptor for attaching token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
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
      useAuthStore.getState().clearToken(); // Clear user data if token is invalid
    }
    return Promise.reject(error);
  }
);

export default apiClient;
