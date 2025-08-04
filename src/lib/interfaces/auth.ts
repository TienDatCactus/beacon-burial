// User interface
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

// Authentication credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// API Response structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Login response
export interface LoginResponse {
  token?: string;
  user?: User;
  message?: string;
}

// Password reset interfaces
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

// Auth state for store/context
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (
    credentials: LoginCredentials & { remember?: boolean }
  ) => Promise<ApiResponse<LoginResponse>>;
  logout: () => Promise<ApiResponse>;
  restoreSession: () => void;
  forgetPassword: (request: ForgetPasswordRequest) => Promise<ApiResponse>;
  verifyOtp: (request: VerifyOtpRequest) => Promise<ApiResponse>;
  resetPassword: (request: ResetPasswordRequest) => Promise<ApiResponse>;
}
