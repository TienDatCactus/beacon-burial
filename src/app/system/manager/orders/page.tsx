"use client";

import { Button } from "@/components/ui/button";
import withAuth from "@/lib/hooks/useWithAuth";
import Filters from "@/private/components/manager/orders/Filters";
import OrderDetails from "@/private/components/manager/orders/OrderDetails";
import OrdersTable from "@/private/components/manager/orders/OrdersTable";
import EmptyFilter from "@/shared/components/state/EmptyFilter";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-2025-1001",
    date: "2025-06-25",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "555-123-4567",
    },
    items: [
      {
        id: "1",
        name: "Traditional Arrangement",
        price: 165,
        quantity: 1,
        image: "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
      },
      {
        id: "2",
        name: "Pink & Lilac Bouquet",
        price: 155,
        quantity: 1,
        image: "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
      },
    ],
    status: "declined",
    totalAmount: 320,
    shippingAddress: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
    },
    paymentMethod: "Cash on delivery",
  },
  {
    id: "ORD-2025-1002",
    date: "2025-06-26",
    customer: {
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "555-234-5678",
    },
    items: [
      {
        id: "3",
        name: "Rose and Freesia Bouquet",
        price: 145,
        quantity: 2,
        image: "/images/image-45-840x840.jpg",
      },
    ],
    status: "processing",
    totalAmount: 290,
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Riverside",
      state: "CA",
      zipCode: "92501",
    },
    paymentMethod: "Cash on delivery",
  },
  {
    id: "ORD-2025-1003",
    date: "2025-06-27",
    customer: {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "555-345-6789",
    },
    items: [
      {
        id: "4",
        name: "White Rose Bouquet",
        price: 145,
        quantity: 1,
        image: "/images/image-10.jpg",
      },
      {
        id: "5",
        name: "Memorial Tribute",
        price: 175,
        quantity: 1,
        image: "/images/image-10.jpg",
      },
    ],
    status: "declined",
    totalAmount: 320,
    shippingAddress: {
      street: "789 Pine Rd",
      city: "Portland",
      state: "OR",
      zipCode: "97205",
    },
    paymentMethod: "Cash on delivery",
  },
  {
    id: "ORD-2025-1004",
    date: "2025-06-28",
    customer: {
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "555-456-7890",
    },
    items: [
      {
        id: "1",
        name: "Traditional Arrangement",
        price: 165,
        quantity: 1,
        image: "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
      },
    ],
    status: "processing",
    totalAmount: 165,
    shippingAddress: {
      street: "101 Maple Blvd",
      city: "Boston",
      state: "MA",
      zipCode: "02108",
    },
    paymentMethod: "Cash on delivery",
  },
  {
    id: "ORD-2025-1005",
    date: "2025-06-24",
    customer: {
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "555-567-8901",
    },
    items: [
      {
        id: "5",
        name: "Memorial Tribute",
        price: 175,
        quantity: 2,
        image: "/images/image-10.jpg",
      },
    ],
    status: "declined",
    totalAmount: 350,
    shippingAddress: {
      street: "222 Cedar St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
    },
    paymentMethod: "Cash on delivery",
  },
];

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filteredOrders, setFilteredOrders] = useState([...mockOrders]);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filterOrders = () => {
    let filtered = [...mockOrders];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortField === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "totalAmount") {
        return sortDirection === "asc"
          ? a.totalAmount - b.totalAmount
          : b.totalAmount - a.totalAmount;
      } else {
        return 0;
      }
    });

    setFilteredOrders(filtered);
  };

  // Handle search input changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle sorting
  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  // Handle status filter changes
  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
  };

  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  React.useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, sortField, sortDirection]);

  // Close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = filteredOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setFilteredOrders(updatedOrders);

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
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
        statusFilter={statusFilter}
        handleStatusFilter={handleStatusFilter}
      />
      {/* Empty state */}
      {filteredOrders.length === 0 && (
        <EmptyFilter
          setSearchTerm={setSearchTerm}
          setStatusFilter={setStatusFilter}
        />
      )}

      {/* Orders table */}
      {filteredOrders.length > 0 && (
        <OrdersTable
          viewOrderDetails={viewOrderDetails}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          filteredOrders={filteredOrders}
        />
      )}

      {/* Order details dialog */}
      {selectedOrder && (
        <OrderDetails
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedOrder={selectedOrder}
          updateOrderStatus={updateOrderStatus}
          closeDialog={closeDialog}
        />
      )}
    </div>
  );
};

export default withAuth(OrdersPage, ["manager"]);
