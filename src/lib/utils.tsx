import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { StarIcon } from "lucide-react";

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

export const formatPrice = (
  price: number | { min: number; max: number }
): string => {
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }
  return `$${price.min.toFixed(2)} - $${price.max.toFixed(2)}`;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
