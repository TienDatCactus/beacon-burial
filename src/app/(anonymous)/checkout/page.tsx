"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { productCheckout, ProductCheckoutData } from "@/lib/api/order";
import { useCartStore } from "@/lib/stores/useCartStore";
import { cn, formatCurrency } from "@/lib/utils";
import CartBreadcrumps from "@/shared/components/breadcrums/CartBreadcrumps";
import {
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  Home,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// Vietnamese provinces/cities data
const vietnameseProvinces = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
  // Major cities
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
];

const majorCities = [
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Biên Hòa",
  "Nha Trang",
  "Huế",
  "Rạch Giá",
  "Cà Mau",
  "Long Xuyên",
  "Thái Nguyên",
  "Thanh Hóa",
  "Vinh",
  "Buôn Ma Thuột",
  "Pleiku",
  "Mỹ Tho",
  "Vũng Tàu",
  "Đà Lạt",
  "Phan Thiết",
];

// Define checkout form types - matching API requirements
type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  note?: string;
  paymentMethod: string;
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items: cartItems, clearCart, totalPrice } = useCartStore();
  const [total, setTotal] = useState(0);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const shipping = "$0.00";
  const shippingCost = 0;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      province: "",
      phone: "",
      email: "",
      note: "",
      paymentMethod: "cash",
    },
  });

  // Calculate final total with shipping
  useEffect(() => {
    setTotal(totalPrice + shippingCost);
  }, [totalPrice, shippingCost]);

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
    const watchedEmail = watch("email");
    const watchedPhone = watch("phone");
    const errors: { [key: string]: string } = {};

    if (watchedEmail && !validateEmail(watchedEmail)) {
      errors.email = "Email không hợp lệ";
    }

    if (watchedPhone && !validatePhone(watchedPhone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    setFormErrors(errors);
  }, [watch("email"), watch("phone"), watch]);

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

    // Update form value manually
    const event = {
      target: {
        name: "phone",
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    // Use register to update the value
    register("phone").onChange(event);
  };

  // Auto-suggest province based on city selection
  const handleCityChange = (city: string) => {
    // Auto-suggest province based on major cities
    const cityProvinceMap: { [key: string]: string } = {
      "TP. Hồ Chí Minh": "TP. Hồ Chí Minh",
      "Hà Nội": "Hà Nội",
      "Đà Nẵng": "Đà Nẵng",
      "Hải Phòng": "Hải Phòng",
      "Cần Thơ": "Cần Thơ",
      "Biên Hòa": "Đồng Nai",
      "Nha Trang": "Khánh Hòa",
      Huế: "Thừa Thiên Huế",
      "Rạch Giá": "Kiên Giang",
      "Long Xuyên": "An Giang",
      "Thái Nguyên": "Thái Nguyên",
      "Thanh Hóa": "Thanh Hóa",
      Vinh: "Nghệ An",
      "Buôn Ma Thuột": "Đắk Lắk",
      Pleiku: "Gia Lai",
      "Mỹ Tho": "Tiền Giang",
      "Vũng Tàu": "Bà Rịa - Vũng Tàu",
      "Đà Lạt": "Lâm Đồng",
      "Phan Thiết": "Bình Thuận",
      "Cà Mau": "Cà Mau",
    };

    // If there's a corresponding province for the selected city, auto-suggest it
    const suggestedProvince = cityProvinceMap[city];
    if (suggestedProvince) {
      // Auto-fill the province field
      setValue("province", suggestedProvince);
    }

    return city;
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    console.log("Checkout form data:", data);

    try {
      // Validate cart has items
      if (!cartItems || cartItems.length === 0) {
        toast.error("Giỏ hàng của bạn đang trống!");
        return;
      }

      // Prepare product IDs from cart items - ensure they are strings
      const productIds = cartItems
        .map((item) => item.product._id)
        .filter((id) => id && typeof id === "string"); // Filter out any invalid IDs

      console.log("Product IDs extracted from cart:", productIds);

      // Validate that we have valid product IDs
      if (productIds.length === 0) {
        toast.error("Không tìm thấy sản phẩm hợp lệ trong giỏ hàng!");
        return;
      }

      // Prepare checkout data for API
      const checkoutData: ProductCheckoutData = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        address: data.address.trim(),
        city: data.city.trim(),
        province: data.province.trim(),
        phone: data.phone.replace(/\s/g, ""), // Remove spaces from phone
        email: data.email.trim().toLowerCase(),
        note: data.note?.trim() || "",
        productId: productIds, // Array of product IDs from cart
      };

      await productCheckout(checkoutData);
      clearCart();
      toast.success("Đặt hàng thành công!", {
        description:
          "Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi! Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn.",
      });

      router.push("/checkout/success");
    } catch (error: any) {
      console.error("Checkout error:", error);
      const errorMessage =
        error.message || "Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.";
      toast.error("Đặt hàng thất bại!", {
        description: errorMessage,
      });

      router.push("/checkout/failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container bg-gray-50 mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <CartBreadcrumps />
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Thông tin thanh toán</h1>
        <div className="flex justify-center gap-2">
          <p>Đã có tài khoản?</p>
          <Link href="/auth/login" className="text-primary hover:underline">
            Nhấn vào đây để đăng nhập
          </Link>
        </div>
        <div className="flex justify-center gap-2 mt-1">
          <p>Bạn có mã giảm giá?</p>
          <Link href="/cart" className="text-primary hover:underline">
            Nhấn vào đây để nhập mã
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Billing Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Thông tin thanh toán
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 border-b pb-2">
                  <User className="h-4 w-4" />
                  Thông tin cá nhân
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      Tên <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="Văn A"
                      {...register("firstName", {
                        required: "Tên là bắt buộc",
                      })}
                      className={`h-11 ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Họ <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Nguyễn"
                      {...register("lastName", {
                        required: "Họ là bắt buộc",
                      })}
                      className={`h-11 ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Số điện thoại <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0912 345 678"
                        {...register("phone", {
                          required: "Số điện thoại là bắt buộc",
                          pattern: {
                            value: /^[0-9\s\-\+\(\)]{10,}$/,
                            message: "Vui lòng nhập số điện thoại hợp lệ",
                          },
                        })}
                        onChange={handlePhoneChange}
                        className={`h-11 pl-10 ${
                          errors.phone || formErrors.phone
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                        maxLength={12}
                      />
                    </div>
                    {(errors.phone || formErrors.phone) && (
                      <p className="text-red-500 text-sm">
                        {errors.phone?.message || formErrors.phone}
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
                        type="email"
                        placeholder="email@example.com"
                        {...register("email", {
                          required: "Email là bắt buộc",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Vui lòng nhập địa chỉ email hợp lệ",
                          },
                        })}
                        className={`h-11 pl-10 ${
                          errors.email || formErrors.email
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {(errors.email || formErrors.email) && (
                      <p className="text-red-500 text-sm">
                        {errors.email?.message || formErrors.email}
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
                      placeholder="123 Đường ABC, Phường/Xã, Quận/Huyện"
                      {...register("address", {
                        required: "Địa chỉ đường phố là bắt buộc",
                      })}
                      className={`h-11 pl-10 ${
                        errors.address ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address?.message}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Thành phố/Thị xã <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: "Thành phố là bắt buộc" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            handleCityChange(value);
                          }}
                          value={field.value}
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
                      )}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="province"
                      control={control}
                      rules={{ required: "Tỉnh/thành là bắt buộc" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Chọn tỉnh/thành phố" />
                          </SelectTrigger>
                          <SelectContent>
                            {vietnameseProvinces.map((province) => (
                              <SelectItem key={province} value={province}>
                                {province}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.province && (
                      <p className="text-red-500 text-sm">
                        {errors.province.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-sm font-medium">
                  Ghi chú đơn hàng (không bắt buộc)
                </Label>
                <Textarea
                  id="note"
                  rows={4}
                  placeholder="Các yêu cầu đặc biệt hoặc thông tin bổ sung (không bắt buộc)"
                  {...register("note")}
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting || Object.keys(formErrors).length > 0}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 h-auto text-base font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Đặt hàng ngay
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="md:col-span-1">
            <div className=" p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Phí vận chuyển</span>
                  <span>{shipping}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="payment-cash"
                    value="cash"
                    checked={watch("paymentMethod") === "cash"}
                    defaultChecked={watch("paymentMethod") == "cash"}
                    {...register("paymentMethod")}
                  />
                  <Label
                    htmlFor="payment-cash"
                    className="text-sm text-gray-600 mt-1"
                  >
                    Thanh toán khi nhận hàng
                  </Label>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Thanh toán bằng tiền mặt khi giao hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
