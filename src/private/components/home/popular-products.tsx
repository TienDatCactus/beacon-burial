import { Button } from "@/components/ui/button";
import { useProducts } from "@/lib/hooks/useProducts";
import ProductCards from "@/shared/components/cards/ProductCards";
import React from "react";
const PopularProductSection: React.FC = () => {
  const { products } = useProducts({ limit: 8 });
  return (
    <section className="max-w-[125rem] flex flex-col justify-center items-center mx-auto p-20 space-y-4 bg-white/50 ">
      <div className="space-y-4 text-center">
        <legend>Cửa hàng của chúng tôi</legend>
        <h1 className="text-5xl font-bold">Các Sản Phẩm Phổ Biến</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full ">
        {products?.map((product, index) => (
          <ProductCards key={index} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center w-full mt-10">
        <Button className="bg-primary  text-white hover:bg-primary/80  hover:text-white">
          Xem tất cả sản phẩm
        </Button>
      </div>
    </section>
  );
};

export default PopularProductSection;
