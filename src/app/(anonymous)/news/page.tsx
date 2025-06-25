import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const page: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl text-center space-y-8">
      <Image
        src="/images/undraw_dev-environment_n5by.svg"
        alt="under construction"
        width={1000}
        height={1000}
      />
      <h1 className="text-xl font-semibold">
        Chức năng này đang được phát triển. Vui lòng quay lại sau!
      </h1>
      <Button>
        <Link href="/" className="text-white">
          Quay lại trang chủ
        </Link>
      </Button>
    </div>
  );
};

export default page;
