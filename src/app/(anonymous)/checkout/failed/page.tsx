"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const CheckoutFailedPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-20 w-20 text-red-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Thanh Toán Thất Bại</h1>

        <p className="text-gray-600 mb-6">
          Chúng tôi rất tiếc, đã có sự cố khi xử lý thanh toán của bạn. Đơn hàng
          của bạn chưa được đặt. Vui lòng thử lại hoặc liên hệ với đội ngũ hỗ
          trợ của chúng tôi để được trợ giúp.
        </p>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <p className="text-sm text-gray-500 mb-4">
            Các lý do phổ biến dẫn đến thanh toán thất bại:
          </p>

          <ul className="text-left text-sm text-gray-600 list-disc pl-5 mb-6">
            <li>Tài khoản không đủ tiền</li>
            <li>Thông tin thanh toán không chính xác</li>
            <li>Phương thức thanh toán không được hỗ trợ</li>
            <li>Giao dịch bị từ chối bởi ngân hàng</li>
            <li>Sự cố về mạng hoặc kết nối</li>
          </ul>

          <p className="text-sm text-gray-600">
            Nếu bạn tiếp tục gặp sự cố, vui lòng liên hệ với bộ phận hỗ trợ
            khách hàng tại{" "}
            <a
              href="mailto:support@beaconburial.com"
              className="text-primary hover:underline"
            >
              support@beaconburial.com
            </a>
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Button asChild>
            <Link href="/checkout">Thử Lại</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/cart">Quay Lại Giỏ Hàng</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailedPage;
