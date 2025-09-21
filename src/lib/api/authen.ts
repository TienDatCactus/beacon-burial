// Authentication API functions

import { API_BASE_URL } from "../constants";

// Types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  message?: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Login function
export async function login(
  credentials: LoginCredentials
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Đăng nhập thất bại",
      };
    }
    if (data.data.accessToken) {
      localStorage.setItem("authToken", data.data.accessToken);
    }

    return {
      success: true,
      data: data.data,
      message: "Đăng nhập thành công",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi đăng nhập",
    };
  }
}

// Forget password - send OTP to email
export async function forgetPassword(
  request: ForgetPasswordRequest
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Gửi OTP thất bại",
      };
    }

    return {
      success: true,
      data,
      message: "OTP đã được gửi đến email của bạn",
    };
  } catch (error) {
    console.error("Forget password error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi gửi OTP",
    };
  }
}

// Verify OTP
export async function verifyOtp(
  request: VerifyOtpRequest
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Xác thực OTP thất bại",
      };
    }

    return {
      success: true,
      data,
      message: "Xác thực OTP thành công",
    };
  } catch (error) {
    console.error("Verify OTP error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi xác thực OTP",
    };
  }
}

// Reset password
export async function resetPassword(
  request: ResetPasswordRequest
): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Đổi mật khẩu thất bại",
      };
    }

    return {
      success: true,
      data,
      message: "Đổi mật khẩu thành công",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi đổi mật khẩu",
    };
  }
}

// Logout function
export async function logout(): Promise<ApiResponse> {
  try {
    // Remove token from localStorage
    localStorage.removeItem("authToken");

    // If you have a logout endpoint on the server, you can call it here
    // const response = await fetch(`${API_BASE_URL}/logout`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //   },
    // });

    return {
      success: true,
      message: "Đăng xuất thành công",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi đăng xuất",
    };
  }
}

// Get stored auth token
export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

// Get authenticated headers for API calls
export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Helper function to handle API calls with authentication
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = {
    ...getAuthHeaders(),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
