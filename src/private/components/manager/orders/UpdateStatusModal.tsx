import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/lib/api/order";
import { useState } from "react";

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus: (
    orderId: string,
    newStatus: "Accept" | "Deny" | "Waiting"
  ) => Promise<void>;
  updating: boolean;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  updating,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<
    "Accept" | "Deny" | "Waiting" | null
  >(null);

  if (!order) return null;

  const handleSubmit = async () => {
    if (!selectedStatus) return;

    await onUpdateStatus(order._id, selectedStatus);
    onClose();
  };

  const statusOptions = [
    { value: "Waiting", label: "Đang chờ", color: "text-blue-600" },
    { value: "Accept", label: "Đã chấp nhận", color: "text-green-600" },
    { value: "Deny", label: "Đã từ chối", color: "text-red-600" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Đơn hàng:</p>
            <p className="font-medium">{order._id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Khách hàng:</p>
            <p className="font-medium">
              {order.firstName} {order.lastName}
            </p>
            <p className="text-sm text-gray-500">{order.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Trạng thái hiện tại:</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === "Waiting"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "Accept"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status === "Waiting"
                  ? "Đang chờ"
                  : order.status === "Accept"
                  ? "Đã chấp nhận"
                  : "Đã từ chối"}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Chọn trạng thái mới:</p>
            <Select
              value={selectedStatus || ""}
              onValueChange={(value) =>
                setSelectedStatus(value as "Accept" | "Deny" | "Waiting")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái..." />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.value === order.status}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          option.value === "Pending"
                            ? "bg-yellow-500"
                            : option.value === "Waiting"
                            ? "bg-blue-500"
                            : option.value === "Accept"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span className={option.color}>{option.label}</span>
                      {option.value === order.status && (
                        <span className="text-xs text-gray-400">
                          (Hiện tại)
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStatus === "Accept" && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-md">
              <p className="text-sm text-green-800">
                ✅ Khách hàng sẽ nhận được email thông báo đơn hàng đã được chấp
                nhận.
              </p>
            </div>
          )}

          {selectedStatus === "Deny" && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-md">
              <p className="text-sm text-red-800">
                ❌ Khách hàng sẽ nhận được email thông báo đơn hàng đã bị từ
                chối.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={updating}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              updating || !selectedStatus || selectedStatus === order.status
            }
            className="min-w-[100px]"
          >
            {updating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang cập nhật...
              </div>
            ) : (
              "Cập nhật"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
