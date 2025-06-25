"use client";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface MenuItem {
  label: string;
  href: string;
}

const Header: React.FC = () => {
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
    return (
      <li
        key={item.label}
        className={`relative group ${isSubMenu ? "block" : ""}`}
      >
        <Link href={item.href}>
          <Button
            variant={"link"}
            className="text-white cursor-pointer tracking-wide hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {item.label}
          </Button>
        </Link>
      </li>
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
                  src="/icons/logo-white-retina.webp"
                  alt="Beacon"
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
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between p-4">
            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/logo-white.png"
                alt="Beacon"
                width={147}
                height={89}
                className="h-12 w-auto"
                priority
              />
            </Link>

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
