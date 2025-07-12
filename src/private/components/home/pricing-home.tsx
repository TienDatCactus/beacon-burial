import React from "react";
import { formatCurrency } from "@/lib/utils/formatting";

const PricingSection: React.FC = () => {
  const funeralServices = [
    {
      title: "Rải tro cốt",
      price: 950,
      description:
        "Rải tro là một nghi lễ đặc biệt để tưởng niệm người đã khuất.",
    },
    {
      title: "Lễ tang tại nghĩa trang",
      price: 1395,
      description: "Mục sư chủ trì toàn bộ buổi lễ và cầu nguyện.",
    },
    {
      title: "Hỏa táng trực tiếp không nghi lễ",
      price: 1150,
      description: "Hỏa táng không có nghi lễ, không có người tham dự.",
    },
    {
      title: "Lễ tang truyền thống và hỏa táng",
      price: 4500,
      description: "Bao gồm nghi thức tang lễ truyền thống và hỏa táng.",
    },
    {
      title: "Hỏa táng kèm lễ tưởng niệm",
      price: 2555,
      description: "Gia đình cầu nguyện bên bình tro tại nghĩa trang.",
    },
    {
      title: "Dịch vụ an táng hạng VIP",
      price: 3000,
      description: "An táng với lễ tưởng niệm trang trọng cho người thân yêu.",
    },
  ];

  return (
    <section
      className="
    max-w-[125rem] mx-auto  p-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    >
      <div className="container mx-auto">
        <div className="text-center mb-10 space-y-4">
          <legend>Chi phí</legend>
          <h2 className="text-5xl font-bold mb-4">
            Các Gói Dịch Vụ Tang Lễ Tiêu Biểu
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
          {funeralServices.map((service, index) => (
            <div key={index} className="px-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <div className="flex-1 border-t border-dotted border-gray-300 mx-2"></div>
                <p className="text-xl text-gray-600 font-bold mb-4">
                  {formatCurrency(service.price, "USD")}
                </p>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
