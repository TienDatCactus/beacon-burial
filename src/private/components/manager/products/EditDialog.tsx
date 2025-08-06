"use client";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
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

import { X, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
const EditDialog: React.FC<{
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  handleSaveProduct: (productData: Product, isEdit: boolean) => void;
}> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedProduct,
  setSelectedProduct,
  handleSaveProduct,
}) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct._id ? "Chinh sửa sản phẩm" : "Thêm sản phẩm mới"}
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
                Tên sản phẩm
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
              />
            </div>

            <div>
              <Label className="mb-1" htmlFor="sku">
                Slug
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
              />
            </div>

            <div>
              <Label className="mb-1" htmlFor="price">
                Giá (VNĐ)
              </Label>
              <Input
                id="price"
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div>
              <Label className="mb-1" htmlFor="stock">
                Số lượng
              </Label>
              <Input
                id="stock"
                type="number"
                value={selectedProduct.quantity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div>
              <Label className="mb-1" htmlFor="category">
                Danh mục
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
                <SelectTrigger>
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

            {/* <div>
              <Label className="mb-1" htmlFor="popularity">
                Điểm phổ biến (0-100)
              </Label>
              <Input
                id="popularity"
                type="number"
                min="0"
                max="100"
                value={selectedProduct.popularityScore}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    popularityScore: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div> */}
          </div>

          <div className="space-y-4">
            <div>
              <Label className="mb-1" htmlFor="image">
                Hình ảnh sản phẩm
              </Label>
              <Input
                id="images"
                type="file"
                multiple // ✅ Cho phép chọn nhiều ảnh
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files) return;

                  const imageArray: string[] = [];

                  Array.from(files).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (event.target?.result) {
                        imageArray.push(event.target.result as string);
                        // Khi đọc hết tất cả ảnh thì cập nhật state
                        if (imageArray.length === files.length) {
                          setSelectedProduct({
                            ...selectedProduct,
                            image: [
                              ...(selectedProduct.image || []),
                              ...imageArray,
                            ],
                          });
                        }
                      }
                    };
                    reader.readAsDataURL(file);
                  });
                }}
                placeholder="Chọn nhiều ảnh"
              />

              {selectedProduct.image && (
                <div className="mt-2 relative  rounded-md overflow-y-scroll h-80">
                  {!!selectedProduct.image &&
                  selectedProduct.image.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 flex-wrap ">
                      {selectedProduct.image.map((img, index) => (
                        <Image
                          key={index}
                          src={img}
                          alt="Product preview"
                          height={100}
                          width={100}
                          className="object-contain w-full h-full rounded-md"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No image uploaded</p>
                  )}
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
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* <div>
              <Label className="mb-1">Các đặc điểm nổi bật</Label>
              <div className="space-y-2 mt-2">
                {selectedProduct.features.map(
                  (feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => {
                          const updatedFeatures = [...selectedProduct.features];
                          updatedFeatures[index] = e.target.value;
                          setSelectedProduct({
                            ...selectedProduct,
                            features: updatedFeatures,
                          });
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const updatedFeatures =
                            selectedProduct.features.filter(
                              (_: string, i: number) => i !== index
                            );
                          setSelectedProduct({
                            ...selectedProduct,
                            features: updatedFeatures,
                          });
                        }}
                        disabled={selectedProduct.features.length <= 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setSelectedProduct({
                      ...selectedProduct,
                      features: [...selectedProduct.features, ""],
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" /> Thêm đặc điểm
                </Button>
              </div>
            </div> */}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={() =>
              handleSaveProduct(selectedProduct, !!selectedProduct._id)
            }
          >
            {selectedProduct._id ? "Lưu thay đổi" : "Thêm sản phẩm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
