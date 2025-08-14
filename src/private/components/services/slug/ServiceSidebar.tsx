import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/api/service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  ChevronRight,
  Clock,
  Heart,
  Phone,
  Share2,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ServiceCardProps } from "../ServiceCard";
import { formatCurrency } from "@/lib/utils/formatting";
const ServiceSidebar: React.FC<{
  service: Service;
  setIsOrderDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  relatedServices: Service[];
}> = ({ service, setIsOrderDialogOpen, relatedServices }) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Price Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Giá dịch vụ</h3>
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            {service.isFeatured ? "Nổi bật" : service.category}
          </Badge>
        </div>

        <div className="mb-4">
          <span className="text-3xl font-bold text-primary">
            {service.price ? formatCurrency(service.price) : "Liên hệ"}
          </span>
        </div>

        <Button className="w-full mb-3">
          <Phone className="mr-2 h-4 w-4" />
          Liên hệ tư vấn
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsOrderDialogOpen(true)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Đặt dịch vụ
        </Button>

        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between text-gray-500">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Heart className="mr-2 h-4 w-4" />
            <span className="text-sm">Lưu</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-500">
            <Share2 className="mr-2 h-4 w-4" />
            <span className="text-sm">Chia sẻ</span>
          </Button>
        </div>
      </div>

      {/* Contact Support Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Hỗ trợ 24/7</h3>
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage
              src="/undraw_pic-profile_nr49.svg"
              alt="Support Avatar"
            />
            <AvatarFallback>BC</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Đội ngũ tư vấn viên</p>
            <p className="text-sm text-gray-500">Luôn sẵn sàng hỗ trợ</p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span>+84 (28) 3930 7374</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span>Phục vụ 24/7, cả ngày lễ</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>Đặt lịch tư vấn miễn phí</span>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Đặt lịch tư vấn
        </Button>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Dịch vụ liên quan</h3>
          <div className="space-y-4">
            {relatedServices.map((relService, idx) => (
              <Link href={`/services/${relService.slug}`} key={idx}>
                <div className="flex items-start hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors">
                  <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={relService.imageUrl[0] || "/icons/image-off.svg"}
                      alt={relService.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-sm line-clamp-2">
                      {relService.title}
                    </h4>
                    <p className="text-primary text-sm mt-1">
                      {relService.price
                        ? formatCurrency(relService.price)
                        : "Liên hệ"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            <Link href="/services">
              <Button variant="link" className="p-0 h-auto text-primary">
                Xem tất cả dịch vụ
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSidebar;
