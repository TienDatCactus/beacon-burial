import { Button } from "@/components/ui/button";
import { Product } from "@/lib/interfaces";
import ProductCards from "@/shared/components/cards/ProductCards";
import React from "react";
const PopularProductSection: React.FC = () => {
  const products: Product[] = [
    {
      _id: "1",
      image: "/images/image-45-840x840.jpg",
      name: "Sản phẩm 1",
      price: 100000,
      rating: 4.5, // Example rating
      slug: "product-1",
    },
    {
      _id: "2",
      image: "/images/image-45-840x840.jpg",
      name: "Sản phẩm 2",
      price: 200000,
      rating: 4.0,
      slug: "product-2",
    },
    {
      _id: "3",
      image: "/images/image-45-840x840.jpg",
      name: "Sản phẩm 3",
      price: 300000,
      rating: 4.8,
      slug: "product-3",
    },
    {
      _id: "4",
      image: "/images/image-45-840x840.jpg",
      name: "Sản phẩm 4",
      price: 300000,
      rating: 4.7,
      slug: "product-4",
    },
  ];
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
