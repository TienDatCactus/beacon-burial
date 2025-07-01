export interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  restoreSession: () => void;
}
