"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ServiceCardProps } from "@/private/components/services/ServiceCard";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Phone,
  Share2,
  ShoppingCart,
  Users,
  X,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock services data (same as on the services page)
const services: ServiceCardProps[] = [
  {
    title: "Hằng Sống Premium Package",
    category: "Premium",
    description:
      "Complete premium funeral service package with high-quality coffin, ceremony setup, and transportation - inspired by Catholic traditions.",
    imageUrl: "/images/image-45-840x840.jpg",
    price: 12900,
    slug: "hang-song-premium",
    inclusions: [
      {
        name: "Premium Rutherford Coffin",
        description: "Pacific cedar wood with deluxe interior",
      },
      {
        name: "Luxury Ceremony Setup",
        description: "3 tent covers with vintage lamps and luxury seating",
      },
      {
        name: "Professional Staff Service",
        description: "2 funeral staff members (8:00-20:00)",
      },
      {
        name: "Memorial Decoration",
        description: "Artistic flower arrangements and silk curtains",
      },
      {
        name: "Complete Vehicle Fleet",
        description: "Lead car, hearse, and passenger bus",
      },
      {
        name: "Ceremonial Items",
        description: "Memorial portrait, prayer cards, guest registry",
      },
      {
        name: "Mourning Clothes",
        description: "15 sets of traditional mourning attire",
      },
      {
        name: "Guest Reception",
        description: "Complete refreshments for 200 guests",
      },
    ],
    popularityScore: 85,
    isFeatured: true,
  },
  {
    title: "Ánh Sáng Special Package",
    category: "Premium",
    description:
      "Exclusive luxury funeral service package with premium offerings and personalized arrangements for large gatherings of 200-300 guests.",
    imageUrl: "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
    price: 23500,
    slug: "anh-sang-special",
    inclusions: [
      {
        name: "Luxury Imported Coffin",
        description: "Hand-crafted details with silk interior",
      },
      {
        name: "Premium Event Setup",
        description: "Crystal chandeliers and luxury furniture",
      },
      {
        name: "24-Hour Staff Service",
        description: "4 staff members with dedicated director",
      },
      {
        name: "Premium Floral Design",
        description: "Imported flowers with custom arrangements",
      },
      {
        name: "Luxury Transportation",
        description: "Mercedes hearse and premium passenger buses",
      },
      {
        name: "Professional Portraiture",
        description: "Custom prayer books and announcements",
      },
      {
        name: "Premium Mourning Attire",
        description: "25 sets with professional styling",
      },
      {
        name: "Full Catering Service",
        description: "Premium refreshments for 300 guests",
      },
    ],
    popularityScore: 72,
    isFeatured: false,
  },
  {
    title: "Hồng Ân Basic Package",
    category: "Basic",
    description:
      "Essential funeral services with all necessary arrangements for a dignified ceremony - ideal for families with around 100 guests.",
    imageUrl: "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
    price: 8700,
    slug: "hong-an-basic",
    inclusions: [
      {
        name: "Standard Quality Coffin",
        description: "Engineered wood with satin interior",
      },
      {
        name: "Basic Ceremony Setup",
        description: "2 tent covers with standard seating",
      },
      {
        name: "Staff Assistance",
        description: "1 funeral service staff (8:00-17:00)",
      },
      {
        name: "Standard Decoration",
        description: "Basic flower arrangements",
      },
      { name: "Transportation", description: "Hearse and passenger van" },
      {
        name: "Basic Ceremonial Items",
        description: "Portrait, prayer cards, notices",
      },
      { name: "Standard Mourning Clothes", description: "10 sets provided" },
      {
        name: "Guest Refreshments",
        description: "Basic refreshments for 100 guests",
      },
    ],
    popularityScore: 92,
    isFeatured: false,
  },
  {
    title: "Thiên Đàng Custom Design",
    category: "Premium",
    description:
      "Fully customized premium funeral service with exclusive options and personalized arrangements according to family wishes.",
    imageUrl: "/images/image-10.jpg",
    price: 35000,
    slug: "thien-dang-custom",
    inclusions: [
      {
        name: "Bespoke Coffin Design",
        description: "Premium materials of your choice",
      },
      {
        name: "Custom Venue Setup",
        description: "According to family preferences",
      },
      {
        name: "24/7 Professional Staff",
        description: "Full team with dedicated coordinator",
      },
      {
        name: "Custom Memorial Space",
        description: "Personalized themes and decor",
      },
      {
        name: "Premium Vehicle Fleet",
        description: "Personalized transport arrangements",
      },
      {
        name: "Professional Media Package",
        description: "Videography and memorial books",
      },
      {
        name: "Custom Mourning Attire",
        description: "For all family members with styling",
      },
      {
        name: "Premium Custom Catering",
        description: "Custom menu and memorial gifts",
      },
    ],
    popularityScore: 65,
    isFeatured: false,
  },
  {
    title: "Cremation Service Package",
    category: "Specialized",
    description:
      "Complete cremation service with ceremony and premium urn for dignified final arrangements.",
    imageUrl: "/icons/funeral-urn-svgrepo-com.svg",
    price: 6500,
    slug: "cremation-service",
    inclusions: [
      {
        name: "Professional Cremation",
        description: "Modern facility with care and dignity",
      },
      {
        name: "Premium Decorative Urn",
        description: "With personalized engraving",
      },
      {
        name: "Memorial Service Setup",
        description: "Seating for 50 guests",
      },
      {
        name: "Professional Staff",
        description: "Throughout the entire process",
      },
      {
        name: "Transportation",
        description: "To crematorium and return of remains",
      },
      {
        name: "Documentation",
        description: "All permits and certificates included",
      },
    ],
    popularityScore: 78,
    isFeatured: false,
  },
  {
    title: "Vạn Phúc Traditional Package",
    category: "Traditional",
    description:
      "Traditional funeral package with standard-sized coffin and complete ceremonial arrangements following cultural customs.",
    imageUrl: "/images/pexels-brett-sayles-3648309.jpg",
    price: 11000,
    slug: "van-phuc-traditional",
    inclusions: [
      {
        name: "Van Phuc Coffin",
        description: "Traditional design with quality materials",
      },
      {
        name: "Ancestral Customs Setup",
        description: "Proper ceremonial layout",
      },
      {
        name: "Experienced Staff",
        description: "Trained in traditional ceremonies",
      },
      {
        name: "Traditional Decoration",
        description: "Altar setup following customs",
      },
      {
        name: "Traditional Transportation",
        description: "Hearse and family transport",
      },
      {
        name: "Ceremonial Items",
        description: "All required for traditional rituals",
      },
      {
        name: "Traditional Attire",
        description: "12 sets with proper accessories",
      },
      {
        name: "Ceremonial Food Offerings",
        description: "Traditional refreshments",
      },
    ],
    popularityScore: 70,
    isFeatured: false,
  },
  {
    title: "Trường Phúc Premium",
    category: "Premium",
    description:
      "Premium funeral package with deluxe arrangements and comprehensive services for up to 200 guests.",
    imageUrl: "/images/pexels-kseniachernaya-8986709.jpg",
    price: 17500,
    slug: "truong-phuc-premium",
    inclusions: [
      {
        name: "Premium Luxury Coffin",
        description: "Premium wood with custom interior",
      },
      {
        name: "Deluxe Setup",
        description: "4 luxury tents with professional lighting",
      },
      {
        name: "Professional Staff Team",
        description: "3 staff members with 24-hour service",
      },
      {
        name: "Premium Floral Design",
        description: "Imported flowers with artistic arrangements",
      },
      {
        name: "Luxury Transportation",
        description: "Premium fleet for all needs",
      },
      {
        name: "Custom Ceremonial Items",
        description: "Complete premium set",
      },
      {
        name: "Premium Mourning Attire",
        description: "20 sets with styling",
      },
      { name: "Premium Catering", description: "Custom menu for 200 guests" },
    ],
    popularityScore: 82,
    isFeatured: true,
  },
];

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

// Format price function
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

const ServiceDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<ServiceCardProps | null>(null);
  const [relatedServices, setRelatedServices] = useState<ServiceCardProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Order dialog state
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    notes: "",
  });

  // Handle order form input change
  const handleOrderFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle order submit
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order data to your API
    console.log("Order submitted:", { service: service?.title, ...orderForm });

    // Close order dialog and open success dialog
    setIsOrderDialogOpen(false);
    setIsSuccessDialogOpen(true);

    // Reset form
    setOrderForm({
      name: "",
      phone: "",
      email: "",
      date: "",
      notes: "",
    });
  };

  useEffect(() => {
    // Find the service based on the slug
    const slug = params.slug as string;
    const foundService = services.find((s) => s.slug === slug);

    if (foundService) {
      setService(foundService);

      // Find related services (same category but not the same service)
      const related = services
        .filter(
          (s) =>
            s.category === foundService.category && s.slug !== foundService.slug
        )
        .slice(0, 3);
      setRelatedServices(related);
    }

    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Đang tải thông tin dịch vụ...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-gray-50 min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-center mb-6">
            Không tìm thấy dịch vụ
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Xin lỗi, dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <div className="flex justify-center">
            <Link href="/services">
              <Button variant="default">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Quay lại trang dịch vụ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section with Image */}
      <div className="relative w-full h-[40vh] lg:h-[50vh]">
        <Image
          src={service.imageUrl}
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
              className={`px-3 py-1 font-medium ${getCategoryStyle(
                service.category
              )}`}
              variant="outline"
            >
              {service.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2">
              {service.title}
            </h1>
            <p className="text-white/90 mt-2 max-w-2xl">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              {/* Service Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Tổng quan về dịch vụ
                </h2>
                <p className="text-gray-700">{service.description}</p>

                {/* Popularity indicator */}
                {service.popularityScore && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Độ phổ biến</span>
                      </span>
                      <span>{service.popularityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${service.popularityScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Gói dịch vụ này đã được{" "}
                      {service.popularityScore > 80
                        ? "rất nhiều"
                        : service.popularityScore > 60
                        ? "nhiều"
                        : "một số"}{" "}
                      gia đình lựa chọn trong thời gian qua.
                    </p>
                  </div>
                )}
              </div>

              {/* Service Inclusions */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Dịch vụ bao gồm</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {service.inclusions?.map((inclusion, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="mt-1 bg-primary/10 rounded-full w-fit h-fit p-1 shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">
                          {inclusion.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {inclusion.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Process */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Quy trình dịch vụ
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="font-medium text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Tư vấn và lựa chọn dịch vụ
                      </h3>
                      <p className="text-gray-500">
                        Đội ngũ tư vấn viên của chúng tôi sẽ hỗ trợ bạn lựa chọn
                        gói dịch vụ phù hợp và có thể tùy chỉnh theo nhu cầu.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="font-medium text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Lập kế hoạch chi tiết
                      </h3>
                      <p className="text-gray-500">
                        Nhân viên điều phối sẽ làm việc với bạn để lập kế hoạch
                        chi tiết cho buổi lễ và các dịch vụ đi kèm.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="font-medium text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Triển khai và thực hiện
                      </h3>
                      <p className="text-gray-500">
                        Đội ngũ chuyên nghiệp của chúng tôi sẽ thực hiện tất cả
                        các khâu chuẩn bị và tổ chức theo kế hoạch đã thống
                        nhất.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="font-medium text-primary">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Hỗ trợ và theo dõi
                      </h3>
                      <p className="text-gray-500">
                        Chúng tôi cam kết hỗ trợ liên tục và đảm bảo mọi yêu cầu
                        đều được đáp ứng đúng như thỏa thuận.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Câu hỏi thường gặp
                </h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Thời gian chuẩn bị cho dịch vụ này là bao lâu?
                    </h3>
                    <p className="text-gray-500">
                      Thông thường chúng tôi cần từ 24-48 giờ để chuẩn bị đầy đủ
                      cho gói dịch vụ {service.title}. Tuy nhiên, trong trường
                      hợp khẩn cấp, chúng tôi có thể đẩy nhanh tiến độ và sẵn
                      sàng trong thời gian ngắn hơn.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Có thể tùy chỉnh các hạng mục trong gói dịch vụ không?
                    </h3>
                    <p className="text-gray-500">
                      Vâng, chúng tôi hiểu rằng mỗi gia đình có nhu cầu khác
                      nhau. Bạn có thể trao đổi với đội ngũ tư vấn để điều chỉnh
                      các hạng mục trong gói dịch vụ phù hợp với nguyện vọng và
                      ngân sách.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Có thể thanh toán dịch vụ theo đợt được không?
                    </h3>
                    <p className="text-gray-500">
                      Chúng tôi có nhiều phương thức thanh toán linh hoạt và có
                      thể thảo luận về việc thanh toán theo đợt. Vui lòng liên
                      hệ với bộ phận tư vấn để biết thêm chi tiết về các lựa
                      chọn thanh toán.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
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
                  {service.price ? formatPrice(service.price) : "Liên hệ"}
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
                            src={relService.imageUrl}
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
                              ? formatPrice(relService.price)
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
        </div>
      </div>

      {/* Order Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Đặt dịch vụ</DialogTitle>
            <DialogDescription>
              Vui lòng điền thông tin dưới đây để đặt dịch vụ {service.title}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  value={orderForm.name}
                  onChange={handleOrderFormChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="0912 345 678"
                  value={orderForm.phone}
                  onChange={handleOrderFormChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={orderForm.email}
                  onChange={handleOrderFormChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Ngày sử dụng dịch vụ</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={orderForm.date}
                  onChange={handleOrderFormChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú thêm (nếu có)</Label>
                <Input
                  id="notes"
                  name="notes"
                  placeholder="Các yêu cầu đặc biệt hoặc thông tin bổ sung"
                  value={orderForm.notes}
                  onChange={handleOrderFormChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOrderDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit">Xác nhận đặt dịch vụ</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center mb-2">
              Đặt dịch vụ thành công!
            </DialogTitle>
            <DialogDescription className="text-center mb-6">
              Cảm ơn bạn đã sử dụng dịch vụ của Beacon Burial. Chúng tôi sẽ liên
              hệ với bạn trong thời gian sớm nhất để xác nhận chi tiết.
            </DialogDescription>
            <Button onClick={() => setIsSuccessDialogOpen(false)}>
              Đã hiểu
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDetailPage;
