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
import { useCartStore } from "@/lib/stores/useCartStore";
import CartBreadcrumps from "@/shared/components/breadcrums/CartBreadcrumps";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// Define checkout form types
type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  shipToDifferentAddress: boolean;
  orderNotes?: string;
  paymentMethod: string;
};

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items: cartItems, totalPrice, clearCart } = useCartStore();
  const [total, setTotal] = useState(0);
  const shipping = "$0.00";
  const shippingCost = 0;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      phone: "",
      email: "",
      orderNotes: "",
      paymentMethod: "cash",
    },
  });

  // Calculate final total with shipping
  useEffect(() => {
    setTotal(totalPrice + shippingCost);
  }, [totalPrice, shippingCost]);

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    console.log(data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearCart();
      toast.success("Đặt hàng thành công!", {
        description: "Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi!",
      });

      // Redirect to success page
      router.push("/checkout/success");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");

      // Redirect to failure page on error
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Tên
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName", {
                    required: "Tên là bắt buộc",
                  })}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Họ
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName", {
                    required: "Họ là bắt buộc",
                  })}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label
                htmlFor="streetAddress"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Địa chỉ đường phố
              </Label>
              <Input
                id="streetAddress"
                placeholder="Số nhà và tên đường"
                {...register("streetAddress", {
                  required: "Địa chỉ đường phố là bắt buộc",
                })}
                className={errors.streetAddress ? "border-red-500" : ""}
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm">
                  {errors.streetAddress?.message}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-2">
              <Label
                htmlFor="city"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Thành phố
              </Label>
              <Input
                id="city"
                {...register("city", { required: "Thành phố là bắt buộc" })}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>

            <div className="mt-6 space-y-2">
              <Label
                htmlFor="state"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Tỉnh/Thành
              </Label>
              <Controller
                name="state"
                control={control}
                rules={{ required: "Tỉnh/thành là bắt buộc" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn tỉnh/thành" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tỉnh/Thành</SelectLabel>
                        <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                        <SelectItem value="TP.HCM">TP.HCM</SelectItem>
                        <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>

            <div className="mt-6 space-y-2">
              <Label
                htmlFor="phone"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Điện thoại
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Số điện thoại là bắt buộc",
                  pattern: {
                    value:
                      /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    message: "Vui lòng nhập số điện thoại hợp lệ",
                  },
                })}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div className="mt-6 space-y-2">
              <Label
                htmlFor="email"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Địa chỉ email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Vui lòng nhập địa chỉ email hợp lệ",
                  },
                })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="orderNotes">
                Ghi chú đơn hàng (không bắt buộc)
              </Label>
              <Textarea
                id="orderNotes"
                rows={4}
                placeholder="Ghi chú về đơn hàng của bạn, ví dụ: hướng dẫn giao hàng đặc biệt"
                {...register("orderNotes")}
                className="w-full rounded-md border border-input px-3 py-2 text-base shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </form>
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
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Phí vận chuyển</span>
                  <span>{shipping}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span>${total.toFixed(2)}</span>
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

              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full mt-6"
              >
                {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
