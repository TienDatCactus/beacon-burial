import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  getAllNews,
  getNewsById,
  addNews,
  editNews,
  changeNewsStatus,
} from "../api/news";
import {
  News,
  NewsFilters,
  NewsListResponse,
  CreateNewsData,
  EditNewsData,
  UpdateNewsStatusData,
} from "../api/news";

/**
 * Hook for managing news list with pagination and filtering
 */
export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (filters: NewsFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Set default limit to 10 records per page
      const filtersWithDefaults = {
        limit: 10,
        ...filters,
      };

      const response: NewsListResponse = await getAllNews(filtersWithDefaults);
      setNews(response.data);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalResults,
        itemsPerPage: filtersWithDefaults.limit || 10,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch news";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch news on mount
  useEffect(() => {
    fetchNews({ page: 1, limit: 10 });
  }, [fetchNews]);

  const refreshNews = useCallback(
    (filters?: NewsFilters) => {
      fetchNews(
        filters || {
          page: pagination.currentPage,
          limit: pagination.itemsPerPage,
        }
      );
    },
    [fetchNews, pagination.currentPage, pagination.itemsPerPage]
  );

  return {
    news,
    pagination,
    loading,
    error,
    fetchNews,
    refreshNews,
  };
};

/**
 * Hook for managing individual news details
 */
export const useNewsDetails = () => {
  const [newsItem, setNewsItem] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNewsDetails = useCallback(async (newsId: string) => {
    setLoading(true);
    setError(null);

    try {
      const newsData = await getNewsById(newsId);
      setNewsItem(newsData.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch news details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearNewsDetails = useCallback(() => {
    setNewsItem(null);
    setError(null);
  }, []);

  return {
    newsItem,
    loading,
    error,
    fetchNewsDetails,
    clearNewsDetails,
  };
};

/**
 * Hook for managing news CRUD operations
 */
export const useNewsManagement = () => {
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [changingStatus, setChangingStatus] = useState(false);

  // Create new news
  const createNews = useCallback(
    async (newsData: CreateNewsData): Promise<News | null> => {
      setCreating(true);
      setLoading(true);

      try {
        const response = await addNews(newsData);

        if (response && response.data) {
          toast.success(response.message || "Tin tức đã được tạo thành công");
          return response.data;
        }

        return null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create news";
        toast.error(errorMessage);
        throw err;
      } finally {
        setCreating(false);
        setLoading(false);
      }
    },
    []
  );

  // Update existing news
  const updateNews = useCallback(
    async (newsId: string, newsData: EditNewsData): Promise<News | null> => {
      setUpdating(true);
      setLoading(true);

      try {
        const response = await editNews(newsId, newsData);

        if (response && response.data) {
          toast.success(
            response.message || "Tin tức đã được cập nhật thành công"
          );
          return response.data;
        }

        return null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update news";
        toast.error(errorMessage);
        throw err;
      } finally {
        setUpdating(false);
        setLoading(false);
      }
    },
    []
  );

  // Change news status
  const updateNewsStatus = useCallback(
    async (
      newsId: string,
      statusData: UpdateNewsStatusData
    ): Promise<News | null> => {
      setChangingStatus(true);
      setLoading(true);

      try {
        const response = await changeNewsStatus(newsId, statusData);

        if (response && response.data) {
          toast.success(
            response.message ||
              `Trạng thái tin tức đã được cập nhật thành ${
                statusData.status === "active" ? "Hoạt động" : "Không hoạt động"
              }`
          );
          return response.data;
        }

        return null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update news status";
        toast.error(errorMessage);
        throw err;
      } finally {
        setChangingStatus(false);
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    creating,
    updating,
    changingStatus,
    createNews,
    updateNews,
    updateNewsStatus,
  };
};
