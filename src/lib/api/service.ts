import { fetchWithAuth } from "../hooks/useFetch";

// Service interfaces
export interface Service {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string[];
  price: number;
  slug: string;
  inclusions: string[]; // Product IDs
  isFeatured: boolean;
  status: "active" | "inactive";
}

export interface ServiceFilters {
  keyword?: string;
  category?: string;
  priceRange?: string; // Format: "min-max" e.g., "1000-30000"
  page?: number;
  limit?: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string[];
  description: string;
  category: string;
  status: "active" | "inactive";
  quantity: number;
  isFeatured: boolean;
  updated_at: string;
}

export interface ServiceListResponse {
  message: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  data: Service[];
}

export interface CreateServiceData {
  title: string;
  category: string;
  description: string;
  imageUrl: string[];
  price: number;
  slug: string;
  inclusions: string[]; // Product IDs
  isFeatured: boolean;
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
  // All fields are optional for updates
}

/**
 * Get all services with filtering, search, and pagination
 * Supports keyword search, category filter, price range filter, and pagination
 * Default: 9 services per page
 */
export const getServices = async (filters: ServiceFilters = {}) => {
  try {
    const { keyword, category, priceRange, page = 1, limit = 9 } = filters;

    // Build query parameters
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (category) params.append("category", category);
    if (priceRange) params.append("priceRange", priceRange);
    params.append("page", page.toString());

    const queryString = params.toString();
    const url = `/service${queryString ? `?${queryString}` : ""}`;

    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    // Format the response to match our interface
    return {
      message: data.message || "Services fetched successfully",
      currentPage: data.currentPage || page,
      totalPages:
        data.totalPages ||
        Math.ceil((data.totalResults || data.length || 0) / limit),
      totalResults: data.totalResults || data.length || 0,
      data: data.services || data, // Ensure we return the services array
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
};

/**
 * Get a single service by ID
 */
export const getServiceById = async (
  serviceId: string
): Promise<Service | null> => {
  try {
    const response = await fetchWithAuth(`/service/${serviceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data as Service;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
};

/**
 * Add a new service
 * Requires admin authentication
 */
export const addService = async (
  serviceData: CreateServiceData
): Promise<boolean> => {
  try {
    // Convert inclusions array to JSON string for backend
    const backendData = {
      ...serviceData,
      inclusions: JSON.stringify(serviceData.inclusions),
    };

    const response = await fetchWithAuth(`/service/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

/**
 * Edit an existing service
 * Requires admin authentication
 */
export const editService = async (
  serviceId: string,
  serviceData: UpdateServiceData
): Promise<boolean> => {
  try {
    // Convert inclusions array to JSON string for backend if it exists
    const backendData = {
      ...serviceData,
      ...(serviceData.inclusions && {
        inclusions: JSON.stringify(serviceData.inclusions),
      }),
    };

    const response = await fetchWithAuth(`/service/edit/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error editing service:", error);
    throw error;
  }
};

/**
 * Change service status (active <-> inactive)
 * Requires admin authentication
 */
export const changeServiceStatus = async (
  serviceId: string
): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(`/service/changeStatus/${serviceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error changing service status:", error);
    throw error;
  }
};

/**
 * Get service categories (hardcoded options as mentioned)
 */
export const getServiceCategories = (): string[] => {
  return ["Phật giáo", "Công giáo", "Hồi giáo"];
};
