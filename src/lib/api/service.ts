import { API_BASE_URL } from "../constants";
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
  imageUrl?: string[];
  price: number;
  slug: string;
  inclusions: string[]; // Product IDs
  isFeatured: boolean;
  status?: "active" | "inactive";
  files?: File[]; // For file uploads
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
  inclusions?: string[]; // Optional for updates
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Helper function to create FormData for file uploads - similar to product approach
function createServiceFormData(serviceData: any): FormData {
  const formData = new FormData();

  // Add text fields
  if (serviceData.title) formData.append("title", serviceData.title);
  if (serviceData.slug) formData.append("slug", serviceData.slug);
  if (serviceData.price !== undefined)
    formData.append("price", serviceData.price.toString());
  if (serviceData.description)
    formData.append("description", serviceData.description || "");
  if (serviceData.category) formData.append("category", serviceData.category);
  if (serviceData.status) formData.append("status", serviceData.status);
  if (serviceData.isFeatured !== undefined)
    formData.append("isFeatured", serviceData.isFeatured.toString());

  // Handle inclusions array - convert to JSON string for backend
  if (serviceData.inclusions) {
    formData.append("inclusions", JSON.stringify(serviceData.inclusions));
  }

  // Add image files if they exist - use "image" field name to match backend
  if (serviceData.files && serviceData.files.length > 0) {
    for (const file of serviceData.files) {
      formData.append("images", file);
    }
  }

  return formData;
}

/**
 * Get all services with filtering, search, and pagination
 * Supports keyword search, category filter, price range filter, and pagination
 * Default: 9 services per page
 */
export const getServices = async (
  filters: ServiceFilters = {}
): Promise<ApiResponse<ServiceListResponse>> => {
  try {
    const { keyword, category, priceRange, page = 1, limit = 9 } = filters;

    // Build query parameters
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (category) params.append("category", category);
    if (priceRange) params.append("priceRange", priceRange);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const queryString = params.toString();
    const url = `${API_BASE_URL}/service${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: {
        message: data.message || "Services fetched successfully",
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalResults: data.totalResults,
        data: data.data, // Ensure we return the services array
      },
      message: "Lấy danh sách dịch vụ thành công",
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi lấy danh sách dịch vụ",
    };
  }
};

/**
 * Get a single service by ID
 */
export const getServiceById = async (
  serviceId: string
): Promise<ApiResponse<Service>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/service/${serviceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data as Service,
      message: "Lấy thông tin dịch vụ thành công",
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi lấy thông tin dịch vụ",
    };
  }
};

/**
 * Add a new service
 * Requires admin authentication
 */
export const addService = async (
  serviceData: CreateServiceData
): Promise<ApiResponse<Service>> => {
  try {
    // Use FormData for file uploads, similar to product implementation
    const formData = createServiceFormData(serviceData);

    const response = await fetchWithAuth(`/service/add`, {
      method: "POST",
      // Don't set Content-Type header - browser will set it with boundary
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.service || data,
      message: "Thêm dịch vụ thành công",
    };
  } catch (error) {
    console.error("Error adding service:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi thêm dịch vụ",
    };
  }
};

/**
 * Edit an existing service
 * Requires admin authentication
 */
export const editService = async (
  serviceId: string,
  serviceData: UpdateServiceData
): Promise<ApiResponse<Service>> => {
  try {
    const formData = createServiceFormData(serviceData);

    const response = await fetchWithAuth(`/service/edit/${serviceId}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.service || data,
      message: "Cập nhật dịch vụ thành công",
    };
  } catch (error) {
    console.error("Error editing service:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi cập nhật dịch vụ",
    };
  }
};

/**
 * Change service status (active <-> inactive)
 * Requires admin authentication
 */
export const changeServiceStatus = async (
  serviceId: string
): Promise<ApiResponse<Service>> => {
  try {
    const response = await fetchWithAuth(`/service/changeStatus/${serviceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    const newStatus = data.service?.status || data.status;
    const statusMessage = newStatus === "active" ? "kích hoạt" : "vô hiệu hóa";

    return {
      success: true,
      data: data.service || data,
      message: `Dịch vụ đã được ${statusMessage}`,
    };
  } catch (error) {
    console.error("Error changing service status:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi thay đổi trạng thái dịch vụ",
    };
  }
};

/**
 * Get service categories (hardcoded options as mentioned)
 */
export const getServiceCategories = (): string[] => {
  return ["Phật giáo", "Công giáo", "Hồi giáo"];
};
