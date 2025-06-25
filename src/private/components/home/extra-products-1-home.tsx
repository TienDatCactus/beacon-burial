import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
const ExtraProducts1Section: React.FC = () => {
  return (
    <section className="w-full lg:h-100 mx-auto relative">
      <Image
        width={1000}
        height={1000}
        src="/images/image-10.jpg"
        alt="Description of image"
        quality={100}
        className="w-full h-full object-cover "
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="flex absolute inset-0 items-center justify-center text-white mx-auto h-1/2 my-auto max-w-2/3 p-10 gap-10">
        <div className="space-y-6">
          <legend className="text-sm ">
            Tư Vấn Tâm Lý – Đồng Hành Cùng Bạn
          </legend>
          <h1 className="text-5xl font-bold leading-snug">
            Hỗ Trợ Tinh Thần Giúp Bạn Vượt Qua Nỗi Đau Mất Mát
          </h1>
        </div>
        <div className="h-full flex flex-col justify-between items-start ">
          <p className="font-secondary font-light text-base">
            Việc mất đi người thân xảy ra đột ngột, và điều khó khăn nhất đối
            với gia đình, bạn bè – đặc biệt là trẻ nhỏ – là giữ được sự cân bằng
            tâm lý và bình tĩnh.
          </p>
          <Button>Liên hệ với chúng tôi</Button>
        </div>
      </div>
    </section>
  );
};

export default ExtraProducts1Section;
