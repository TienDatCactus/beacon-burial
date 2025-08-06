import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  AuthState,
  LoginCredentials,
  ForgetPasswordRequest,
  VerifyOtpRequest,
  ResetPasswordRequest,
} from "@/lib/interfaces/auth";

import {
  login as apiLogin,
  logout as apiLogout,
  forgetPassword as apiForgetPassword,
  verifyOtp as apiVerifyOtp,
  resetPassword as apiResetPassword,
  getAuthToken,
  isAuthenticated as checkIsAuthenticated,
} from "@/lib/api/authen";

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials & { remember?: boolean }) => {
        try {
          const result = await apiLogin(credentials);
          if (result.success && result.data) {
            set({
              user: result.data.user,
              token: result.data.accessToken,
              isAuthenticated: true,
            });
            if (credentials.remember) {
              localStorage.setItem("rememberMe", "true");
            } else {
              localStorage.removeItem("rememberMe");
            }
          }

          return result;
        } catch (error: any) {
          console.error("Login error:", error);
          return {
            success: false,
            error: error.message || "Đăng nhập thất bại",
          };
        }
      },

      logout: async () => {
        try {
          const result = await apiLogout();

          localStorage.removeItem("rememberMe");
          if (result.success) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            });
            window.location.href = "/";
          }
          return result;
        } catch (error: any) {
          console.error("Logout error:", error);

          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });

          return {
            success: false,
            error: error.message || "Đăng xuất thất bại",
          };
        }
      },

      forgetPassword: async (request: ForgetPasswordRequest) => {
        try {
          return await apiForgetPassword(request);
        } catch (error: any) {
          console.error("Forget password error:", error);
          return {
            success: false,
            error: error.message || "Gửi OTP thất bại",
          };
        }
      },

      verifyOtp: async (request: VerifyOtpRequest) => {
        try {
          return await apiVerifyOtp(request);
        } catch (error: any) {
          console.error("Verify OTP error:", error);
          return {
            success: false,
            error: error.message || "Xác thực OTP thất bại",
          };
        }
      },

      resetPassword: async (request: ResetPasswordRequest) => {
        try {
          return await apiResetPassword(request);
        } catch (error: any) {
          console.error("Reset password error:", error);
          return {
            success: false,
            error: error.message || "Đổi mật khẩu thất bại",
          };
        }
      },

      restoreSession: () => {
        const token = getAuthToken();
        const isAuth = checkIsAuthenticated();
        const state = get();
        if (token && isAuth) {
          set({
            token,
            isAuthenticated: true,
            user: state.user,
          });
        } else {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      migrate: async (persistedState, version) => {
        return persistedState;
      },
    }
  )
);

export default useAuth;
