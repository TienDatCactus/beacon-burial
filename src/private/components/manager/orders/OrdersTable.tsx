import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatCurrency, getStatusBadge } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronUp, ChevronDown, Eye } from "lucide-react";
import React from "react";
const OrdersTable: React.FC<{
  viewOrderDetails: (order: any) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  filteredOrders: any[];
}> = ({
  viewOrderDetails,
  sortField,
  sortDirection,
  handleSort,
  filteredOrders,
}) => {
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
              <TableCell>{format(order.date, "PPP", { locale: vi })}</TableCell>
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
  );
};

export default OrdersTable;
