import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
const HeroSection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 bg-black/30" />
        <Image
          width={1000}
          height={1000}
          className="w-full h-screen object-cover"
          src={"/images/pexels-brett-sayles-3648309.jpg"}
          alt="Hero Image"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center w-3/4 mx-auto space-y-4">
          <h5 className="text-lg">Dịch vụ tang lễ trọn gói </h5>
          <h1 className="text-5xl  font-bold">
            Chúng tôi thấu hiểu <br />
            Chia sẻ nỗi đau, phụng sự bằng cả trái tim
          </h1>
          <Button className="bg-primary text-white hover:bg-primary/80 transition-all duration-300 cursor-pointer p-6">
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
