import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit, PackageX, PackageCheck } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProductFeatureItem from "./ProductFeatureItem";
import { Product } from "@/lib/api/product";
const DetailsDialog: React.FC<{
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  selectedProduct: Product;
  editProduct: (product: any) => void;
  toggleStatus: (id: string, status: "active" | "inactive") => void;
}> = ({
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedProduct,
  editProduct,
  toggleStatus,
}) => {
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="max-w-3xl  h-170 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết sản phẩm</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết cho sản phẩm này.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="relative aspect-square rounded-md overflow-hidden bg-gray-100 mb-4">
              {!!selectedProduct.image &&
                selectedProduct.image.length > 0 &&
                selectedProduct.image.map((img, index) => (
                  <Image
                    key={index}
                    src={img || "https://placehold.co/600x400"}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                ))}
              <div className="absolute top-2 right-2">
                <Badge
                  className={
                    selectedProduct.status === "active"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-amber-100 text-amber-800 border-amber-200"
                  }
                >
                  {selectedProduct.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Danh mục</h3>
                <p>{selectedProduct.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Slug</h3>
                <p>{selectedProduct.slug}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Số lượng</h3>
                <p>Còn {selectedProduct.quantity} sản phẩm</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-medium text-primary">
                  ${selectedProduct.price}
                </span>
                {selectedProduct.isFeatured && (
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    Nổi bật
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Mô tả</h3>
              <p className="text-gray-700">{selectedProduct.description}</p>
            </div>

            {/* {selectedProduct.features &&
              selectedProduct.features.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Các đặc điểm nổi bật
                  </h3>
                  <div className="space-y-1 mt-2">
                    {selectedProduct.features.map(
                      (feature: string, index: number) => (
                        <ProductFeatureItem key={index} feature={feature} />
                      )
                    )}
                  </div>
                </div>
              )}
            {selectedProduct.popularityScore && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Điểm phổ biến
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${selectedProduct.popularityScore}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm">
                    {selectedProduct.popularityScore}%
                  </span>
                </div>
              </div>
            )} */}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => {
              setIsViewDialogOpen(false);
              editProduct(selectedProduct);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
          <Button
            variant={
              selectedProduct.status === "active" ? "destructive" : "default"
            }
            onClick={() => {
              toggleStatus(
                selectedProduct._id,
                selectedProduct.status === "active" ? "inactive" : "active"
              );
            }}
          >
            {selectedProduct.status === "active" ? (
              <>
                <PackageX className="h-4 w-4 mr-2" />
                Hủy kích hoạt
              </>
            ) : (
              <>
                <PackageCheck className="h-4 w-4 mr-2" />
                Kích hoạt
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
