"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  ShoppingCart,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Product } from "@/lib/interfaces";
import CartPreview from "../cart";

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const NoneHomeHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      label: "Trang chủ",
      href: "#",
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
    return (
      <li
        key={item.label}
        className={`relative group ${isSubMenu ? "block" : ""}`}
      >
        <Link href={item.href}>
          <Button
            variant={"link"}
            className="text-black font-medium cursor-pointer tracking-wide hover:text-primary focus:outline-none"
          >
            {item.label}
          </Button>
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-black text-white py-2">
        <div className="container mx-auto px-4 lg:px-10 flex flex-wrap justify-between items-center *:font-secondary">
          <div className="flex items-center space-x-8 text-sm">
            <div className="flex items-center">
              <Clock size={14} className="mr-2" />
              <span>Mon - Fri 8:00 - 18:00 / Sunday 8:00 - 14:00</span>
            </div>
            <div className="hidden md:flex items-center">
              <Phone size={14} className="mr-2" />
              <span>1-800-458-56987</span>
            </div>
            <div className="hidden lg:flex items-center">
              <MapPin size={14} className="mr-2" />
              <span>
                Khu Công nghệ cao Hòa Lạc, Km29 Đại lộ Thăng Long, huyện Thạch
                Thất, Hà Nội
              </span>
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
                  src="/icons/logo-black-retina.webp"
                  alt="Beacon"
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
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-primary/50 text-black hover:*:text-white rounded-full ">
                  <Avatar>
                    <AvatarImage src="/images/undraw_pic-profile_nr49.svg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                  <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between p-4">
            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/icons/logo-white-retina.webp"
                alt="Beacon"
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
