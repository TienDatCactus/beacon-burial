import { useState, useEffect } from "react";
import { getDashboardStatistics } from "@/lib/api/dashboard";
import { toast } from "sonner";

export interface DashboardStatistics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
}
/**
 * Custom hook for dashboard statistics
 * Provides loading state, error handling, and automatic data fetching
 */
export const useDashboardStatistics = () => {
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch dashboard statistics from API
   */
  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getDashboardStatistics();
      if (data) {
        setStatistics(data);
      } else {
        setError("Failed to fetch dashboard statistics");
        toast.error("Không thể tải thống kê dashboard");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      toast.error("Lỗi khi tải thống kê dashboard");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh statistics data
   */
  const refreshStatistics = () => {
    fetchStatistics();
  };

  // Auto-fetch on mount
  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    statistics,
    loading,
    error,
    refreshStatistics,
  };
};
