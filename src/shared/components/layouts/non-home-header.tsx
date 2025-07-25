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
import useAuth from "@/lib/stores/useAuthStores";
import { Facebook, Instagram, MapPin, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import CartPreview from "../cart";

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const NoneHomeHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
      icon: <Facebook size={16} />,
    },
    {
      title: "twitter",
      href: "https://twitter.com/ThemerexThemes",
      icon: <Twitter size={16} />,
    },
    {
      title: "instagram",
      href: "https://www.instagram.com/themerex_net/",
      icon: <Instagram size={16} />,
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
            className={`font-medium cursor-pointer tracking-wide focus:outline-none
              ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-black hover:text-primary"
              }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></span>
            )}
          </Button>
        </Link>
      </li>
    );
  };
  const { logout, isAuthenticated } = useAuth();
  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-black text-white py-2">
        <div className="container mx-auto px-4 lg:px-10 flex flex-wrap justify-between items-center *:font-secondary">
          <div className="flex items-center space-x-8 text-sm">
            <div className="hidden md:flex items-center">
              <Phone size={14} className="mr-2" />
              <span>0363347769</span>
            </div>
            <div className="hidden lg:flex items-center">
              <MapPin size={14} className="mr-2" />
              <span>466 Âu Cơ, Quận Tây Hồ, Thành phố Hà Nội</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.title}
                href={social.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-white hover:text-amber-400 transition-colors duration-200"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <header className="bg-white text-black shadow-sm">
        <div className="hidden lg:block">
          <div className="container mx-auto px-10 flex items-center justify-between py-4">
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image
                  src="/icons/logo.png"
                  alt="Thiên An Lạc"
                  width={200}
                  height={100}
                  className=" w-25 h-auto"
                  priority
                />
              </Link>
            </div>

            <nav className="flex-1 flex justify-center">
              <ul className="flex space-x-4">
                {menuItems.map((item) => renderMenuItem(item))}
              </ul>
            </nav>

            <div className="flex items-center space-x-6">
              <CartPreview />
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:bg-primary/50 text-black hover:*:text-white rounded-full ">
                    <Avatar>
                      <AvatarImage src="/images/undraw_pic-profile_nr49.svg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="*:hover:bg-primary/20"
                  >
                    <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="link" className="p-0">
                  <Link href="/auth">Đăng nhập</Link>
                </Button>
              )}
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
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-black hover:text-amber-600 focus:outline-none"
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
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <ul className="space-y-2">
                  {menuItems.map((item) => renderMenuItem(item, true))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link href="/book-online">
                    <Button className="w-full text-white"></Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default NoneHomeHeader;
