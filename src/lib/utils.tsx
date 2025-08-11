import { Badge } from "@/components/ui/badge";
import { clsx, type ClassValue } from "clsx";
import { StarIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <StarIcon
      key={index}
      size={16}
      className={`${
        index < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
      }`}
    />
  ));
};

export const getCategoryStyle = (category: string) => {
  switch (category) {
    case "Premium":
      return "bg-amber-100 text-primary border-amber-200";
    case "Traditional":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Basic":
      return "bg-green-100 text-green-800 border-green-200";
    case "Specialized":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "Accept":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Chấp thuận
        </Badge>
      );
    case "Waiting":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          Đang xử lý
        </Badge>
      );

    case "Deny":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          Từ chối
        </Badge>
      );

    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Vietnamese provinces/cities data
export const vietnameseProvinces = [
  "Cao Bằng",
  "Điện Biên",
  "Hà Giang",
  "Lai Châu",
  "Sơn La",
  "Lạng Sơn",
  "Quảng Ninh",
  "Thanh Hóa",
  "Nghệ An",
  "Hà Tĩnh",
  "Quảng Bình",
  "Quảng Trị",
  "Thừa Thiên–Huế", // nhưng Huế là municipality, để ý tách rõ
  "Bình Định",
  "Phú Yên",
  "Khánh Hòa",
  "Ninh Thuận",
  "Bình Thuận",
  "Quảng Nam",
  "Quảng Ngãi",
  "Kon Tum",
  "Gia Lai",
  "Đắk Lắk",
  "Đắk Nông",
  "Lâm Đồng",
  "An Giang",
  "Vĩnh Long",
  "Đồng Tháp",
  "Cà Mau",
  "Bến Tre",
  "Kiên Giang",
  "Sóc Trăng",
  "Hậu Giang",
  "Trà Vinh",
  "Long An",
  "Tiền Giang",
  "Bình Dương",
  "Đồng Nai",
  "Bà Rịa–Vũng Tàu",
  "Bình Phước",
  "Tây Ninh",
  "Bạc Liêu",
  "Cao Bằng", // trùng nếu có
  "Tuyên Quang",
  "Yên Bái",
  "Thái Nguyên",
  "Phú Thọ",
  "Hòa Bình",
  "Hưng Yên",
  "Bắc Ninh",
  "Ninh Bình",
  "Nam Định",
  "Thái Bình",
];

export const majorCities = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Huế",
];
