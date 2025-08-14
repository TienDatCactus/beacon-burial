import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/lib/api/order";
import { formatCurrency } from "@/lib/utils/formatting";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import React from "react";
const OrderDetails: React.FC<{
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  selectedOrder: Order;
  closeDialog: () => void;
}> = ({ isDialogOpen, setIsDialogOpen, selectedOrder, closeDialog }) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Chi tiết đơn hàng: {selectedOrder._id}
          </DialogTitle>
          <div className="flex justify-between items-center">
            <span>
              Cập nhật vào{" "}
              {format(new Date(selectedOrder.updated_at), "PPP", {
                locale: vi,
              })}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Trạng thái:</span>
              <p>{selectedOrder.status}</p>
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
                {selectedOrder.firstName} {selectedOrder.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedOrder.email}
              </p>
              <p>
                <span className="font-medium">Số điện thoại:</span>{" "}
                {selectedOrder.phone}
              </p>
            </div>

            <h3 className="font-medium text-lg mt-4 mb-2">Địa chỉ giao hàng</h3>
            <div className="space-y-1">
              <p>{selectedOrder.address}</p>
              <p>
                {selectedOrder.city}, {selectedOrder.province}
              </p>
            </div>

            {/* Note */}
            {selectedOrder.note && (
              <>
                <h3 className="font-medium text-lg mt-4 mb-2">Ghi chú</h3>
                <p className="text-gray-600">{selectedOrder.note}</p>
              </>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-medium text-lg mb-2">
              Sản phẩm và dịch vụ trong đơn hàng
            </h3>
            <div className="border rounded-md">
              {selectedOrder.productId.map((product: any) => (
                <div
                  key={product._id}
                  className="flex items-center p-3 border-b last:border-b-0"
                >
                  <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden relative mr-3">
                    <Image
                      fill
                      src={product.image[0] || "/placeholder-image.jpg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{product.name}</p>
                      <span className="px-2 py-1 text-xs rounded-full w-24 text-center bg-green-100 text-green-800">
                        Sản phẩm
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <p>Số lượng: {product.quantity}</p>
                      <p>{formatCurrency(product.price)} mỗi cái</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="mt-4 space-y-1 text-right">
              <div className="flex justify-between">
                <span>Tổng tạm tính:</span>
                <span>{formatCurrency(selectedOrder.)}</span>
              </div>
              <div className="flex justify-between">
                <span>Vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                <span>Tổng cộng:</span>
                <span>{formatCurrency(selectedOrder.totalAmount)}</span>
              </div>
            </div> */}
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
