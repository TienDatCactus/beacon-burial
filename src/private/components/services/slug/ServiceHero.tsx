import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/api/service";
import { getCategoryStyle } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
const ServiceHero: React.FC<{ service: Service; router: any }> = ({
  service,
  router,
}) => {
  return (
    <div className="relative w-full h-[40vh] lg:h-[50vh]">
      <Image
        src={service.imageUrl[0] || "/icons/image-off.svg"}
        alt={service.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/80 hover:bg-white"
          onClick={() => router.back()}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          <span>Quay lại</span>
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="max-w-5xl mx-auto">
          <Badge
            variant="outline"
            className={`px-3 py-1 font-medium ${getCategoryStyle(
              service.category
            )}`}
          >
            {service.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
            {service.title}
          </h1>
          <p className="text-white/90 mt-2 max-w-2xl">{service.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
