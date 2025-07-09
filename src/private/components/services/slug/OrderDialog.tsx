import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { ServiceCardProps } from "../ServiceCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { vi } from "date-fns/locale";
const OrderDialog: React.FC<{
  service: ServiceCardProps;
  handleOrderSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  orderForm: {
    name: string;
    phone: string;
    email: string;
    date: Date;
    notes: string;
  };
  setOrderForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phone: string;
      email: string;
      date: Date;
      notes: string;
    }>
  >;
  handleOrderFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOrderDialogOpen: boolean;
  setIsOrderDialogOpen: (open: boolean) => void;
}> = ({
  service,
  handleOrderSubmit,
  orderForm,
  handleOrderFormChange,
  isOrderDialogOpen,
  setIsOrderDialogOpen,
  setOrderForm,
}) => {
  return (
    <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Đặt dịch vụ</DialogTitle>
          <DialogDescription>
            Vui lòng điền thông tin dưới đây để đặt dịch vụ {service.title}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOrderSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                className="placeholder:text-gray-500"
                id="name"
                name="name"
                placeholder="Nguyễn Văn A"
                value={orderForm.name}
                onChange={handleOrderFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                className="placeholder:text-gray-500"
                id="phone"
                name="phone"
                type="tel"
                placeholder="0912 345 678"
                value={orderForm.phone}
                onChange={handleOrderFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="placeholder:text-gray-500"
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={orderForm.email}
                onChange={handleOrderFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Ngày sử dụng dịch vụ</Label>
              {/* <Input
                className="placeholder:text-gray-500"
                id="date"
                name="date"
                type="date"
                value={format(orderForm.date, "yyyy-MM-dd")}
                onChange={handleOrderFormChange}
                required
              /> */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!orderForm.date}
                    className="w-full data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {orderForm.date ? (
                      format(orderForm.date, "PPP", { locale: vi })
                    ) : (
                      <span>Chọn ngày</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    locale={vi}
                    selected={orderForm.date}
                    onSelect={(date) =>
                      setOrderForm({
                        ...orderForm,
                        date: date || new Date(),
                      })
                    }
                    disabled={(date) =>
                      // Disable dates in the past
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Ghi chú thêm (nếu có)</Label>
              <Input
                className="placeholder:text-gray-500"
                id="notes"
                name="notes"
                placeholder="Các yêu cầu đặc biệt hoặc thông tin bổ sung"
                value={orderForm.notes}
                onChange={handleOrderFormChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOrderDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button type="submit">Xác nhận đặt dịch vụ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
