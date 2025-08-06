import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formatCurrency } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface GridViewProps {
  filteredProducts: any[];
  toggleStatus: (id: string, status: "active" | "inactive") => void;
}
const GridView: React.FC<GridViewProps> = ({
  filteredProducts,
  toggleStatus,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          className="border rounded-md overflow-hidden bg-white shadow-sm hover:shadow transition-shadow"
        >
          <div className="h-48 w-full overflow-hidden relative">
            <Image
              src={product.image[0] || "https://placehold.co/600x400"}
              alt={product.name}
              className="h-full w-full object-cover"
              fill
            />
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
              <span className="text-sm text-gray-500">{product.sku}</span>
              <span className="font-semibold">
                {formatCurrency(product.price)}
              </span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  id={`grid-status-${product.id}`}
                  checked={product.status === "active"}
                  onCheckedChange={(checked) =>
                    toggleStatus(product.id, checked ? "active" : "inactive")
                  }
                  aria-label={`Toggle ${product.name} status`}
                />
                <Label
                  htmlFor={`grid-status-${product.id}`}
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
