import { API_BASE_URL } from "../constants";
import { fetchWithAuth } from "../hooks/useFetch";

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
}

// News interfaces based on your API structure
export interface News {
  _id: string;
  title: string;
  slug: string;
  category: "Hướng dẫn" | "Kiến thức" | "Chính sách";
  summary: string;
  content: string;
  image: string; // Single image URL
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  __v?: number;
}

// Create news data
export interface CreateNewsData {
  title: string;
  slug: string;
  category: "Hướng dẫn" | "Kiến thức" | "Chính sách";
  summary: string;
  content: string;
  file?: File; // For file upload - singular now
  status?: "active" | "inactive";
}

// Edit news data
export interface EditNewsData {
  title?: string;
  slug?: string;
  category?: "Hướng dẫn" | "Kiến thức" | "Chính sách";
  summary?: string;
  content?: string;
  file?: File; // For file upload - singular now
  status?: "active" | "inactive";
}

// News filters interface
export interface NewsFilters {
  category?: "Hướng dẫn" | "Kiến thức" | "Chính sách";
  status?: "active" | "inactive";
  keyword?: string;
  page?: number;
  limit?: number;
}

// News list response interface
export interface NewsListResponse {
  message: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  data: News[];
}

// Update news status data
export interface UpdateNewsStatusData {
  status: "active" | "inactive";
}

/**
 * Get all news with optional filtering
 * @param filters - News filters including pagination
 * @returns Promise with news list and pagination data
 */
export const getAllNews = async (
  filters: NewsFilters = {}
): Promise<NewsListResponse> => {
  try {
    const params = new URLSearchParams();

    // Add pagination parameters
    if (filters.page) {
      params.append("page", filters.page.toString());
    }
    if (filters.limit) {
      params.append("limit", filters.limit.toString());
    }

    // Add filter parameters
    if (filters.category) {
      params.append("category", filters.category);
    }
    if (filters.status) {
      params.append("status", filters.status);
    }
    if (filters.keyword) {
      params.append("keyword", filters.keyword);
    }

    const queryString = params.toString();
    const url = `${API_BASE_URL}/news${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

/**
 * Get single news by ID or slug
 * @param newsIdOrSlug - The news ID or slug
 * @returns Promise with news details
 */
export const getNewsById = async (newsIdOrSlug: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${newsIdOrSlug}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching news details:", error);
    throw error;
  }
};

/**
 * Add new news (admin only)
 * @param newsData - The news data to create
 * @returns Promise with created news data
 */
export const addNews = async (newsData: CreateNewsData): Promise<any> => {
  try {
    const formData = createNewsFormData(newsData);

    const response = await fetchWithAuth("/news/add", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to create news: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
};

/**
 * Edit existing news (admin only)
 * @param newsId - The news ID
 * @param newsData - The updated news data
 * @returns Promise with updated news data
 */
export const editNews = async (
  newsId: string,
  newsData: EditNewsData
): Promise<any> => {
  try {
    const formData = createNewsFormData(newsData);

    const response = await fetchWithAuth(`/news/edit/${newsId}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to update news: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
};

/**
 * Change news status (admin only)
 * @param newsId - The news ID
 * @param statusData - The new status data
 * @returns Promise with updated news data
 */
export const changeNewsStatus = async (
  newsId: string,
  statusData: UpdateNewsStatusData
): Promise<any> => {
  try {
    const response = await fetchWithAuth(`/news/changeStatus/${newsId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statusData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to update news status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating news status:", error);
    throw error;
  }
};

// News categories (fixed options)
export const NEWS_CATEGORIES = [
  { value: "Hướng dẫn", label: "Hướng dẫn" },
  { value: "Kiến thức", label: "Kiến thức" },
  { value: "Chính sách", label: "Chính sách" },
] as const;

// FormData helper function - updated to match backend expectations
function createNewsFormData(newsData: any): FormData {
  const formData = new FormData();

  // Add text fields
  if (newsData.title) formData.append("title", newsData.title);
  if (newsData.slug) formData.append("slug", newsData.slug);
  if (newsData.category) formData.append("category", newsData.category);
  if (newsData.summary) formData.append("summary", newsData.summary);
  if (newsData.content) formData.append("content", newsData.content);
  if (newsData.status) formData.append("status", newsData.status);

  // Add single image file if it exists
  if (newsData.file) {
    formData.append("image", newsData.file);
  }

  return formData;
}
