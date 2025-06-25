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
import { Product } from "@/lib/interfaces";
import { formatCurrency } from "@/lib/utils";
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
import React, { useEffect, useState } from "react";
interface CartItem extends Product {
  quantity: number;
}

const CartPage: React.FC = () => {
  // Always define hooks at the top level before any conditional logic
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCartItems([
        {
          _id: "1",
          name: "Modern Arrangement",
          slug: "modern-arrangement",
          price: 156.0,
          image:
            "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
          rating: 5,
          quantity: 1,
        },
        {
          _id: "3",
          name: "Rose and Freesia Bouquet",
          slug: "rose-and-freesia-bouquet",
          price: 135.0,
          image: "/images/image-45-840x840.jpg",
          rating: 5,
          quantity: 2,
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.trim() !== "" && couponCode.trim() == "LETANGFPT") {
      setCouponApplied(true);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = couponApplied ? subtotal * 0.1 : 0; // 10% discount when coupon applied
  const tax = subtotal > 0 ? 15.0 : 0;
  const total = subtotal - discount + tax;

  if (isLoading) {
    return (
      <div className="container h-screen mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-600">Đang tải...</span>
      </div>
    );
  }
  return (
    <div className=" py-12 mx-auto bg-gray-50">
      <div className="container mx-auto px-10">
        <CartBreadcrumps />
        {cartItems.length > 0 ? (
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
                {cartItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="w-20 h-20 flex-shrink-0 relative mr-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell className="">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={"secondary"}
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
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
                              item._id,
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                        <Button
                          variant={"secondary"}
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          <PlusIcon size={14} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatCurrency(item.price * item.quantity)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant={"destructive"}
                        onClick={() => removeItem(item._id)}
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
                    // In a real app, this would update cart items
                    alert("Cart updated");
                  }}
                >
                  Cập nhật Giỏ hàng
                </Button>
              </div>

              <div>
                <div className="border border-gray-300 p-6">
                  <h2 className="text-xl font-serif mb-6">Cart Totals</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-4 border-b border-gray-200">
                      <span>Tổng cộng</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>

                    <div className="pb-4 border-b border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span>Mã giảm giá</span>
                        <span>
                          {couponApplied ? `-$${discount.toFixed(2)}` : "$0.00"}
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
                    </div>

                    <div className="flex justify-between font-bold text-lg">
                      <span>Tổng cộng</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/50 text-white py-3 text-base">
                    Proceed to Checkout
                  </Button>
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
