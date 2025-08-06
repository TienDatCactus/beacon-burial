import { DashboardStatistics } from "@/lib/interfaces";
import { fetchWithAuth } from "../hooks/useFetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999/api";

/**
 * Get dashboard sales statistics
 * Requires admin authentication
 */
export const getDashboardStatistics =
  async (): Promise<DashboardStatistics | null> => {
    try {
      const response = await fetchWithAuth(`/order/statics`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data as DashboardStatistics;
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
      return null;
    }
  };
