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
import { Product } from "@/lib/api/product";
import { Service } from "@/lib/api/service";
import { useProducts } from "@/lib/hooks/useProducts";
import { useServiceManagement, useServices } from "@/lib/hooks/useServices";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditServiceProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedService: Service;
  setSelectedService: (service: Service) => void;
  onSave?: (serviceData: Service, isEdit: boolean) => Promise<void>;
}

const EditService: React.FC<EditServiceProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedService,
  setSelectedService,
  onSave,
}) => {
  const { createService, updateService } = useServiceManagement();
  const { refreshServices } = useServices();
  const { products, loading: productsLoading } = useProducts({
    limit: 100,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedService._id) {
      setImageFiles([]);
    }
  }, [selectedService._id]);

  const activeProducts = products.filter(
    (product) => product.status === "active"
  );

  const allProducts = products;

  const [selectedProductId, setSelectedProductId] = useState<string>("");

  useEffect(() => {
    if (isEditDialogOpen && selectedService && selectedService.inclusions) {
      const normalizedInclusions = selectedService.inclusions.map(
        (inclusion: any) => {
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

      const currentInclusionIds =
        selectedService.inclusions.map(getInclusionId);
      const needsNormalization = normalizedInclusions.some(
        (id: any, index: number) => id !== currentInclusionIds[index]
      );

      if (needsNormalization) {
        setSelectedService({
          ...selectedService,
          inclusions: normalizedInclusions,
        });
      }
    }
  }, [isEditDialogOpen, selectedService?._id]);

  // Validate the form before submission
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!selectedService.title.trim()) {
      errors.title = "Tên dịch vụ không được để trống";
    }

    if (selectedService.price <= 0) {
      errors.price = "Giá phải là số dương";
    }

    if (!selectedService.category) {
      errors.category = "Vui lòng chọn danh mục";
    }

    if (!selectedService.description.trim()) {
      errors.description = "Mô tả không được để trống";
    }

    // Require at least one image for new services
    if (!selectedService._id && imageFiles.length === 0) {
      errors.image = "Vui lòng thêm ít nhất một hình ảnh";
    }

    if (selectedService.inclusions.length === 0) {
      errors.inclusions = "Vui lòng thêm ít nhất một sản phẩm vào gói dịch vụ";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle save service (create or update) - matches product pattern
  const handleSaveService = async (serviceData: any, isEdit: boolean) => {
    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin dịch vụ");
      return false;
    }

    setIsUploading(true);

    try {
      // Ensure inclusions are normalized to string IDs
      const normalizedInclusions = serviceData.inclusions.map(
        (inclusion: any) => {
          if (
            typeof inclusion === "object" &&
            inclusion !== null &&
            "_id" in inclusion
          ) {
            return inclusion._id;
          }
          return inclusion;
        }
      );

      // Prepare the service data
      const formData = {
        ...serviceData,
        inclusions: normalizedInclusions,
        files: imageFiles,
      };

      let success = false;

      if (isEdit && selectedService?._id) {
        success = await updateService(selectedService._id, formData);
      } else {
        success = await createService(formData);
      }

      if (success) {
        setIsEditDialogOpen(false);
        setImageFiles([]);
        if (onSave) {
          await onSave(formData, isEdit);
        }
        refreshServices();
        window.location.reload(); // Reload to reflect changes
        return true;
      } else {
        toast.error(
          isEdit ? "Lỗi khi cập nhật dịch vụ" : "Lỗi khi thêm dịch vụ mới"
        );
        return false;
      }
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Đã xảy ra lỗi khi lưu dịch vụ");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  // Add product to inclusions
  const addProductInclusion = () => {
    const selectedProduct = activeProducts.find(
      (p) => p._id === selectedProductId
    );
    if (selectedProduct) {
      const currentInclusionIds = selectedService.inclusions.map(
        (inclusion: any) => {
          if (
            typeof inclusion === "object" &&
            inclusion !== null &&
            "_id" in inclusion
          ) {
            return (inclusion as any)._id;
          }
          return inclusion;
        }
      );

      if (!currentInclusionIds.includes(selectedProductId)) {
        setSelectedService({
          ...selectedService,
          inclusions: Array.isArray(selectedService.inclusions)
            ? [...selectedService.inclusions, selectedProductId]
            : [selectedProductId],
        });
        setSelectedProductId(""); // Reset selection
      }
    }
  };

  const removeProductInclusion = (productId: string) => {
    setSelectedService({
      ...selectedService,
      inclusions: selectedService.inclusions.filter((inclusion: any) => {
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

  const getProductById = (productId: string): Product | undefined => {
    return allProducts.find((p) => p._id === productId);
  };

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
    return selectedService.inclusions.some((inclusion: any) => {
      const inclusionId = getInclusionId(inclusion);
      return inclusionId === productId;
    });
  };

  // Remove a file from the file list
  const removeFile = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  // Create title based on whether editing or creating
  const dialogTitle = selectedService._id
    ? "Chỉnh sửa gói dịch vụ"
    : "Thêm gói dịch vụ mới";

  const dialogDescription = selectedService._id
    ? "Cập nhật thông tin cho gói dịch vụ này"
    : "Điền thông tin để tạo gói dịch vụ mới";

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-5xl max-h-170 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Tên gói dịch vụ <span className="text-red-500">*</span>
              </Label>
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
                className={formErrors.title ? "border-red-500" : ""}
              />
              {formErrors.title && (
                <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">
                Giá (VND) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={
                  selectedService.price === 0
                    ? "0"
                    : selectedService.price || ""
                }
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    price: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Nhập giá"
                className={formErrors.price ? "border-red-500" : ""}
              />
              {formErrors.price && (
                <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">
                Hình ảnh
                {!selectedService._id && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files || files.length === 0) return;

                  // Store file objects for upload
                  setImageFiles(Array.from(files));

                  // Create preview for the first image
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setSelectedService({
                      ...selectedService,
                      imageUrl: [event.target?.result as string], // Only for preview
                    });
                  };
                  reader.readAsDataURL(files[0]);

                  // Clear any image errors
                  if (formErrors.image) {
                    setFormErrors({
                      ...formErrors,
                      image: "",
                    });
                  }
                }}
                className={formErrors.image ? "border-red-500" : ""}
              />
              {formErrors.image && (
                <p className="text-red-500 text-sm mt-1">{formErrors.image}</p>
              )}

              {/* File upload preview */}
              {imageFiles.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Ảnh mới đã chọn:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {imageFiles.map((file, index) => (
                      <div key={`file-${index}`} className="relative group">
                        <div className="h-40 border rounded-md bg-gray-50 flex items-center justify-center p-1">
                          <Image
                            height={100}
                            width={100}
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="object-cover w-full h-full rounded-md"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Existing images */}
              {!imageFiles.length &&
                selectedService.imageUrl &&
                selectedService.imageUrl.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium mb-1">Ảnh hiện tại:</h4>
                    <div className="mt-2 max-h-48">
                      <div className="flex flex-wrap gap-2">
                        {selectedService.imageUrl.map((img, index) => (
                          <div
                            key={`img-${index}`}
                            className="relative group z-20"
                          >
                            <Image
                              src={img}
                              alt={`Service image ${index + 1}`}
                              width={100}
                              height={100}
                              className="object-cover w-40 h-full max-h-60 rounded-md border"
                              onError={(e) =>
                                ((e.target as HTMLImageElement).src =
                                  "/icons/image-off.svg")
                              }
                            />
                            <button
                              type="button"
                              onClick={() => {
                                // Remove image from the service
                                setSelectedService({
                                  ...selectedService,
                                  imageUrl: selectedService.imageUrl.filter(
                                    (_, i) => i !== index
                                  ),
                                });
                              }}
                              className="absolute z-10 -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Danh mục <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedService.category}
                onValueChange={(value: any) =>
                  setSelectedService({
                    ...selectedService,
                    category: value,
                  })
                }
              >
                <SelectTrigger
                  className={formErrors.category ? "border-red-500" : ""}
                >
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
              {formErrors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.category}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <div className="flex items-center gap-2 pt-2">
                <Switch
                  id="status"
                  checked={selectedService.status === "active"}
                  onCheckedChange={(checked: any) =>
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
            <Label htmlFor="description">
              Mô tả <span className="text-red-500">*</span>
            </Label>
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
              className={formErrors.description ? "border-red-500" : ""}
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Sản phẩm bao gồm trong gói dịch vụ{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div
              className={`border rounded-lg p-4 space-y-4 ${
                formErrors.inclusions ? "border-red-500" : ""
              }`}
            >
              {/* Display selected products */}
              {selectedService.inclusions.length > 0 ? (
                selectedService.inclusions.map((inclusion: any) => {
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
                })
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  Chưa có sản phẩm nào được chọn
                </p>
              )}
              {formErrors.inclusions && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.inclusions}
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
          <Button
            variant="outline"
            onClick={() => setIsEditDialogOpen(false)}
            disabled={isUploading}
          >
            Hủy
          </Button>
          <Button
            onClick={() =>
              handleSaveService(selectedService, !!selectedService._id)
            }
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                Đang xử lý...
              </>
            ) : selectedService._id ? (
              "Lưu thay đổi"
            ) : (
              "Tạo gói dịch vụ"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditService;
