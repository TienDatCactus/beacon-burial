import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ServiceHero: React.FC = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/pexels-brett-sayles-3648309.jpg"
          alt="Funeral Services"
          fill
          className="object-cover opacity-30"
        />
      </div>
      <div className="relative container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl  mb-4">
            Dịch vụ tang lễ và tưởng niệm
          </h1>
          <p className="text-xl md:text-2xl opacity-80 mb-8">
            Tôn vinh cuộc sống với sự tôn trọng, lòng nhân ái và sự đồng cảm
          </p>
          <div className="inline-flex rounded-md shadow">
            <Link href="#service-packages">
              <Button className="px-8 py-3  text-white">
                Xem Các Gói Dịch Vụ Của Chúng Tôi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
