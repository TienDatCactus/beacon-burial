import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ServiceCardProps } from "./ServiceCard";
import { formatCurrency } from "@/lib/utils";
interface ServiceFeaturedProps {
  services: ServiceCardProps[];
}
const ServiceFeatured: React.FC<ServiceFeaturedProps> = ({ services }) => {
  return (
    <div className="bg-white border border-amber-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-amber-50 border-b border-amber-200 py-3 px-4">
        <h2 className="text-lg  text-primary">Sản phẩm nổi bật</h2>
      </div>
      <div className="p-6 space-y-4">
        {services
          .filter((s) => s.isFeatured)
          .map((featured, idx) => (
            <div key={idx} className="space-y-4">
              <div className="aspect-video relative rounded-md overflow-hidden">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold">{featured.title}</h3>
                  <p className="text-white/80 text-sm">
                    Gói {featured.category}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{featured.description}</p>
              <div className="flex justify-between items-center">
                {featured.price && (
                  <div className="text-lg font-semibold text-primary">
                    {formatCurrency(featured.price)}
                  </div>
                )}
                <Link href={`/services/${featured.slug}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-300 text-primary hover:bg-amber-50"
                  >
                    Tìm hiểu thêm
                  </Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServiceFeatured;
