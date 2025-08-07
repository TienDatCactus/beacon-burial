"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Service } from "@/lib/api/service";
import { Product } from "@/lib/api/product";
import { useProducts } from "@/lib/hooks/useProducts";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
interface EditServiceProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedService: Service;
  setSelectedService: (service: Service) => void;
  onSave: (serviceData: Service, isEdit: boolean) => Promise<void>;
}
const EditService: React.FC<EditServiceProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedService,
  setSelectedService,
  onSave,
}) => {
  // Get active products for inclusions
  const { products, loading: productsLoading } = useProducts({
    limit: 100, // Get more products for selection
  });

  // Filter only active products for new selections
  const activeProducts = products.filter(
    (product) => product.status === "active"
  );

  // All products (including inactive) for displaying existing inclusions
  const allProducts = products;

  // Local state for product selection
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  // Normalize inclusions when component opens to ensure consistency
  useEffect(() => {
    if (isEditDialogOpen && selectedService && selectedService.inclusions) {
      console.log(
        "EditService - Original inclusions:",
        selectedService.inclusions
      );

      // Convert mixed inclusions (objects/strings) to just product ID strings
      const normalizedInclusions = selectedService.inclusions.map(
        (inclusion) => {
          if (
            typeof inclusion === "object" &&
            inclusion !== null &&
            "_id" in inclusion
          ) {
            return (inclusion as any)._id;
          }
          return inclusion as string;
        }
      );

      console.log("EditService - Normalized inclusions:", normalizedInclusions);
      console.log(
        "EditService - Active products available:",
        activeProducts.length
      );

      // Only update if the inclusions are different (to avoid infinite loop)
      const currentInclusionIds =
        selectedService.inclusions.map(getInclusionId);
      const needsNormalization = normalizedInclusions.some(
        (id, index) => id !== currentInclusionIds[index]
      );

      if (needsNormalization) {
        console.log(
          "EditService - Updating service with normalized inclusions"
        );
        setSelectedService({
          ...selectedService,
          inclusions: normalizedInclusions,
        });
      }
    }
  }, [isEditDialogOpen, selectedService?._id]); // Only run when dialog opens or service changes

  // Add product to inclusions
  const addProductInclusion = () => {
    const selectedProduct = activeProducts.find(
      (p) => p._id === selectedProductId
    );
    if (selectedProduct) {
      // Get current inclusion IDs (handle both string IDs and objects)
      const currentInclusionIds = selectedService.inclusions.map(
        (inclusion) => {
          if (
            typeof inclusion === "object" &&
            inclusion !== null &&
            "_id" in inclusion
          ) {
            return (inclusion as any)._id;
          }
          return inclusion as string;
        }
      );

      if (!currentInclusionIds.includes(selectedProductId)) {
        setSelectedService({
          ...selectedService,
          inclusions: [...selectedService.inclusions, selectedProductId],
        });
        setSelectedProductId(""); // Reset selection
      }
    }
  };

  // Remove product from inclusions
  const removeProductInclusion = (productId: string) => {
    setSelectedService({
      ...selectedService,
      inclusions: selectedService.inclusions.filter((inclusion) => {
        // Handle both string IDs and objects
        if (
          typeof inclusion === "object" &&
          inclusion !== null &&
          "_id" in inclusion
        ) {
          return (inclusion as any)._id !== productId;
        }
        return inclusion !== productId;
      }),
    });
  };

  // Get product details by ID - handle both string IDs and objects in inclusions
  // Search in all products (including inactive) to show existing inclusions
  const getProductById = (productId: string): Product | undefined => {
    return allProducts.find((p) => p._id === productId);
  };

  // Helper function to get product ID from inclusion (string or object)
  const getInclusionId = (inclusion: any): string => {
    if (
      typeof inclusion === "object" &&
      inclusion !== null &&
      "_id" in inclusion
    ) {
      return inclusion._id;
    }
    return inclusion as string;
  };

  // Helper function to check if product is already included
  const isProductIncluded = (productId: string): boolean => {
    return selectedService.inclusions.some((inclusion) => {
      const inclusionId = getInclusionId(inclusion);
      return inclusionId === productId;
    });
  };
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-5xl max-h-170 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật gói dịch vụ</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cho gói dịch vụ này
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên gói dịch vụ</Label>
              <Input
                id="name"
                value={selectedService.title}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    title: e.target.value,
                  })
                }
                placeholder="Nhập tên gói dịch vụ"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Giá (VND)</Label>
              <Input
                id="price"
                type="number"
                value={selectedService.price}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    price: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Nhập giá"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Hình ảnh</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setSelectedService({
                        ...selectedService,
                        imageUrl: [event.target?.result as string],
                      });
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                placeholder="Nhập đường dẫn hình ảnh"
              />
              {selectedService.imageUrl && (
                <div className="mt-2 border rounded-md p-2 bg-gray-50 ">
                  <p className="text-xs text-gray-500 mb-1">
                    Hình ảnh xem trước:
                  </p>
                  <div className="aspect-video w-full max-h-60  bg-gray-100 rounded overflow-hidden">
                    <Image
                      width={800}
                      height={450}
                      src={selectedService.imageUrl[0] || ""}
                      alt="Preview"
                      className="w-full h-full object-contain max-h-60"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "/icons/image-off.svg")
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="popularity">Điểm phổ biến (0-100)</Label>
              <Input
                id="popularity"
                type="number"
                min="0"
                max="100"
                value={selectedService.popularityScore || 0}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    popularityScore: Math.min(
                      100,
                      Math.max(0, parseInt(e.target.value) || 0)
                    ),
                  })
                }
                placeholder="Nhập điểm phổ biến (0-100)"
              />
              <div className="mt-1 flex items-center">
                <Progress value={selectedService.popularityScore || 0} />
                <span className="ml-2 text-sm">
                  {selectedService.popularityScore || 0}%
                </span>
              </div>
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Danh mục</Label>
              <Select
                value={selectedService.category}
                onValueChange={(value) =>
                  setSelectedService({
                    ...selectedService,
                    category: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phật giáo">
                    Mai táng theo Phật giáo
                  </SelectItem>
                  <SelectItem value="Công giáo">
                    Mai táng theo Công giáo
                  </SelectItem>
                  <SelectItem value="Hồi giáo">
                    Mai táng theo Đạo giáo
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <div className="flex items-center gap-2 pt-2">
                <Switch
                  id="status"
                  checked={selectedService.status === "active"}
                  onCheckedChange={(checked) =>
                    setSelectedService({
                      ...selectedService,
                      status: checked ? "active" : "inactive",
                    })
                  }
                />
                <Label
                  htmlFor="status"
                  className={
                    selectedService.status === "active"
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {selectedService.status === "active"
                    ? "Hoạt động"
                    : "Ngừng hoạt động"}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={selectedService.description}
              onChange={(e) =>
                setSelectedService({
                  ...selectedService,
                  description: e.target.value,
                })
              }
              placeholder="Nhập mô tả gói dịch vụ"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Sản phẩm bao gồm trong gói dịch vụ</Label>
            <div className="border rounded-lg p-4 space-y-4">
              {/* Display selected products */}
              {selectedService.inclusions.length > 0 ? (
                selectedService.inclusions.map(
                  (inclusion: any, index: number) => {
                    const productId = getInclusionId(inclusion);
                    const product = getProductById(productId);
                    if (!product) return null;

                    return (
                      <div
                        key={productId}
                        className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden bg-gray-200">
                            <Image
                              src={product.image?.[0] || "/icons/image-off.svg"}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              onError={(e) =>
                                ((e.target as HTMLImageElement).src =
                                  "/icons/image-off.svg")
                              }
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              {product.name}
                              {product.status === "inactive" && (
                                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                  Ngừng hoạt động
                                </span>
                              )}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {product.category}
                            </p>
                            <p className="text-xs font-semibold text-green-600">
                              {product.price.toLocaleString("vi-VN")} VND
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeProductInclusion(productId)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  }
                )
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  Chưa có sản phẩm nào được chọn
                </p>
              )}

              {/* Add new product form */}
              <div className="border-t pt-4">
                <Label htmlFor="product-select">Thêm sản phẩm</Label>
                <div className="flex gap-2 mt-2">
                  <Select
                    value={selectedProductId}
                    onValueChange={setSelectedProductId}
                    disabled={productsLoading}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue
                        placeholder={
                          productsLoading
                            ? "Đang tải sản phẩm..."
                            : "Chọn sản phẩm để thêm vào gói"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {activeProducts
                        .filter((product) => !isProductIncluded(product._id))
                        .map((product) => (
                          <SelectItem key={product._id} value={product._id}>
                            <div className="flex items-center gap-2">
                              <span>{product.name}</span>
                              <span className="text-xs text-gray-500">
                                ({product.price.toLocaleString("vi-VN")} VND)
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={addProductInclusion}
                    disabled={!selectedProductId || productsLoading}
                    className="bg-primary/10 hover:bg-primary/20 text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {activeProducts.filter((p) => !isProductIncluded(p._id))
                  .length === 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Tất cả sản phẩm đang hoạt động đã được thêm vào gói hoặc
                    không có sản phẩm nào khả dụng.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={() => onSave(selectedService, !!selectedService._id)}
            disabled={
              !selectedService.title ||
              selectedService.price <= 0 ||
              selectedService.inclusions.length === 0
            }
          >
            {selectedService._id ? "Lưu" : "Tạo gói"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditService;
