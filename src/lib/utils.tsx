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
export const majorCities = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Huế",
];

const cityDistrictMap: Record<string, string[]> = {
  "Hà Nội": [
    // 12 quận nội thành
    "Ba Đình",
    "Hoàn Kiếm",
    "Đống Đa",
    "Hai Bà Trưng",
    "Cầu Giấy",
    "Thanh Xuân",
    "Hoàng Mai",
    "Long Biên",
    "Tây Hồ",
    "Hà Đông",
    "Bắc Từ Liêm",
    "Nam Từ Liêm",
    // 17 huyện ngoại thành
    "Thanh Trì",
    "Ba Vì",
    "Đan Phượng",
    "Đông Anh",
    "Gia Lâm",
    "Hoài Đức",
    "Mê Linh",
    "Mỹ Đức",
    "Phú Xuyên",
    "Phúc Thọ",
    "Quốc Oai",
    "Sóc Sơn",
    "Thạch Thất",
    "Thanh Oai",
    "Thường Tín",
    "Ứng Hòa",
    "Sơn Tây",
  ],
  "Hồ Chí Minh": [
    "Quận 1",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Phú Nhuận",
    "Bình Thạnh",
    "Gò Vấp",
    "Tân Bình",
    "Bình Tân",
    "Tân Phú", // 16 quận
    "Thành phố Thủ Đức", // 1 thành phố cấp quận
    "Bình Chánh",
    "Hóc Môn",
    "Củ Chi",
    "Cần Giờ",
    "Nhà Bè", // 5 huyện
  ],
  "Đà Nẵng": [
    "Hải Châu",
    "Thanh Khê",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Liên Chiểu",
    "Cẩm Lệ",
  ],
  "Hải Phòng": [
    "Hồng Bàng",
    "Ngô Quyền",
    "Lê Chân",
    "Kiến An",
    "Hải An",
    "Dương Kinh",
    "Đồ Sơn",
    "An Dương",
  ],
  "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt"],
  Huế: ["Phú Xuân", "Thuận Hóa"],
};

export function getDistrictsByCity(city: string) {
  return cityDistrictMap[city] || [];
}
