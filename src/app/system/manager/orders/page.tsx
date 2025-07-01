"use client";

import React, { useState } from "react";
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Eye,
  Filter,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    status: "completed",
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
    status: "shipped",
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
    status: "pending",
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
    status: "cancelled",
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

// Status badge styling helper
const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Completed
        </Badge>
      );
    case "processing":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Processing
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
          Pending
        </Badge>
      );
    case "shipped":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          Shipped
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Format date for display
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

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

  // View order details
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Apply filters when dependencies change
  React.useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, sortField, sortDirection]);

  // Close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = filteredOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setFilteredOrders(updatedOrders);

    // Also update selected order if it's open in the dialog
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Tìm kiếm theo ID hoặc khách hàng..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                {statusFilter ? `Status: ${statusFilter}` : "Tất cả trạng thái"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleStatusFilter(null)}>
                Tất cả đơn hàng
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("pending")}>
                Đơn hàng đang chờ
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusFilter("processing")}
              >
                Đơn hàng đang xử lý
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("shipped")}>
                Đơn hàng đã giao
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("completed")}>
                Đơn hàng đã hoàn thành
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusFilter("cancelled")}>
                Đơn hàng đã hủy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Empty state */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12 border rounded-md bg-white">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <ShoppingCart className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Không tìm thấy đơn hàng nào
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Chúng tôi không tìm thấy bất kỳ đơn hàng nào phù hợp với tiêu chí
            của bạn. Hãy thử điều chỉnh bộ lọc của bạn.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter(null);
              }}
              variant="outline"
            >
              Xóa bộ lọc
            </Button>
          </div>
        </div>
      )}

      {/* Orders table */}
      {filteredOrders.length > 0 && (
        <div className="border rounded-md overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date
                    {sortField === "date" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("totalAmount")}
                >
                  <div className="flex items-center">
                    Tổng tiền
                    {sortField === "totalAmount" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {order.customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewOrderDetails(order)}
                      className="hover:bg-gray-100"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Xem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Order details dialog */}
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Chi tiết đơn hàng: {selectedOrder.id}
              </DialogTitle>
              <div className="flex justify-between items-center">
                <span>Đặt vào {formatDate(selectedOrder.date)}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Trạng thái:</span>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) =>
                      updateOrderStatus(selectedOrder.id, value)
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Đang chờ</SelectItem>
                      <SelectItem value="processing">Đang xử lý</SelectItem>
                      <SelectItem value="shipped">Đã giao hàng</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-medium text-lg mb-2">
                  Thông tin khách hàng
                </h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Tên:</span>{" "}
                    {selectedOrder.customer.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedOrder.customer.email}
                  </p>
                  <p>
                    <span className="font-medium">Số điện thoại:</span>{" "}
                    {selectedOrder.customer.phone}
                  </p>
                </div>

                <h3 className="font-medium text-lg mt-4 mb-2">
                  Địa chỉ giao hàng
                </h3>
                <div className="space-y-1">
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}{" "}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                </div>

                <h3 className="font-medium text-lg mt-4 mb-2">
                  Phương thức thanh toán
                </h3>
                <p>{selectedOrder.paymentMethod}</p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-medium text-lg mb-2">
                  Sản phẩm trong đơn hàng
                </h3>
                <div className="border rounded-md">
                  {selectedOrder.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center p-3 border-b last:border-b-0"
                    >
                      <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden relative mr-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between text-sm text-gray-600">
                          <p>Số lượng: {item.quantity}</p>
                          <p>{formatCurrency(item.price)} mỗi cái</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-1 text-right">
                  <div className="flex justify-between">
                    <span>Tổng tạm tính:</span>
                    <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vận chuyển:</span>
                    <span>Miễn phí</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                    <span>Tổng cộng:</span>
                    <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={closeDialog}>
                Đóng
              </Button>
              <Button variant="default" className="bg-primary">
                In hóa đơn
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrdersPage;
