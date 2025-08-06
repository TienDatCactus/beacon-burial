import { API_BASE_URL } from "@/lib/constants";
import useAuth from "../stores/useAuthStores";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = useAuth.getState().token;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    // ✅ Bắt mọi 401 và logout
    if (response.status === 401) {
      console.warn("401 Unauthorized - Logging out");
      useAuth.getState().logout(); // Gọi hàm logout trong Zustand
      throw new Error("Unauthorized");
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
