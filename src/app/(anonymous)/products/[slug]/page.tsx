"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProduct, useProducts } from "@/lib/hooks/useProducts";
import { useCartStore } from "@/lib/stores/useCartStore";
import { formatCurrency } from "@/lib/utils/formatting";
import ProductCards from "@/shared/components/cards/ProductCards";
import PathCrumbs from "@/shared/components/layouts/path-crumbs";
import { Heart, Loader2, MinusIcon, PlusIcon, Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  console.log(slug);
  // Get all products to find by id and get related products
  const { fetchProduct, product } = useProduct();
  const { products } = useProducts();
  const { addItem } = useCartStore();

  // Find product by id and get related products
  useEffect(() => {
    if (!product) {
      fetchProduct(slug);
    }
    setIsLoading(false);
  }, [product, slug, fetchProduct]);
  console.log(product);
  // Get related products (from same category)
  const relatedProducts = products
    .filter(
      (p) =>
        p.category === product?.category &&
        p._id !== product?._id &&
        p.status === "active"
    )
    .slice(0, 3);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;

    addItem(product, quantity);

    toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted
        ? "Đã xóa khỏi danh sách yêu thích"
        : "Đã thêm vào danh sách yêu thích"
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Đang tải sản phẩm...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm</p>
              <Button onClick={() => router.push("/shop")}>
                Quay lại cửa hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const productImages = Array.isArray(product.image)
    ? product.image
    : [product.image];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <PathCrumbs />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden bg-white rounded-lg">
              <Image
                src={
                  productImages[selectedImageIndex] || "/icons/image-off.svg"
                }
                alt={product.name}
                width={1000}
                height={1000}
                quality={100}
                className="object-cover w-full h-full"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/icons/image-off.svg";
                }}
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1">
                {product.category}
              </div>
              <span
                className={`absolute top-4 right-4 px-2 py-1 text-xs font-bold rounded ${
                  product.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.status === "active" ? "Có sẵn" : "Hết hàng"}
              </span>
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="flex space-x-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square w-24 border-2 rounded-lg overflow-hidden ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/icons/image-off.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/icons/image-off.svg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block bg-primary text-white text-xs px-2 py-1 mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
            </div>

            <div className="flex mb-6">
              <div className="flex">
                {renderStars(5)}{" "}
                {/* Default 5 stars since rating is not in Product interface */}
              </div>
              <span className="text-sm text-gray-600 ml-2">(5 đánh giá)</span>
            </div>

            <div className="mb-8 prose">
              <p className="text-gray-600">
                {product.description || "Mô tả sản phẩm sẽ được cập nhật sớm."}
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  onClick={decrementQuantity}
                  variant="ghost"
                  size="sm"
                  disabled={quantity <= 1}
                  className="px-3 py-2 border-r border-gray-300 hover:bg-gray-100"
                >
                  <MinusIcon size={16} />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center border-0 focus:ring-0"
                  min="1"
                />
                <Button
                  onClick={incrementQuantity}
                  variant="ghost"
                  size="sm"
                  className="px-3 py-2 border-l border-gray-300 hover:bg-gray-100"
                >
                  <PlusIcon size={16} />
                </Button>
              </div>

              <Button
                className="bg-primary hover:bg-primary/80 text-white px-6 flex-1"
                onClick={handleAddToCart}
                disabled={product.status !== "active"}
              >
                Thêm vào giỏ hàng
              </Button>

              <Button
                variant="outline"
                className="p-2 border border-gray-300 hover:bg-gray-100"
                onClick={handleWishlistToggle}
              >
                <Heart
                  size={20}
                  className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                />
              </Button>
            </div>

            {/* Product Metadata */}
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <span className="font-medium">Danh mục: </span>
                <span className="text-primary">{product.category}</span>
              </div>
              <div>
                <span className="font-medium">Trạng thái: </span>
                <span
                  className={
                    product.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {product.status === "active" ? "Có sẵn" : "Hết hàng"}
                </span>
              </div>
              <div>
                <span className="font-medium">Mã sản phẩm: </span>
                <span>{product._id}</span>
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
              Mô tả
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Đánh giá (1)
            </TabsTrigger>
            <TabsTrigger
              value="additional"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary  rounded-none"
            >
              Thông tin bổ sung
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="pt-6">
            <h3 className="text-xl font-medium mb-4">Mô tả sản phẩm</h3>
            <div className="prose max-w-none">
              <p>
                {product.name} được thiết kế đặc biệt để phù hợp với các dịch vụ
                tang lễ và các buổi tưởng niệm. Sản phẩm được chế tác tỉ mỉ từ
                những vật liệu chất lượng cao, mang đến sự trang nghiêm và ý
                nghĩa sâu sắc.
              </p>
              <p className="mt-4">
                {product.description || "Mô tả chi tiết sẽ được cập nhật sớm."}
              </p>
              <p className="mt-4">
                Chúng tôi cam kết cung cấp những sản phẩm chất lượng, được làm
                từ những nguyên liệu tốt nhất và được kiểm tra kỹ lưỡng trước
                khi giao đến tay khách hàng.
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
                    Tên sản phẩm
                  </th>
                  <td className="py-3">{product.name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium">Danh mục</th>
                  <td className="py-3">{product.category}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium">Giá</th>
                  <td className="py-3">{formatCurrency(product.price)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium">
                    Trạng thái
                  </th>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status === "active" ? "Có sẵn" : "Hết hàng"}
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-medium">
                    Mã sản phẩm
                  </th>
                  <td className="py-3">{product._id}</td>
                </tr>
              </tbody>
            </table>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
