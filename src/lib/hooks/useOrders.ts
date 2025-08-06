import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getOrderById,
  getOrders,
  Order,
  OrderFilters,
  OrderListResponse,
  updateOrderStatus,
  UpdateOrderStatusData,
} from "../api/order";

/**
 * Hook for managing orders with pagination and filtering
 */
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (filters: OrderFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Set default limit to 5 records per page
      const filtersWithDefaults = {
        limit: 5,
        ...filters,
      };

      const response: OrderListResponse = await getOrders(filtersWithDefaults);
      setOrders(response.data);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalResults,
        itemsPerPage: filtersWithDefaults.limit || 5,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch orders";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch orders on mount
  useEffect(() => {
    fetchOrders({ page: 1, limit: 5 });
  }, [fetchOrders]);

  const refreshOrders = useCallback(
    (filters?: OrderFilters) => {
      fetchOrders(
        filters || {
          page: pagination.currentPage,
          limit: pagination.itemsPerPage,
        }
      );
    },
    [fetchOrders, pagination.currentPage, pagination.itemsPerPage]
  );

  return {
    orders,
    pagination,
    loading,
    error,
    fetchOrders,
    refreshOrders,
  };
};

/**
 * Hook for managing individual order details
 */
export const useOrderDetails = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderDetails = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      const orderData = await getOrderById(orderId);
      setOrder(orderData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch order details";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    order,
    loading,
    error,
    fetchOrderDetails,
  };
};

/**
 * Hook for managing order status updates
 */
export const useOrderManagement = () => {
  const [updating, setUpdating] = useState(false);

  const updateStatus = useCallback(
    async (
      orderId: string,
      statusData: UpdateOrderStatusData
    ): Promise<Order | null> => {
      setUpdating(true);

      try {
        const updatedOrder = await updateOrderStatus(orderId, statusData);
        toast.success(`Order status updated to ${statusData.status}`);
        return updatedOrder;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update order status";
        toast.error(errorMessage);
        return null;
      } finally {
        setUpdating(false);
      }
    },
    []
  );

  return {
    updating,
    updateStatus,
  };
};
