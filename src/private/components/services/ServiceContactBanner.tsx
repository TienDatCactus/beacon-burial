import { Button } from "@/components/ui/button";
import React from "react";
const ServiceContactBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 my-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:flex-1">
          <h3 className="text-xl  text-primary mb-2">
            Cần trợ giúp trong việc lựa chọn?
          </h3>
          <p className="text-primary">
            Đội ngũ nhân viên tận tâm của chúng tôi luôn sẵn sàng 24/7 để hỗ trợ
            bạn lựa chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn.
          </p>
        </div>
        <div>
          <Button className="bg-primary text-white">
            Liên hệ với chúng tôi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceContactBanner;
