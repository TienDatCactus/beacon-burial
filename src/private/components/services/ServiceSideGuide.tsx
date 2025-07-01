import { Button } from "@/components/ui/button";
import React from "react";
import { ServiceCardProps } from "./ServiceCard";
import { formatCurrency } from "@/lib/utils";
const ServiceSideGuide: React.FC<{ services: ServiceCardProps[] }> = ({
  services,
}) => {
  return (
    <>
      {" "}
      <div className="bg-gray-900 rounded-lg shadow-md text-white overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg  mb-3">Cần hỗ trợ khẩn cấp ?</h2>
          <p className="text-gray-300 text-sm mb-4">
            Đội ngũ tận tâm của chúng tôi luôn sẵn sàng 24/7 để giúp đỡ bạn
            trong thời gian khó khăn này.
          </p>
          <Button className="w-full bg-amber-500 hover:bg-amber-600">
            Gọi ngay: (555) 123-4567
          </Button>
        </div>
      </div>
      {/* Price Guide */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg  mb-1">Hướng dẫn giá dịch vụ</h2>
          <p className="text-sm text-gray-500">
            Giá cả minh bạch cho tất cả các gói
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm font-medium">Gói cơ bản</span>
              <span className="text-sm">
                Từ{" "}
                {formatCurrency(
                  Math.min(
                    ...services
                      .filter((s) => s.category === "Basic")
                      .map((s) => s.price || 0)
                  )
                )}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm font-medium">Gói truyền thống</span>
              <span className="text-sm">
                Từ{" "}
                {formatCurrency(
                  Math.min(
                    ...services
                      .filter((s) => s.category === "Traditional")
                      .map((s) => s.price || 0)
                  )
                )}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm font-medium">Gói cao cấp</span>
              <span className="text-sm">
                Từ{" "}
                {formatCurrency(
                  Math.min(
                    ...services
                      .filter((s) => s.category === "Premium")
                      .map((s) => s.price || 0)
                  )
                )}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-sm font-medium">Dịch vụ chuyên biệt</span>
              <span className="text-sm">
                Từ{" "}
                {formatCurrency(
                  Math.min(
                    ...services
                      .filter((s) => s.category === "Specialized")
                      .map((s) => s.price || 0)
                  )
                )}
              </span>
            </div>
          </div>
          <div className="mt-6 bg-gray-50 rounded-md p-4">
            <p className="text-sm text-gray-600">
              Tất cả các gói của chúng tôi đều bao gồm dịch vụ chuyên nghiệp,
              phối hợp với bên thứ ba và hỗ trợ 24/7.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceSideGuide;
