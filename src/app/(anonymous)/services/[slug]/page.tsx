"use client";
import { Button } from "@/components/ui/button";
import { serviceCheckout, ServiceCheckoutData } from "@/lib/api/order";
import { Product } from "@/lib/api/product";
import { Service } from "@/lib/api/service";
import { useProducts } from "@/lib/hooks/useProducts";
import { useServices } from "@/lib/hooks/useServices";
import { useCartStore } from "@/lib/stores/useCartStore";
import { ServiceCardProps } from "@/private/components/services/ServiceCard";
import OrderDialog from "@/private/components/services/slug/OrderDialog";
import ServiceHero from "@/private/components/services/slug/ServiceHero";
import ServiceSidebar from "@/private/components/services/slug/ServiceSidebar";
import SuccessDialog from "@/private/components/services/slug/SuccessDialog";
import PathCrumbs from "@/shared/components/layouts/path-crumbs";
import { Check, ChevronLeft, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const ServiceDetailPage = () => {
  const slug = useParams().slug as string;
  const router = useRouter();
  const params = useParams();

  // API hooks
  const { services: apiServices, loading: servicesLoading } = useServices({
    limit: 50,
  });

  const { products } = useProducts({ limit: 100 });
  const { addItem } = useCartStore();

  // Local state
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Order dialog state
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState<
    Omit<ServiceCheckoutData, "serviceId">
  >({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    province: "",
    phone: "",
    email: "",
    date: "",
    note: "",
  });
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Handle order form input change
  const handleOrderFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle order submit
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) {
      toast.error("Không tìm thấy thông tin dịch vụ");
      return;
    }

    setIsSubmittingOrder(true);

    try {
      // Find the actual service from API to get the real _id
      const apiService = apiServices?.find((s) => s.slug === service.slug);
      const serviceId = apiService?._id || `service-${service.slug}`;

      const checkoutData: ServiceCheckoutData = {
        ...orderForm,
        serviceId,
      };

      console.log("Submitting service order:", checkoutData);

      const result = await serviceCheckout(checkoutData);

      console.log("Order success:", result);

      setIsOrderDialogOpen(false);
      setIsSuccessDialogOpen(true);

      toast.success(
        "Đặt dịch vụ thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
      );

      // Reset form
      setOrderForm({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        province: "",
        phone: "",
        email: "",
        date: "",
        note: "",
      });
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(
        error instanceof Error
          ? `Lỗi đặt dịch vụ: ${error.message}`
          : "Có lỗi xảy ra khi đặt dịch vụ. Vui lòng thử lại."
      );
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  useEffect(() => {
    const foundService = apiServices.find((s) => s.slug === slug);

    if (foundService) {
      setService(foundService);

      const related = apiServices
        .filter(
          (s) =>
            s.category === foundService.category && s.slug !== foundService.slug
        )
        .slice(0, 3);
      setRelatedServices(related);
    }

    setIsLoading(false);
  }, [apiServices, slug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PathCrumbs />
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
      <ServiceHero
        router={router}
        service={{
          ...service,
          _id: `service-${service.slug}`,
          imageUrl: [service.imageUrl[0] || "/icons/image-off.svg"],
          status: "active" as const,
          inclusions: service.inclusions.map(
            (inc: any) => `inclusion-${inc.name}`
          ),
          isFeatured: service.isFeatured || false,
        }}
      />

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
                {/* {service.popularityScore && (
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
                )} */}
              </div>

              {/* Service Inclusions */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Dịch vụ bao gồm</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {service.inclusions?.map((inclusion: any, idx: number) => (
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
          <ServiceSidebar
            service={service}
            setIsOrderDialogOpen={setIsOrderDialogOpen}
            relatedServices={relatedServices}
          />
        </div>
      </div>

      {/* Order Dialog */}
      <OrderDialog
        isOrderDialogOpen={isOrderDialogOpen}
        setIsOrderDialogOpen={setIsOrderDialogOpen}
        service={service}
        orderForm={orderForm}
        setOrderForm={setOrderForm}
        handleOrderFormChange={handleOrderFormChange}
        handleOrderSubmit={handleOrderSubmit}
        isSubmittingOrder={isSubmittingOrder}
      />
      {/* Success Dialog */}
      <SuccessDialog
        isSuccessDialogOpen={isSuccessDialogOpen}
        setIsSuccessDialogOpen={setIsSuccessDialogOpen}
      />
    </div>
  );
};

export default ServiceDetailPage;
