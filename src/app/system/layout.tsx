"use client";
import "@/app/globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import useAuth from "@/lib/stores/useAuthStores";
import {
  Bell,
  HandPlatter,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Package,
  ShoppingCart,
  X,
} from "lucide-react";
import { Merriweather } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  return (
    <html lang="en">
      <body className={`${merriweather.className} antialiased bg-gray-50`}>
        <div className="flex h-screen overflow-hidden">
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="shadow-sm"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>

          <div
            className={`bg-white shadow-md flex-shrink-0 z-40 
                      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                      lg:translate-x-0 lg:w-64 w-[280px] fixed lg:relative 
                      h-full transition-transform duration-300 ease-in-out`}
          >
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-primary">
                Quản lý Hệ thống
              </h1>
            </div>

            {/* Navigation */}
            <nav className="mt-8 px-4 ">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/system/manager"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    <span>Thống kê</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/system/manager/products"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <Package className="mr-3 h-5 w-5" />
                    <span>Sản phẩm</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/system/manager/services"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <HandPlatter className="mr-3 h-5 w-5" />
                    <span>Gói dịch vụ</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/system/manager/orders"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <ShoppingCart className="mr-3 h-5 w-5" />
                    <span>Đơn hàng</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/system/manager/news"
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <Newspaper className="mr-3 h-5 w-5" />
                    <span>Tin tức</span>
                  </Link>
                </li>
              </ul>

              <div className="mt-10 pt-6 border-t">
                <Link href={"/"}>
                  <Button
                    variant="link"
                    className="flex w-full justify-start items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 mb-4"
                  >
                    <Home className="mr-3 h-5 w-5" />
                    <span>Về trang chủ</span>
                  </Button>
                </Link>
                <Button
                  variant="link"
                  onClick={logout}
                  className="flex w-full justify-start items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 "
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Đăng xuất</span>
                </Button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-30">
              <div className="px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Bảng điều khiển</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Badge
                      variant={"default"}
                      className="absolute top-0 left-0 translate-x-1/2 -translate-y-1/2 text-xs rounded-full"
                    >
                      12
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Bell />
                    </Button>
                  </div>
                  <Avatar>
                    <AvatarImage src="/path/to/image.jpg" alt="User Avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="p-6">{children}</main>
          </div>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
