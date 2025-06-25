import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
const Footer: React.FC = () => {
  const footerItems = [
    {
      item: "Cơ sở",
      emphasis: "+84 232123123",
      link: "https://example.com",
      children: ["Địa chỉ: 123 Đường ABC, Quận XYZ"],
    },
    {
      item: "Liên kết",
      children: [
        "Trang chủ",
        "Dịch vụ",
        "Giới thiệu",
        "Tính năng nổi bật / Lợi ích",
        "Liên hệ",
      ],
    },
    {
      item: "Mạng xã hội",
      children: ["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"],
    },
  ];
  return (
    <footer className="bg-black text-white">
      <div className=" container mx-auto p-8 ">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
          {footerItems.map((footerItem, index) => (
            <li key={index} className="space-y-4">
              <h1 className="text-lg font-bold">{footerItem.item}</h1>
              <ul className="font-secondary space-y-4 text-sm text-neutral-300">
                {footerItem.children.map((child, childIndex) => (
                  <li key={childIndex}>
                    <Link
                      href="#"
                      className="transition-all duration-300 hover:underline hover:text-primary font-secondary"
                    >
                      {child}
                    </Link>
                  </li>
                ))}
              </ul>
              {footerItem?.link && (
                <Link
                  href={footerItem.link}
                  className="transition-all duration-300 hover:underline hover:text-primary font-secondary  block"
                >
                  {footerItem.link}
                </Link>
              )}
              {footerItem.emphasis && (
                <p className="font-secondary font-bold text-base">
                  {footerItem.emphasis}
                </p>
              )}
            </li>
          ))}
          <li className="space-y-2">
            <h1 className="text-lg font-bold">Đăng ký nhận tin</h1>
            <div className="flex w-full max-w-sm items-center gap-2 *:font-secondary">
              <div className="flex items-center  w-full bg-neutral-800 px-2 rounded-md">
                <MailIcon className="size-5 text-white" />
                <Input
                  className="border-none *:text-white "
                  type="email"
                  placeholder="Email"
                />
              </div>
              <Button type="submit">Đăng ký</Button>
            </div>
            <div className="flex items-center gap-3 *:font-secondary">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Chấp nhận điều khoản và điều kiện</Label>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
