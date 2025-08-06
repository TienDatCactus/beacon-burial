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

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
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
