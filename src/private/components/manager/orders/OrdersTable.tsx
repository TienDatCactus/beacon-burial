import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusBadge } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronDown, ChevronUp, Edit, Eye } from "lucide-react";
import React, { useState } from "react";
import UpdateStatusModal from "./UpdateStatusModal";
import { Order } from "@/lib/api/order";

const OrdersTable: React.FC<{
  viewOrderDetails: (order: Order) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  filteredOrders: Order[];
  onUpdateStatus: (
    orderId: string,
    newStatus: "Accept" | "Deny" | "Waiting"
  ) => Promise<void>;
  updating: boolean;
}> = ({
  viewOrderDetails,
  sortField,
  sortDirection,
  handleSort,
  filteredOrders,
  onUpdateStatus,
  updating,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrderForUpdate, setSelectedOrderForUpdate] =
    useState<Order | null>(null);

  const handleUpdateStatusClick = (order: Order) => {
    setSelectedOrderForUpdate(order);
    setIsUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedOrderForUpdate(null);
  };

  console.log(filteredOrders);
  return (
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
            <TableHead>Trạng thái</TableHead>
            <TableHead>Cập nhật trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order._id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{order._id}</TableCell>
              <TableCell>
                {order?.created_at
                  ? format(new Date(order.created_at), "dd/MM/yyyy HH:mm", {
                      locale: vi,
                    })
                  : order?.updated_at
                  ? format(new Date(order.updated_at), "dd/MM/yyyy HH:mm", {
                      locale: vi,
                    })
                  : null}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {order.firstName} {order.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </div>
              </TableCell>

              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatusClick(order)}
                  disabled={updating}
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Cập nhật trạng thái
                </Button>
              </TableCell>
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

      {/* Update Status Modal */}
      <UpdateStatusModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseModal}
        order={selectedOrderForUpdate}
        onUpdateStatus={onUpdateStatus}
        updating={updating}
      />
    </div>
  );
};

export default OrdersTable;
