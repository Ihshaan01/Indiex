// src/store/authStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  user: null,
  setToken: (token) => {
    localStorage.setItem("authToken", token); // Store token in localStorage
    set({ token });
  },
  setUser: (user) => {
    localStorage.setItem("user", user); // Store token in localStorage
    set({ user });
  },
  clearToken: () => {
    localStorage.removeItem("authToken"); // Clear token from localStorage
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));

export default useAuthStore;
