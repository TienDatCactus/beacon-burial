"use client";

import ServiceContactBanner from "@/private/components/services/ServiceContactBanner";
import ServiceEmpty from "@/private/components/services/ServiceEmpty";
import ServiceFeatured from "@/private/components/services/ServiceFeature";
import ServiceFilter from "@/private/components/services/ServiceFilter";
import ServiceHero from "@/private/components/services/ServiceHero";
import ServiceIntro from "@/private/components/services/ServiceIntro";
import ServiceSideGuide from "@/private/components/services/ServiceSideGuide";
import ServiceTestimonial from "@/private/components/services/ServiceTestimonial";
import PathCrumbs from "@/shared/components/layouts/path-crumbs";
import { useServices, useServiceCategories } from "@/lib/hooks/useServices";
import { useProducts } from "@/lib/hooks/useProducts";
import { Service } from "@/lib/api/service";
import { Product } from "@/lib/api/product";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import ServiceCard from "@/private/components/services/ServiceCard";

const ServicesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // API hooks
  const {
    services: apiServices,
    loading,
    error,
    pagination,
    searchByKeyword,
    filterByCategory,
    goToPage,
  } = useServices({ page: 1, limit: 9 });

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (apiServices && apiServices.length > 0) {
        searchByKeyword(query);
      }
    },
    [apiServices, searchByKeyword]
  );

  const handleCategoryFilter = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
      if (apiServices && apiServices.length > 0) {
        filterByCategory(category);
      }
    },
    [apiServices, filterByCategory]
  );

  // Get service categories

  // Show error toast if API fails
  useEffect(() => {
    if (error) {
      toast.error("Không thể tải danh sách dịch vụ. Hiển thị dữ liệu mẫu.");
    }
  }, [error]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ServiceHero />
      <div className="container mx-auto px-4 py-12">
        <PathCrumbs />
        <ServiceIntro />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Đang tải dịch vụ...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  Không thể kết nối đến máy chủ. Đang hiển thị dữ liệu mẫu.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8" id="service-packages">
            {/* Category Filters + Search */}
            <ServiceFilter
              filteredServices={apiServices}
              serviceCategories={["Phật giáo", "Công giáo", "Hồi giáo"]}
              searchQuery={searchQuery}
              setSearchQuery={handleSearch}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategoryFilter}
            />

            {/* Empty State */}
            {apiServices.length === 0 && !loading && (
              <ServiceEmpty
                setSearchQuery={setSearchQuery}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {/* Services Grid */}
            {apiServices.length > 0 && !loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apiServices.map((service, index) => (
                  <ServiceCard key={service.slug || index} {...service} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {apiServices &&
              apiServices.length > 0 &&
              pagination.totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-8">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pagination.currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
          </div>

          <div className="lg:col-span-1 space-y-8">
            <ServiceFeatured
              services={apiServices.filter((s) => s.isFeatured)}
            />
            <ServiceSideGuide services={apiServices} />
          </div>
        </div>

        <ServiceContactBanner />
        <ServiceTestimonial />
      </div>
    </div>
  );
};

export default ServicesPage;
