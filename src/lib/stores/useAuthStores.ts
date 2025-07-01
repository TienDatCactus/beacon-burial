import { create } from "zustand";
import { AuthState } from "@/lib/interfaces/auth";

const useAuth = create<AuthState>((set) => ({
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.message || "Login failed";
        throw new Error(message);
      }
      const data = await response.json();

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });

      // Optionally save to localStorage
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, error: error.message || "Unknown error" };
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
