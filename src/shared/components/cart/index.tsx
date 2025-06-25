import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/lib/stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
const CartPreview: React.FC = () => {
  const { items, totalItems, subtotal } = useCartStore();
  return (
    <div className="relative h-10 w-10">
      <Badge
        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute bottom-6 left-6 "
        variant="default"
      >
        {totalItems}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"icon"}
            className="bg-white hover:bg-primary/50 text-black hover:*:text-white"
          >
            <ShoppingCart size={10} className="text-gray-600 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end">
          <DropdownMenuLabel>Giỏ hàng</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="max-h-64 overflow-y-auto">
            {items.length > 0 ? (
              <div className="flex flex-col space-y-2">
                {items.map((item) => (
                  <div
                    key={item.product._id}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-center justify-between"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={60}
                      height={50}
                      className="rounded-md col-span-1 object-cover"
                    />
                    <div className="lg:col-span-2 ">
                      <p>{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {item.product.price}₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span>Giỏ hàng trống</span>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex justify-between w-full ">
              <span className="text-sm text-gray-500">Ước tính:</span>
              <span>{formatCurrency(subtotal || 0)}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="">
            <div className="flex justify-end gap-2 w-full">
              <Button>
                <Link href={"/cart"}>Giỏ hàng</Link>
              </Button>
              <Button disabled={totalItems == 0}>
                <Link href={"/checkout"}>Thanh toán</Link>
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CartPreview;
