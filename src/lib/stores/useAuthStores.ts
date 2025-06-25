import { create } from "zustand";

const useAuth = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });

      // Optionally save to localStorage
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
    }
  },

  // Logout method
  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("token");
  },

  // Restore session from localStorage
  restoreSession: () => {
    const token = localStorage.getItem("token");
    if (token) {
      // optionally call API to get user info
      set({
        token,
        isAuthenticated: true,
      });
    }
  },
}));

export default useAuth;
