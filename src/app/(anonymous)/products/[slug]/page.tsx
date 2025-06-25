"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/interfaces";
import { formatPrice, renderStars } from "@/lib/utils";
import { Heart, MinusIcon, PlusIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCards from "@/shared/components/cards/ProductCards";

const mockProducts: Product[] = [
  {
    _id: "1",
    name: "Traditional Arrangement",
    slug: "traditional-arrangement",
    price: 165.0,
    image: "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
    rating: 5,
    description:
      "A beautiful traditional flower arrangement for all occasions.",
    category: "Arrangement",
  },
  {
    _id: "2",
    name: "Modern Arrangement",
    slug: "modern-arrangement",
    price: 156.0,
    image: "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
    rating: 5,
    description: "Contemporary floral arrangement with seasonal fresh flowers.",
    category: "Arrangement",
  },
  {
    _id: "3",
    name: "Rose and Freesia Bouquet",
    slug: "rose-and-freesia-bouquet",
    price: 155.0,
    image: "/images/image-45-840x840.jpg",
    rating: 5,
    description:
      "Elegant bouquet featuring roses and freesias for special moments.",
    category: "Bouquet",
  },
  {
    _id: "4",
    name: "Gentleness & Admiration",
    slug: "gentleness-admiration",
    price: 225.0,
    image: "/images/image-10.jpg",
    rating: 4,
    description:
      "A premium bouquet expressing genuine admiration and gentleness.",
    category: "Premium",
  },
];

export default function ProductPage() {
  const slug = useParams().slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch product data
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchProduct = () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        setTimeout(() => {
          const foundProduct = mockProducts.find((p) => p.slug === slug);
          if (foundProduct) {
            setProduct(foundProduct);
            const related = mockProducts
              .filter(
                (p) =>
                  p.category === foundProduct.category &&
                  p._id !== foundProduct._id
              )
              .slice(0, 3);
            setRelatedProducts(related);
          }
          setIsLoading(false);
        }, 300);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Handle product not found
  if (!isLoading && !product) {
    notFound();
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Sample product images for the thumbnails
  const productImages = product
    ? [product.image, "/images/image-10.jpg", "/images/image-45-840x840.jpg"]
    : [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  //   if (!product) return null; // TypeScript guard

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-12">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/category/${product?.category}`}>
                {product?.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden bg-white">
              <Image
                src={product?.image || "/images/image-10.jpg"}
                alt={product?.name || "Product Image"}
                width={1000}
                height={1000}
                quality={100}
                className="object-cover w-full h-auto"
                priority
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1">
                SALE
              </div>
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                <Search size={18} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-4">
              {/* {product?..map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedThumbnail(index)}
                  className={`relative aspect-square w-24 border-2 ${
                    selectedThumbnail === index
                      ? "border-amber-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product?.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))} */}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <span className="inline-block bg-primary text-white text-xs px-2 py-1 mb-2">
                SALE
              </span>
              <h1 className="text-3xl font-serif">{product?.name}</h1>
            </div>

            <div className="mb-6">
              <span className="text-gray-400 line-through mr-2">
                $
                {(product?.price && (product?.price * 1.15).toFixed(2)) ||
                  "0.00"}
              </span>
              <span className="text-xl font-medium">
                ${product?.price?.toFixed(2)}
              </span>
            </div>

            <div className="flex mb-6">
              <div className="flex">
                {product?.rating && renderStars(product?.rating)}
              </div>
            </div>

            <div className="mb-8 prose">
              <p className="text-gray-600">
                Dicta sunt explicabo. Nemo enim ipsam voluptatem voluptas sit
                odit aut fugit, sed quia consequuntur. Lorem ipsum modem eirmod
                dolor.
              </p>
              <p className="text-gray-600 mt-4">
                Aqua sit amet, elit, sed diam nonumy eirmod tempor invidunt
                labore et dolore magna aliquam erat, sed diam voluptua. At vero
                accusam et justo duo dolores et ea rebum.
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100"
                >
                  <MinusIcon size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-12 text-center py-2 focus:outline-none"
                  min="1"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100"
                >
                  <PlusIcon size={16} />
                </button>
              </div>

              <Button className="bg-primary hover:bg-primary/60 text-white px-6">
                Buy now
              </Button>

              <Button
                variant="outline"
                className="p-2 border border-gray-300 hover:bg-gray-100"
              >
                <Heart size={20} />
              </Button>
            </div>

            {/* Product Metadata */}
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <span className="font-medium">Category: </span>
                <Link
                  href={`/category/${product?.category}`}
                  className="text-primary hover:underline"
                >
                  {product?.category}
                </Link>
              </div>
              <div>
                <span className="font-medium">Tags: </span>
                <Link
                  href="/tag/funeral"
                  className="text-primary hover:underline"
                >
                  funeral
                </Link>
                ,{" "}
                <Link href="/tag/item" className="text-primary hover:underline">
                  item
                </Link>
              </div>
              <div>
                <span className="font-medium">Product ID: </span>
                <span>2377</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="border-b border-gray-200 w-full justify-start">
            <TabsTrigger
              value="description"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Reviews (1)
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary  rounded-none"
            >
              Additional information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <h3 className="text-xl font-medium mb-4">Product Description</h3>
            <div className="prose max-w-none">
              <p>
                Our {product?.name} features a carefully curated selection of
                premium flowers that are perfect for expressing your sympathy
                and support during difficult times. Each arrangement is
                handcrafted by our expert florists using only the freshest
                flowers available.
              </p>
              <p className="mt-4">
                The gentle color palette and thoughtful composition create a
                calming presence that conveys respect and remembrance. Suitable
                for funeral services, memorial gatherings, or as a heartfelt
                gesture to someone experiencing loss.
              </p>
              <p className="mt-4">
                All our flowers are sourced from sustainable growers and
                delivered with care and compassion. We understand the importance
                of these moments and strive to provide arrangements that honor
                both memories and emotions with dignity.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <div className="flex items-center mb-4">
              <div className="flex mr-2">{renderStars(5)}</div>
              <span className="text-sm text-gray-600">Based on 1 review</span>
            </div>

            <div className="border-t border-b border-gray-200 py-6 my-6">
              <div className="flex items-center mb-2">
                <span className="font-medium mr-2">Jane Doe</span>
                <span className="text-sm text-gray-500">– March 15, 2025</span>
              </div>
              <div className="flex mb-3">{renderStars(5)}</div>
              <p className="text-gray-700">
                Beautiful arrangement that arrived on time and lasted for weeks.
                The flowers were fresh and exactly as pictured. Would definitely
                order again.
              </p>
            </div>

            <Button className="bg-primary hover:bg-amber-600 text-white">
              Write a review
            </Button>
          </TabsContent>

          <TabsContent value="additional" className="pt-6">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium">
                    Dimensions
                  </th>
                  <td className="py-3">40 × 30 × 20 cm</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium">Weight</th>
                  <td className="py-3">2 kg</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium">
                    Flower types
                  </th>
                  <td className="py-3">Roses, Lilies, Carnations</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium">
                    Care instructions
                  </th>
                  <td className="py-3">
                    Change water daily, keep away from direct sunlight
                  </td>
                </tr>
              </tbody>
            </table>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-6xl mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((product) => (
                <ProductCards key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
