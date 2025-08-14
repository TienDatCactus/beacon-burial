"use client";

import { Button } from "@/components/ui/button";
import withAuth from "@/lib/hooks/useWithAuth";
import {
  useOrders,
  useOrderDetails,
  useOrderManagement,
} from "@/lib/hooks/useOrders";
import Filters from "@/private/components/manager/orders/Filters";
import OrderDetails from "@/private/components/manager/orders/OrderDetails";
import OrdersTable from "@/private/components/manager/orders/OrdersTable";
import EmptyFilter from "@/shared/components/state/EmptyFilter";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Order, OrderFilters } from "@/lib/api/order";

const OrdersPage: React.FC = () => {
  // Real API hooks
  const { orders, pagination, loading, error, fetchOrders, refreshOrders } =
    useOrders();
  const { order: selectedOrderDetails, fetchOrderDetails } = useOrderDetails();
  const { updating, updateStatus } = useOrderManagement();

  // Local state for UI
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "Accept" | "Deny" | "Waiting"
  >();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, statusFilter ?? null);
  };

  // Handle status filter
  const handleStatusFilter = (status: string | null) => {
    const statusValue = status as "Accept" | "Deny" | "Waiting";
    setStatusFilter(statusValue ?? null);
    applyFilters(searchTerm, statusValue);
  };

  // Apply filters and fetch data
  const applyFilters = (
    keyword: string,
    status: "Accept" | "Deny" | "Waiting" | null
  ) => {
    const filters: OrderFilters = {
      page: 1,
      limit: 5,
    };

    if (keyword.trim()) {
      filters.keyword = keyword.trim();
    }

    if (status) {
      filters.status = status;
    }

    fetchOrders(filters);
  };

  // View order details
  const viewOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    await fetchOrderDetails(order._id);
    setIsDialogOpen(true);
  };

  // Update order status
  const updateOrderStatus = async (
    orderId: string,
    newStatus: "Accept" | "Deny" | "Waiting"
  ) => {
    const result = await updateStatus(orderId, { status: newStatus });
    if (result) {
      refreshOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    }
  };

  // Close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const filters: OrderFilters = {
      page,
      limit: 5,
    };

    if (searchTerm.trim()) {
      filters.keyword = searchTerm.trim();
    }

    if (statusFilter) {
      filters.status = statusFilter;
    }

    fetchOrders(filters);
  };

  const handleSort = (field: string) => {
    console.log("Sorting by:", field);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý đơn hàng</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Xuất đơn hàng
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <Filters
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        statusFilter={statusFilter as string | null}
        handleStatusFilter={handleStatusFilter}
      />

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Đang tải đơn hàng...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center py-8">
          <p className="text-red-600">Có lỗi xảy ra: {error}</p>
          <Button
            onClick={() => refreshOrders()}
            variant="outline"
            className="mt-2"
          >
            Thử lại
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && orders.length === 0 && (
        <EmptyFilter
          setSearchTerm={setSearchTerm}
          setStatusFilter={(status) => handleStatusFilter(status)}
        />
      )}

      {/* Orders table */}
      {!loading && !error && orders.length > 0 && (
        <>
          <OrdersTable
            viewOrderDetails={viewOrderDetails}
            sortField="createdAt"
            sortDirection="desc"
            handleSort={handleSort}
            filteredOrders={orders}
            onUpdateStatus={updateOrderStatus}
            updating={updating}
          />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                Trước
              </Button>

              <span className="text-sm text-gray-600">
                Trang {pagination.currentPage} / {pagination.totalPages}(
                {pagination.totalItems} đơn hàng)
              </span>

              <Button
                variant="outline"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Sau
              </Button>
            </div>
          )}
        </>
      )}

      {/* Order details dialog */}
      {selectedOrder && (
        <OrderDetails
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedOrder={selectedOrder}
          closeDialog={closeDialog}
        />
      )}
    </div>
  );
};

export default withAuth(OrdersPage, ["admin", "manager"]);
