"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AuthState } from "@/lib/interfaces/auth";
import useAuth from "@/lib/stores/useAuthStores";
import {
  Facebook,
  Instagram,
  LogOut,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface MenuItem {
  label: string;
  href: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Auth state
  const { user, isAuthenticated, logout } = useAuth(
    (state: AuthState) => state
  );

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Đăng xuất thành công");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi đăng xuất");
    }
  };

  // Generate user initials for avatar fallback
  const getUserInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };
  const menuItems: MenuItem[] = [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "Danh sách sản phẩm",
      href: "/shop",
    },
    {
      label: "Danh sách dịch vụ",
      href: "/services",
    },
    {
      label: "Tin tức",
      href: "/news",
    },

    {
      label: "Liên hệ",
      href: "/contact-us",
    },
  ];

  const socialLinks = [
    {
      title: "facebook",
      href: "https://business.facebook.com/ThemeRexStudio/",
      icon: <Facebook />,
    },
    {
      title: "instagram",
      href: "https://www.instagram.com/themerex_net/",
      icon: <Instagram />,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderMenuItem = (item: MenuItem, isSubMenu: boolean = false) => {
    // Check if this menu item matches current path
    const isActive =
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

    return (
      <li
        key={item.label}
        className={`relative group ${isSubMenu ? "block" : ""}`}
      >
        <Link href={item.href}>
          <Button
            variant={"link"}
            className={`cursor-pointer tracking-wide focus:outline-none focus:ring-2 focus:ring-white
              ${
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "text-white hover:text-gray-300"
              }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400"></span>
            )}
          </Button>
        </Link>
      </li>
    );
  };

  // User Avatar Component
  const UserAvatar = () => {
    if (!isAuthenticated || !user) {
      return (
        <Link href="/auth">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Đăng nhập
          </Button>
        </Link>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0 hover:ring-2 hover:ring-white hover:ring-opacity-20"
          >
            <Avatar className="h-10 w-10 border-2 border-white/20">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                  user.name || user.email
                )}&backgroundColor=3b82f6&textColor=ffffff`}
                alt={user.name || user.email}
              />
              <AvatarFallback className="bg-blue-600 text-white font-semibold">
                {getUserInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>
            {/* Online indicator */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-black"></span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.name || "Người dùng"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
              {user.role && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 mt-1">
                  {user.role === "admin"
                    ? "Quản trị viên"
                    : user.role === "manager"
                    ? "Quản lý"
                    : user.role === "staff"
                    ? "Nhân viên"
                    : "Khách hàng"}
                </span>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/cart" className="flex items-center cursor-pointer">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Giỏ hàng</span>
            </Link>
          </DropdownMenuItem>
          {(user.role === "admin" || user.role === "manager") && (
            <DropdownMenuItem asChild>
              <Link
                href="/system/manager"
                className="flex items-center cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Quản lý hệ thống</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Cài đặt</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <TooltipProvider>
      <header className="bg-black text-white">
        <div className="hidden lg:block">
          <div className="container mx-auto px-10 flex items-center justify-between py-4">
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image
                  src="/icons/logo.png"
                  alt="Thiên An Lạc"
                  width={1000}
                  height={1000}
                  className=" w-25 h-auto"
                  priority
                />
              </Link>
            </div>

            <nav className="flex-1 flex justify-center">
              <ul className="flex space-x-2">
                {menuItems.map((item) => renderMenuItem(item))}
              </ul>
            </nav>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors duration-200 *:size-5"
                >
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger>{social.icon}</TooltipTrigger>
                    <TooltipContent className="bg-neutral-600 text-sm rounded-sm text-white">
                      {social.title}
                    </TooltipContent>
                  </Tooltip>
                </Link>
              ))}

              {/* User Avatar or Login Button */}
              <UserAvatar />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between p-4">
            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/icons/logo.png"
                alt="Thiên An Lạc"
                width={147}
                height={89}
                className="h-12 w-auto"
                priority
              />
            </Link>

            <div className="flex items-center space-x-2">
              {/* User Avatar or Login Button */}
              <UserAvatar />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <ul className="space-y-2">
                  {menuItems.map((item) => renderMenuItem(item, true))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    </TooltipProvider>
  );
};

export default Header;
