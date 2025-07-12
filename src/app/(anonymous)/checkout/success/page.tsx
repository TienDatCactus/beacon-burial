"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils/formatting";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const CheckoutSuccessPage: React.FC = () => {
  // const router = useRouter();

  // Trong ứng dụng thực tế, bạn có thể xác minh trạng thái đơn hàng từ API
  useEffect(() => {
    // Kiểm tra xem người dùng có đến từ trang thanh toán không
    // Nếu không, chuyển hướng về trang chủ
    // Đây là cách đơn giản để ngăn truy cập trực tiếp vào trang này
    const handleBeforeUnload = () => {
      // Dọn dẹp bất kỳ lưu trữ phiên hoặc trạng thái liên quan đến thanh toán
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Đã Nhận Đơn Hàng</h1>

        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được đặt và đang được xử
          lý. Bạn sẽ nhận được email xác nhận trong thời gian ngắn.
        </p>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Mã Đơn Hàng:</span>
            <span>#BB-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-medium">Ngày:</span>
            <span>{formatDate(new Date())}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-medium">Email:</span>
            <span>customer@example.com</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-medium">Tổng:</span>
            <span>$300.00</span>
          </div>

          <div className="flex justify-between  mb-2">
            <span className="font-medium text-start">
              Phương Thức Thanh Toán:
            </span>
            <span className="text-end">Thanh Toán Khi Nhận Hàng</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Button asChild>
            <Link href="/services">Tiếp Tục Mua Sắm</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/account/orders">Xem Lịch Sử Đơn Hàng</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
