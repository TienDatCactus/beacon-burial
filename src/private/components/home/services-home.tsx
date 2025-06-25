import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
const ServiceSection: React.FC = () => {
  const services = [
    {
      icon: "/icons/angel-wings-heart-svgrepo-com.svg",
      service: "Tin Tức Tưởng Niệm",
      description: "Hơn 1000 trang tưởng niệm để vinh danh người đã khuất",
    },
    {
      icon: "/icons/funeral-urn-svgrepo-com.svg",
      service: "Hỗ Trợ Tang Lễ",
      description:
        "Chúng tôi giúp gia đình vượt qua nỗi mất mát với sự chăm sóc tận tâm",
    },
    {
      icon: "/icons/candle-svgrepo-com.svg",
      service: "Lập Kế Hoạch Tang Lễ",
      description:
        "Tổ chức toàn bộ nghi lễ cho tang lễ Phật giáo, Công giáo và cán bộ nhà nước",
    },
    {
      icon: "/icons/coffin-svgrepo-com.svg",
      service: "Mẫu Tang Lễ",
      description:
        "Tất cả nhu cầu tang lễ bao gồm các gói Tiết kiệm, Cơ bản, Cao cấp và Đặc biệt",
    },
  ];
  return (
    <section className="max-w-[125rem] flex flex-col justify-center items-center mx-auto p-20 space-y-4 und">
      <div className="text-center space-y-4 mb-8">
        <h2>Chúng tôi đem tới</h2>
        <h1 className="font-bold text-5xl">Các dịch vụ trọn gói</h1>
      </div>
      <ul className="grid grid-cols-4 space-x-8 ">
        {services.map((service, index) => (
          <li
            key={index}
            className="bg-white/50 mb-6 group p-4 text-center cursor-pointer space-y-2"
          >
            <div>
              <Image
                width={1000}
                height={1000}
                className="w-full object-contain h-20 mx-auto mb-2"
                src={service.icon}
                alt="Service Image"
              />
            </div>
            <h3 className="duration-200 group-hover:text-primary text-base font-semibold">
              {service.service}
            </h3>
            <p className=" text-gray-600 text-xs">{service.description}</p>
          </li>
        ))}
      </ul>
      <Button className="bg-primary text-white hover:bg-primary/80 transition-all duration-300 cursor-pointer p-6">
        Tìm hiểu thêm
      </Button>
    </section>
  );
};

export default ServiceSection;
