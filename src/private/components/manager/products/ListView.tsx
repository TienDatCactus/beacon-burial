import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Edit,
  Trash2,
  Info,
  PackageCheck,
  PackageX,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ListViewProps {
  filteredProducts: any[];
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  toggleStatus: (id: string, status: "active" | "inactive") => void;
  viewProductDetails: (product: any) => void;
  editProduct: (product: any) => void;
  confirmDeleteProduct: (product: any) => void;
}
const ListView: React.FC<ListViewProps> = ({
  filteredProducts,
  sortField,
  sortDirection,
  handleSort,
  toggleStatus,
  viewProductDetails,
  editProduct,
  confirmDeleteProduct,
}) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Hình ảnh</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Tên sản phẩm
                {sortField === "name" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
            <TableHead>Mã sản phẩm</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center">
                Giá
                {sortField === "price" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-2 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" />
                  ))}
              </div>
            </TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden relative">
                  <Image
                    width={48}
                    height={48}
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`status-${product.id}`}
                    checked={product.status === "active"}
                    onCheckedChange={(checked) =>
                      toggleStatus(product.id, checked ? "active" : "inactive")
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
                    <Button variant="ghost" size="icon" aria-label="Open menu">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => viewProductDetails(product)}
                      className="cursor-pointer"
                    >
                      <Info className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => editProduct(product)}
                      className="cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit Product
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        toggleStatus(
                          product.id,
                          product.status === "active" ? "inactive" : "active"
                        )
                      }
                      className="cursor-pointer"
                    >
                      {product.status === "active" ? (
                        <>
                          <PackageX className="mr-2 h-4 w-4" /> Deactivate
                        </>
                      ) : (
                        <>
                          <PackageCheck className="mr-2 h-4 w-4" /> Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => confirmDeleteProduct(product)}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListView;
