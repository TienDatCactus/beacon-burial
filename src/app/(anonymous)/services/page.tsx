"use client";

import ServiceCard, {
  ServiceCardProps,
} from "@/private/components/services/ServiceCard";
import ServiceContactBanner from "@/private/components/services/ServiceContactBanner";
import ServiceEmpty from "@/private/components/services/ServiceEmpty";
import ServiceFeatured from "@/private/components/services/ServiceFeature";
import ServiceFilter from "@/private/components/services/ServiceFilter";
import ServiceHero from "@/private/components/services/ServiceHero";
import ServiceIntro from "@/private/components/services/ServiceIntro";
import ServiceSideGuide from "@/private/components/services/ServiceSideGuide";
import ServiceTestimonial from "@/private/components/services/ServiceTestimonial";
import PathCrumbs from "@/shared/components/layouts/path-crumbs";
import React, { useState } from "react";

const ServicesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
      imageUrl:
        "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
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
      imageUrl:
        "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
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

  const serviceCategories = Array.from(
    new Set(services.map((service) => service.category))
  );

  const filteredServices = services.filter(
    (service) =>
      (selectedCategory === null || service.category === selectedCategory) &&
      (service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <ServiceHero />
      <div className="container mx-auto px-4 py-12">
        <PathCrumbs />
        <ServiceIntro />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8" id="service-packages">
            {/* Category Filters + Search */}
            <ServiceFilter
              filteredServices={filteredServices}
              serviceCategories={serviceCategories}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            {/* Empty State */}
            {filteredServices.length === 0 && (
              <ServiceEmpty
                setSearchQuery={setSearchQuery}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {/* Services Grid */}
            {filteredServices.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredServices.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1 space-y-8">
            <ServiceFeatured services={services.filter((s) => s.isFeatured)} />
            <ServiceSideGuide services={services} />
          </div>
        </div>
        <ServiceContactBanner />
        <ServiceTestimonial />
      </div>
    </div>
  );
};

export default ServicesPage;
