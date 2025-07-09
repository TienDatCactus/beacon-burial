import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import React from "react";
const OrderDetails: React.FC<{
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedOrder: any;
  updateOrderStatus: (id: string, status: string) => void;
  closeDialog: () => void;
}> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedOrder,
  updateOrderStatus,
  closeDialog,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Chi tiết đơn hàng: {selectedOrder.id}
          </DialogTitle>
          <div className="flex justify-between items-center">
            <span>
              Đặt vào {format(selectedOrder.date, "PPP", { locale: vi })}
            </span>
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
            <h3 className="font-medium text-lg mb-2">Thông tin khách hàng</h3>
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

            <h3 className="font-medium text-lg mt-4 mb-2">Địa chỉ giao hàng</h3>
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
                    <Image
                      fill
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
  );
};

export default OrderDetails;
