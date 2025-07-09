"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/lib/interfaces";
import ProductCards from "@/shared/components/cards/ProductCards";
import PathCrumbs from "@/shared/components/layouts/path-crumbs";
import { ChevronDown } from "lucide-react";
import React from "react";

const Shop: React.FC = () => {
  const products: Product[] = [
    {
      _id: "1",
      name: "Traditional Arrangement",
      slug: "traditional-arrangement",
      price: 165.0,
      image: "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
      rating: 5,
    },
    {
      _id: "2",
      name: "Pink & Lilac Bouquet",
      slug: "pink-lilac-bouquet",
      price: 155.0,
      image: "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
      rating: 5,
    },
    {
      _id: "3",
      name: "Rose and Freesia Bouquet",
      slug: "rose-and-freesia-bouquet",
      price: 145.0,
      image: "/images/image-45-840x840.jpg",
      rating: 5,
    },
    {
      _id: "4",
      name: "White Rose Bouquet",
      slug: "white-rose-bouquet",
      price: 145.0,
      image: "/images/image-10.jpg",
      rating: 4,
    },
    {
      _id: "5",
      name: "Spring Delight Bouquet",
      slug: "spring-delight-bouquet",
      price: 160.0,
      image: "/images/pexels-brett-sayles-3648309.jpg",
      rating: 5,
    },
    {
      _id: "6",
      name: "Pink Carnation Bouquet",
      slug: "pink-carnation-bouquet",
      price: 150.0,
      image: "/images/pexels-kseniachernaya-8986709.jpg",
      rating: 4,
    },
    {
      _id: "7",
      name: "Memorial Flower Set",
      slug: "memorial-flower-set",
      price: 185.0,
      image: "/images/pexels-sora-shimazaki-5668886.jpg",
      rating: 5,
    },
    {
      _id: "8",
      name: "Sympathy Wreath",
      slug: "sympathy-wreath",
      price: 195.0,
      image: "/images/image-45-840x840.jpg",
      rating: 5,
    },
    {
      _id: "9",
      name: "Memorial Tribute",
      slug: "memorial-tribute",
      price: 175.0,
      image: "/images/image-10.jpg",
      rating: 4,
    },
  ];

  return (
    <div className="bg-gray-50 p-20">
      <div className="container mx-auto px-4">
        <PathCrumbs />
        <div className="flex flex-col space-y-4 items-center mb-12">
          <h1 className="text-6xl  text-center ">Cửa hàng</h1>
          <ChevronDown />
        </div>

        {/* Filter and Sort */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500 text-sm">
            Đang hiển thị 1 – {products.length} trong 12 kết quả
          </p>
          <div className="relative">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Mới nhất</SelectItem>
                <SelectItem value="popularity">Phổ biến</SelectItem>
                <SelectItem value="price-low">
                  Sắp xếp theo giá: thấp đến cao
                </SelectItem>
                <SelectItem value="price-high">
                  Sắp xếp theo giá: cao đến thấp
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCards key={product._id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Shop;
