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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/lib/api/product";
import { useProductManagement, useProducts } from "@/lib/hooks/useProducts";
import { toast } from "sonner";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const EditDialog: React.FC<{
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
}> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedProduct,
  setSelectedProduct,
}) => {
  const { updateProduct, createProduct } = useProductManagement();
  const { refreshProducts } = useProducts({ limit: 9 });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (selectedProduct._id) {
      setImageFiles([]);
    }
  }, []);
  // Validate the form before submission
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!selectedProduct.name.trim()) {
      errors.name = "Tên sản phẩm không được để trống";
    }

    if (!selectedProduct.slug.trim()) {
      errors.slug = "Slug không được để trống";
    }

    // Price can be 0, but must be a number and not negative
    if (selectedProduct.price === undefined || isNaN(selectedProduct.price)) {
      errors.price = "Giá phải là một số";
    } else if (selectedProduct.price <= 0) {
      errors.price = "Giá phải là số dương";
    }

    if (
      selectedProduct.quantity === undefined ||
      isNaN(selectedProduct.quantity)
    ) {
      errors.quantity = "Số lượng phải là một số";
    } else if (selectedProduct.quantity <= 0) {
      errors.quantity = "Số lượng phải là số dương";
    }

    if (!selectedProduct.category) {
      errors.category = "Vui lòng chọn danh mục";
    }

    // Require at least one image for new products
    if (!selectedProduct._id && imageFiles.length === 0) {
      errors.image = "Vui lòng thêm ít nhất một hình ảnh sản phẩm";
    }

    if (!selectedProduct.description.trim()) {
      errors.description = "Mô tả sản phẩm không được để trống";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle save product (create or update)
  const handleSaveProduct = async (productData: any, isEdit: boolean) => {
    if (!validateForm()) {
      toast.error("Vui lòng điền đầy đủ thông tin sản phẩm");
      return false;
    }

    setIsUploading(true);
    try {
      const formData = { ...productData, files: imageFiles };

      let success = false;
      if (isEdit && selectedProduct?._id) {
        success = await updateProduct(selectedProduct._id, formData);
      } else {
        success = await createProduct(formData);
      }

      if (success) {
        setIsEditDialogOpen(false);
        setImageFiles([]);
        refreshProducts();
        window.location.reload();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Đã xảy ra lỗi khi lưu sản phẩm");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  // Remove an image from the preview
  const removeImage = (index: number) => {
    setSelectedProduct({
      ...selectedProduct,
      image: selectedProduct.image?.filter((_, i) => i !== index),
    });
  };

  // Remove a file from the file list
  const removeFile = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct._id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
          <DialogDescription>
            {selectedProduct._id
              ? "Cập nhật thông tin sản phẩm bên dưới."
              : "Điền thông tin sản phẩm để tạo sản phẩm mới."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-1">
                Tên sản phẩm <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w\-]+/g, ""),
                  })
                }
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <Label className="mb-1" htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                value={selectedProduct.slug}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    slug: e.target.value,
                  })
                }
                className={formErrors.slug ? "border-red-500" : ""}
              />
              {formErrors.slug && (
                <p className="text-red-500 text-sm mt-1">{formErrors.slug}</p>
              )}
            </div>

            <div>
              <Label className="mb-1" htmlFor="price">
                Giá (VNĐ) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={
                  selectedProduct.price === 0
                    ? "0"
                    : selectedProduct.price || ""
                }
                placeholder="Nhập giá sản phẩm"
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className={formErrors.price ? "border-red-500" : ""}
              />
              {formErrors.price && (
                <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
              )}
            </div>

            <div>
              <Label className="mb-1" htmlFor="stock">
                Số lượng <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                value={
                  selectedProduct.quantity === 0
                    ? "0"
                    : selectedProduct.quantity || ""
                }
                placeholder="Nhập số lượng"
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: parseInt(e.target.value),
                  })
                }
                className={formErrors.quantity ? "border-red-500" : ""}
              />
              {formErrors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.quantity}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-1" htmlFor="category">
                Danh mục <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedProduct.category}
                onValueChange={(value) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: value,
                  })
                }
              >
                <SelectTrigger
                  className={formErrors.category ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Quan tài an táng">
                    Quan tài an táng
                  </SelectItem>
                  <SelectItem value="Quan tài hỏa táng">
                    Quan tài hỏa táng
                  </SelectItem>
                  <SelectItem value="Tiểu quách">Tiểu quách</SelectItem>
                  <SelectItem value="Hũ tro cốt">Hũ tro cốt</SelectItem>
                  <SelectItem value="Áo quan">Áo quan</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.category}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-1" htmlFor="status">
                Trạng thái
              </Label>
              <Select
                value={selectedProduct.status}
                onValueChange={(value) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    status: value === "active" ? "active" : "inactive",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="featured"
                checked={selectedProduct.isFeatured}
                onCheckedChange={(checked) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    isFeatured: checked,
                  })
                }
              />
              <Label htmlFor="featured">Sản phẩm nổi bật</Label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="mb-1" htmlFor="image">
                Hình ảnh sản phẩm{" "}
                {!selectedProduct._id && (
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
                  setImageFiles(Array.from(files));
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
              {selectedProduct.image && selectedProduct.image.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium mb-1">Ảnh hiện tại:</h4>
                  <div className="mt-2 max-h-48">
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProduct.image.map((img, index) => (
                        <div
                          key={`img-${index}`}
                          className="relative group z-20"
                        >
                          <Image
                            src={img}
                            alt={`Product image ${index + 1}`}
                            width={100}
                            height={100}
                            className="object-cover w-full h-24 rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
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

            <div>
              <Label htmlFor="description" className="mb-1">
                Mô tả
              </Label>
              <Textarea
                id="description"
                rows={4}
                className={formErrors.description ? "border-red-500" : ""}
                value={selectedProduct.description || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
              />
              {formErrors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.description}
                </p>
              )}
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
              handleSaveProduct(selectedProduct, !!selectedProduct._id)
            }
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                Đang xử lý...
              </>
            ) : selectedProduct._id ? (
              "Lưu thay đổi"
            ) : (
              "Thêm sản phẩm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
