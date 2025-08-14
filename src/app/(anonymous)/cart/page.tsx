"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCartStore } from "@/lib/stores/useCartStore";
import { formatCurrency } from "@/lib/utils/formatting";
import CartBreadcrumps from "@/shared/components/breadcrums/CartBreadcrumps";
import {
  MinusIcon,
  MoveLeft,
  PlusIcon,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const CartPage: React.FC = () => {
  const { items, removeItem, clearCart, updateQuantity, subtotal, totalPrice } =
    useCartStore();
  // const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const applyCoupon = () => {
    if (couponCode.trim() !== "" && couponCode.trim() == "LETANGFPT") {
      setCouponApplied(true);
    }
  };

  const discount = couponApplied ? (subtotal || 0) * 0.1 : 0; // 10% discount when coupon applied
  const tax = subtotal || 0 > 0 ? 15.0 : 0;

  // if (isLoading) {
  //   return (
  //     <div className="container h-screen mx-auto px-4 py-16 flex items-center justify-center">
  //       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  //       <span className="ml-4 text-gray-600">Đang tải...</span>
  //     </div>
  //   );
  // }
  return (
    <div className=" py-12 mx-auto bg-gray-50">
      <div className="container mx-auto px-10">
        <CartBreadcrumps />
        {items.length > 0 ? (
          <div className="spayce-y-8">
            <Table>
              <TableHeader className="">
                <TableRow className="*:font-semibold *:text-base ">
                  <TableHead>Sản phẩm</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Giá tiền ( đơn vị )</TableHead>
                  <TableHead>Giá tiền ( tổng )</TableHead>
                  <TableHead className="text-right">Xóa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="w-20 h-20 flex-shrink-0 relative mr-4">
                          <Image
                            src={
                              item.product.image[0] || "/icons/image-off.svg"
                            }
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.product.price)}</TableCell>
                    <TableCell className="">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={"secondary"}
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon size={14} />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          className="w-12 text-center"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.product._id,
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                        <Button
                          variant={"secondary"}
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={14} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatCurrency(item.product.price * item.quantity)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={"destructive"}
                        onClick={() => removeItem(item.product._id)}
                        aria-label="Remove item"
                      >
                        <X size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start ">
              <div className="flex flex-wrap justify-between items-center p-6 border-t">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <Button>
                    <Link
                      href="/shop"
                      className="flex items-center gap-2 text-white"
                    >
                      <MoveLeft />
                      <span>Quay lại</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-gray-600 border border-gray-300 hover:bg-gray-100"
                  >
                    <Trash2 size={16} /> <span>Clear Cart</span>
                  </Button>
                </div>

                <Button
                  className="bg-primary hover:bg-primary/50 text-white"
                  onClick={() => {
                    // We don't need to call updateCart here since cart state is already managed internally
                    // by the useCartStore and updated automatically when items change
                  }}
                >
                  Cập nhật Giỏ hàng
                </Button>
              </div>

              <div>
                <div className="border border-gray-300 p-6">
                  <h2 className="text-2xl font-semibold mb-6 ">
                    Hóa đơn tạm tính
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-4 border-b border-gray-200">
                      <span>Tổng cộng</span>
                      <span>{formatCurrency(subtotal || 0)}</span>
                    </div>

                    {/* <div className="pb-4 border-b border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span>Mã giảm giá</span>
                        <span>
                          {couponApplied
                            ? `-$${formatCurrency(discount)}`
                            : "$0.00"}
                        </span>
                      </div>

                      <div className="flex items-center mt-2">
                        <Input
                          type="text"
                          placeholder="Mã giảm giá"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          disabled={couponApplied}
                          className="flex-grow p-2 border border-gray-300 focus:outline-none focus:border-amber-500"
                        />
                        <Button
                          onClick={applyCoupon}
                          disabled={couponApplied}
                          className={`ml-2 ${
                            couponApplied
                              ? "bg-gray-300 text-gray-700"
                              : "bg-primary hover:bg-primary/50 text-white"
                          }`}
                        >
                          Apply
                        </Button>
                      </div>
                      {couponApplied ? (
                        <p className="text-green-600 text-sm mt-2">
                          Mã giảm giá đã được áp dụng!
                        </p>
                      ) : (
                        <p className="text-neutral-500 text-sm mt-2">
                          Mã giảm giá hiện không khả dụng
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between pb-4 border-b border-gray-200">
                      <span>Thuế</span>
                      <span>{formatCurrency(tax)}</span>
                    </div> */}

                    <div className="flex justify-between font-bold text-lg">
                      <span>Tổng cộng</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>
                  <Link href={"/checkout"}>
                    <Button className="w-full bg-primary hover:bg-primary/50 text-white py-3 text-base">
                      Tiến hành thanh toán
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 ">
            <div className="mb-6">
              <ShoppingCart size={64} className="mx-auto text-gray-400" />
            </div>
            <h2 className="text-2xl mb-4">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-8">
              Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.
            </p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/50 text-white">
                Quay lại cửa hàng
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
