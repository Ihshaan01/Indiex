// src/store/authStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("authToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  store: JSON.parse(localStorage.getItem("store")) || null,
  setToken: (token) => {
    localStorage.setItem("authToken", token); // Store token in localStorage
    set({ token });
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); // Store token in localStorage
    set({ user });
  },
  setStore: (store) => {
    localStorage.setItem("store", JSON.stringify(store));
    set({ store });
  },
  clearToken: () => {
    localStorage.removeItem("authToken"); // Clear token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("store");
    set({ user: null, token: null, store: null });
  },
}));

export default useAuthStore;
