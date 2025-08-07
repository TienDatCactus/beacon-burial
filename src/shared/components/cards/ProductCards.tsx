"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/api/product";
import { useCartStore } from "@/lib/stores/useCartStore";
import { renderStars } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/formatting";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCards: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCartStore();

  // Only show active products (extra safety check)
  if (product.status !== "active") {
    return null;
  }

  // Handle add to cart with click event prevention
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();
    addItem(product, 1);
  };

  // Handle wishlist action
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();
    // TODO: Implement wishlist functionality
    console.log("Add to wishlist:", product.name);
  };

  return (
    <div
      key={product._id}
      className="group max-h-140 mb-6 group p-4 text-center cursor-pointer space-y-2"
    >
      <div className="relative w-full">
        <Image
          width={1000}
          height={1000}
          src={product.image?.[0] || "/icons/image-off.svg"}
          alt={product.name}
          className="w-full duration-200 object-cover lg:h-100 mx-auto mb-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/icons/image-off.svg";
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -50, x: 0 }}
          whileHover={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-0 transition-opacity duration-200 gap-2 flex items-center justify-center *:bg-white *:rounded-full "
        >
          <Button
            onClick={handleAddToCart}
            className="bg-white hover:-translate-y-2 hover:bg-primary text-black hover:*:text-white"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart className="text-gray-700" />
          </Button>

          <Button
            onClick={handleWishlist}
            className="bg-white hover:-translate-y-2 hover:bg-primary text-black hover:*:text-white"
            title="Thêm vào danh sách yêu thích"
          >
            <Heart className="text-gray-700" />
          </Button>
        </motion.div>
      </div>
      <Link href={`/products/${product._id}`}>
        <h3 className="duration-200 group-hover:text-primary text-lg font-semibold">
          {product.name}
        </h3>
      </Link>
      <p className="text-gray-500 text-base">{formatCurrency(product.price)}</p>
      <div className="flex items-center justify-center space-x-1">
        <span className="flex">{renderStars(5)}</span>
        {product.isFeatured && (
          <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
            Nổi bật
          </span>
        )}
      </div>

      {/* Stock status indicator */}
      <div className="flex items-center justify-center space-x-2 text-xs">
        <span className="text-green-600">✓ Còn hàng</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-500">SL: {product.quantity}</span>
      </div>
    </div>
  );
};

export default ProductCards;
