import { fetchWithAuth } from "../hooks/useFetch";

// Order interfaces
export interface OrderProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string[];
  description: string;
  category: string;
  status: string;
  quantity: number;
  isFeatured: boolean;
  updated_at: string;
}

export interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  note?: string;
  status: "Waiting" | "Accept" | "Deny";
  productId: OrderProduct[];
  created_at?: string;
  updated_at: string;
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  keyword?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  province?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderListResponse {
  message: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  data: Order[];
}

export interface UpdateOrderStatusData {
  status: "Accept" | "Deny" | "Waiting";
  note?: string;
}

/**
 * Get all orders with pagination and filtering
 * @param filters - Order filters including pagination
 * @returns Promise with order list and pagination data
 */
export const getOrders = async (
  filters: OrderFilters = {}
): Promise<OrderListResponse> => {
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
    if (filters.status) {
      params.append("status", filters.status);
    }
    if (filters.keyword) {
      params.append("keyword", filters.keyword);
    }

    const queryString = params.toString();
    const url = `/order${queryString ? `?${queryString}` : ""}`;

    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

/**
 * Get order details by ID
 * @param orderId - The order ID
 * @returns Promise with order details
 */
export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await fetchWithAuth(`/order/${orderId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

/**
 * Update order status (Accept or Deny)
 * @param orderId - The order ID
 * @param statusData - The new status data
 * @returns Promise with updated order data
 */
export const updateOrderStatus = async (
  orderId: string,
  statusData: UpdateOrderStatusData
): Promise<Order> => {
  try {
    const response = await fetchWithAuth(`/order/changeStatus/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statusData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
