import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/api/product";
import { formatCurrency } from "@/lib/utils";
import { Edit, Info, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProductPagination from "./ProductPagination";

interface ListViewProps {
  filteredProducts: Product[];
  toggleStatus: (id: string, status: string) => void;
  viewProductDetails: (product: Product) => void;
  editProduct: (product: Product) => void;
  confirmDeleteProduct: (product: Product) => void;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  goToPage: (page: number) => void;
}

const ListView: React.FC<ListViewProps> = ({
  filteredProducts,
  toggleStatus,
  viewProductDetails,
  editProduct,
  confirmDeleteProduct,
  pagination,
  goToPage,
}) => {
  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Hình ảnh</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Mã sản phẩm</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden relative">
                    {product.image && product.image[0] ? (
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                        No image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product._id || "-"}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`status-${product._id}`}
                      checked={product.status === "active"}
                      onCheckedChange={() =>
                        toggleStatus(
                          product._id,
                          product.status === "active" ? "inactive" : "active"
                        )
                      }
                      aria-label={`Toggle ${product.name} status`}
                    />
                    <Badge
                      variant={
                        product.status === "active" ? "default" : "secondary"
                      }
                      className={
                        product.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }
                    >
                      {product.status === "active"
                        ? "Đang hoạt động"
                        : "Ngừng hoạt động"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open menu"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => viewProductDetails(product)}
                        className="cursor-pointer"
                      >
                        <Info className="mr-2 h-4 w-4" /> Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => editProduct(product)}
                        className="cursor-pointer"
                      >
                        <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          Trang {pagination.currentPage} trên {pagination.totalPages}
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

export default ListView;
