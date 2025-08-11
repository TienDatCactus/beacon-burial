import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Service } from "@/lib/api/service";
import { formatCurrency } from "@/lib/utils/formatting";
import { Users, ChevronRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ServiceInclusion {
  name: string;
  description: string;
}

export interface ServiceCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  slug: string;
  inclusions: ServiceInclusion[];
  popularityScore?: number;
  isFeatured?: boolean;
}

const ServiceCard: React.FC<Service> = (service) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    title,
    category,
    description,
    imageUrl,
    price,
    slug,
    inclusions,
    isFeatured,
  } = service;
  // Format price function

  // Helper to get category style
  const getCategoryStyle = (category: string) => {
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

  return (
    <div
      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col ${
        isFeatured ? "ring-2 ring-primary/40 ring-offset-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl[0] || "/icons/image-off.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <Badge
            className={`px-3 py-1 font-medium ${getCategoryStyle(category)}`}
            variant="outline"
          >
            {category}
          </Badge>
        </div>

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4">
            <Badge className="px-3 py-1 bg-primary text-white font-medium border-amber-600">
              Nổi bật
            </Badge>
          </div>
        )}

        {/* Price tag */}
        {price && (
          <div className="absolute bottom-4 right-4 bg-white px-4 py-2 font-medium rounded-md shadow-md">
            {formatCurrency(price)}
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Inclusions preview */}
        {inclusions.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
              Gói bao gồm:
            </h4>
            <ul className="space-y-1">
              {inclusions.slice(0, 3).map((inclusion: any, idx: number) => (
                <li
                  key={idx}
                  className="text-xs text-gray-600 flex items-start"
                >
                  <Check className="h-3.5 w-3.5 text-primary mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{inclusion.name}</span>
                </li>
              ))}
              {inclusions.length > 3 && (
                <li className="text-xs text-primary italic pl-5">
                  + bao gồm {inclusions.length - 3} tiện ích khác
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Call to action */}
        <div className="flex justify-between items-center">
          <Link href={`/services/${slug}`} className="w-full">
            <Button
              variant="outline"
              className="w-full  hover:text-white transition-colors group"
              aria-label={`View details about ${title}`}
            >
              <span>Xem chi tiết</span>
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
