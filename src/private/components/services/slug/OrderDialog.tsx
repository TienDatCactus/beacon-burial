import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ServiceCheckoutData } from "@/lib/api/order";
import { Service } from "@/lib/api/service";
import { cn, getDistrictsByCity, majorCities } from "@/lib/utils";
import { format, parse } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, Home, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";

// Vietnamese provinces/cities data

const OrderDialog: React.FC<{
  service: Service;
  handleOrderSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  orderForm: Omit<ServiceCheckoutData, "serviceId">;
  setOrderForm: React.Dispatch<
    React.SetStateAction<Omit<ServiceCheckoutData, "serviceId">>
  >;
  handleOrderFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isOrderDialogOpen: boolean;
  setIsOrderDialogOpen: (open: boolean) => void;
  isSubmittingOrder?: boolean;
}> = ({
  service,
  handleOrderSubmit,
  orderForm,
  handleOrderFormChange,
  isOrderDialogOpen,
  setIsOrderDialogOpen,
  setOrderForm,
  isSubmittingOrder = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    orderForm.date ? parse(orderForm.date, "dd/MM/yyyy", new Date()) : undefined
  );
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone number format (Vietnamese)
  const validatePhone = (phone: string) => {
    const phoneDigits = phone.replace(/\D/g, "");
    return (
      phoneDigits.length >= 10 &&
      phoneDigits.length <= 11 &&
      phoneDigits.startsWith("0")
    );
  };

  // Real-time validation
  useEffect(() => {
    const errors: { [key: string]: string } = {};

    if (orderForm.email && !validateEmail(orderForm.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (orderForm.phone && !validatePhone(orderForm.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    setFormErrors(errors);
  }, [orderForm.email, orderForm.phone]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy");
      setOrderForm({ ...orderForm, date: formattedDate });
    }
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setOrderForm({ ...orderForm, [field]: value });
  };

  // Format phone number while typing
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    // Format as: 0123 456 789
    if (value.length > 0) {
      if (value.length <= 4) {
        value = value;
      } else if (value.length <= 7) {
        value = `${value.slice(0, 4)} ${value.slice(4)}`;
      } else {
        value = `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(
          7,
          10
        )}`;
      }
    }
    setOrderForm({ ...orderForm, phone: value });
  };

  // Auto-suggest province based on city selection
  const handleCityChange = (city: string) => {
    setOrderForm({ ...orderForm, city });
  };
  return (
    <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            Đặt dịch vụ
          </DialogTitle>
          <DialogDescription>
            Vui lòng điền thông tin dưới đây để đặt dịch vụ{" "}
            <span className="font-semibold text-primary">{service.title}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleOrderSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 border-b pb-2">
              <User className="h-4 w-4" />
              Thông tin cá nhân
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  Tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Văn A"
                  value={orderForm.firstName}
                  onChange={handleOrderFormChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Họ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Nguyễn"
                  value={orderForm.lastName}
                  onChange={handleOrderFormChange}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0912 345 678"
                    value={orderForm.phone}
                    onChange={handlePhoneChange}
                    required
                    className={cn(
                      "h-11 pl-10",
                      formErrors.phone
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    )}
                    maxLength={12}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={orderForm.email}
                    onChange={handleOrderFormChange}
                    required
                    className={cn(
                      "h-11 pl-10",
                      formErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    )}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 border-b pb-2">
              <Home className="h-4 w-4" />
              Thông tin địa chỉ
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Địa chỉ <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Đường ABC, Phường/Xã, Quận/Huyện"
                  value={orderForm.address}
                  onChange={handleOrderFormChange}
                  required
                  className="h-11 pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Thành phố/Thị xã <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={orderForm.city}
                  onValueChange={handleCityChange}
                  required
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Chọn thành phố" />
                  </SelectTrigger>
                  <SelectContent>
                    {majorCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Tỉnh <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={orderForm.province}
                  onValueChange={handleSelectChange("province")}
                  required
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Chọn tỉnh/thành phố" />
                  </SelectTrigger>
                  <SelectContent>
                    {getDistrictsByCity(orderForm.city).map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Service Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 border-b pb-2">
              <CalendarIcon className="h-4 w-4" />
              Chi tiết dịch vụ
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Ngày sử dụng dịch vụ <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP", { locale: vi })
                    ) : (
                      <span>Chọn ngày sử dụng dịch vụ</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-sm font-medium">
                Ghi chú thêm
              </Label>
              <Textarea
                id="note"
                name="note"
                placeholder="Các yêu cầu đặc biệt hoặc thông tin bổ sung (không bắt buộc)"
                value={orderForm.note}
                onChange={handleOrderFormChange}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>

          {/* Service Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900">Tóm tắt dịch vụ</h4>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dịch vụ:</span>
              <span className="text-sm font-medium">{service.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Loại:</span>
              <span className="text-sm font-medium">{service.category}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-sm font-medium text-gray-900">
                Giá dịch vụ:
              </span>
              <span className="text-lg font-bold text-primary">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(service.price)}
              </span>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOrderDialogOpen(false)}
              disabled={isSubmittingOrder}
              className="h-11"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={isSubmittingOrder || Object.keys(formErrors).length > 0}
              className="h-11"
            >
              {isSubmittingOrder ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận đặt dịch vụ"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
