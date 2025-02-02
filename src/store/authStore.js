// src/store/authStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("authToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  setToken: (token) => {
    localStorage.setItem("authToken", token); // Store token in localStorage
    set({ token });
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Store token in localStorage
    set({ user });
  },
  clearToken: () => {
    localStorage.removeItem("authToken"); // Clear token from localStorage
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
