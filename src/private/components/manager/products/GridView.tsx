import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/lib/api/product";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProductPagination from "./ProductPagination";
import { formatCurrency } from "@/lib/utils/formatting";

interface GridViewProps {
  filteredProducts: Product[];
  toggleStatus: (id: string, status: string) => void;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  goToPage: (page: number) => void;
}

const GridView: React.FC<GridViewProps> = ({
  filteredProducts,
  toggleStatus,
  pagination,
  goToPage,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-md overflow-hidden bg-white shadow-sm hover:shadow transition-shadow"
          >
            <div className="h-48 w-full overflow-hidden relative">
              {product.image && product.image[0] ? (
                <Image
                  src={product.image[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
              <Badge
                variant={product.status === "active" ? "default" : "secondary"}
                className={`absolute top-2 right-2 ${
                  product.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {product.status === "active"
                  ? "Đang hoạt động"
                  : "Ngừng hoạt động"}
              </Badge>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-medium">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {product._id || "-"}
                </span>
                <span className="font-semibold">
                  {formatCurrency(product.price)}
                </span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`grid-status-${product._id}`}
                    checked={product.status === "active"}
                    onCheckedChange={() =>
                      toggleStatus(
                        product._id,
                        product.status === "active" ? "inactive" : "active"
                      )
                    }
                    aria-label={`Toggle ${product.name} status`}
                  />
                  <Label
                    htmlFor={`grid-status-${product._id}`}
                    className="text-sm"
                  >
                    {product.status === "active"
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"}
                  </Label>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          Trang {pagination.currentPage} / {pagination.totalPages}
        </div>
        <ProductPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

export default GridView;
