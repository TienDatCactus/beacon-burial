import { Button } from "@/components/ui/button";
import { PhoneOutgoing } from "lucide-react";
import Image from "next/image";
import React from "react";
const InfoSection: React.FC = () => {
  return (
    <section className="max-w-[125rem] lg:h-[50rem] grid grid-cols-1 lg:grid-cols-2 justify-center items-center mx-auto p-20 space-y-4 bg-white">
      <div className="space-y-6">
        <legend className="text-sm text-neutral-600 font-extralight">
          Sứ mệnh của chúng tôi
        </legend>
        <h2 className="text-4xl font-semibold ">
          Dịch vụ tổ chức lễ tang trọn gói <br /> Trang nghiêm & Chu đáo
        </h2>
        <p className="text-gray-700 text-base">
          Cung cấp các gói dịch vụ tang lễ chuyên nghiệp, theo tôn giáo và phong
          tục của từng gia đình. Đảm bảo sự trang trọng và bình an cho người đã
          khuất.
        </p>
        <div className="flex items-center space-x-2">
          <Button className="bg-primary text-white hover:bg-primary/80 transition-all duration-300 cursor-pointer p-6 ">
            Xem các dịch vụ
          </Button>
          <div className="flex items-center justify-center  space-x-2">
            <Button
              className="rounded-full bg-neutral-200 text-black"
              size={"icon"}
            >
              <PhoneOutgoing />
            </Button>
            <span className="">+033 872 2615</span>
          </div>
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center z-10">
        <Image
          width={1000}
          height={1000}
          src="/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg"
          alt="Info Home"
          className="absolute z-10 -top-40 left-10 w-100  object-contain"
        />
        <Image
          width={1000}
          height={1000}
          src="/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg"
          alt="Info Home"
          className="w-100 z-0 absolute -bottom-40 right-10  object-cover"
        />
      </div>
    </section>
  );
};

export default InfoSection;
