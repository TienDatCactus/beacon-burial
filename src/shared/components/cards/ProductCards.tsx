"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/interfaces";
import { useCartStore } from "@/lib/stores/useCartStore";
import { renderStars } from "@/lib/utils";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCards: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCartStore();

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        key={product._id}
        className="group max-h-140 mb-6 group p-4 text-center cursor-pointer space-y-2"
      >
        <div className="relative w-full">
          <Image
            width={1000}
            height={1000}
            src={product.image}
            alt={product.name}
            className="w-full duration-200 group-hover:scale-[1.02] object-cover lg:h-100 mx-auto mb-2"
          />
          <motion.div
            initial={{ opacity: 0, y: -50, x: 0 }}
            whileHover={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 transition-opacity duration-200 gap-2 flex items-center justify-center *:bg-white *:rounded-full "
          >
            <Button
              onClick={() => addItem(product, 1)}
              className="bg-white hover:-translate-y-2 hover:bg-primary text-black hover:*:text-white"
            >
              <ShoppingCart className="text-gray-700" />
            </Button>

            <Button className="bg-white hover:-translate-y-2 hover:bg-primary text-black hover:*:text-white">
              <Heart className="text-gray-700" />
            </Button>
          </motion.div>
        </div>
        <h3 className="duration-200 group-hover:text-primary text-lg font-semibold">
          {product.name}
        </h3>
        <p className="text-gray-500 text-base">
          {product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <div className="flex items-center justify-center space-x-1 ">
          <span className="flex">{renderStars(product.rating)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCards;
