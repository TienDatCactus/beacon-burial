"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  price?: number;
  slug: string;
}

interface StaffCardProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  category,
  description,
  imageUrl,
  price,
  slug,
}) => {
  return (
    <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {price && (
          <div className="absolute bottom-4 right-4 bg-white px-3 py-1 font-medium text-sm">
            ${price}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="uppercase text-gray-500 text-xs tracking-wide mb-2">
          {category}
        </div>
        <h3 className="font-serif text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <Link href={`/services/${slug}`}>
          <Button
            variant="outline"
            className="border-gray-300 hover:border-amber-500 hover:text-amber-600 transition-colors px-0 py-0"
          >
            <span className="text-xs">Learn More</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const StaffCard: React.FC<StaffCardProps> = ({
  name,
  role,
  description,
  imageUrl,
}) => {
  return (
    <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="uppercase text-gray-500 text-xs tracking-wide mb-2">
          {role}
        </div>
        <h3 className="font-serif text-xl mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      </div>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample service data
  const services: ServiceCardProps[] = [
    {
      title: "Personalized Funerals",
      category: "Funeral",
      description:
        "The memorial funeral service as stated by your religious customs.",
      imageUrl: "/images/pexels-brett-sayles-3648309.jpg",
      slug: "personalized-funerals",
    },
    {
      title: "Traditional Burial",
      category: "Funeral",
      description:
        "This classic funeral plan is in a graveyard burial ground or cemetery.",
      imageUrl: "/images/pexels-kseniachernaya-8986709.jpg",
      slug: "traditional-burial",
    },
    {
      title: "Green Funerals",
      category: "Funeral",
      description:
        "Burials without a headstone, only special tree or flowers in the woodland.",
      imageUrl:
        "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
      slug: "green-funerals",
    },
    {
      title: "Scattering Cremated Remains",
      category: "Pricing",
      description: "Ash scattering is a special occasion for commemoration.",
      imageUrl:
        "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
      price: 950,
      slug: "scattering-cremated-remains",
    },
    {
      title: "Graveside Service",
      category: "Pricing",
      description: "Pastor leads the entire funeral and will speak a prayer.",
      imageUrl: "/images/image-45-840x840.jpg",
      price: 1395,
      slug: "graveside-service",
    },
    {
      title: "Direct Cremation Without Ceremony",
      category: "Pricing",
      description: "A non-attended cremation without funeral ceremony.",
      imageUrl: "/images/pexels-brett-sayles-3648309.jpg",
      price: 1150,
      slug: "direct-cremation",
    },
    {
      title: "Traditional Cremation Service",
      category: "Pricing",
      description: "Includes traditional funeral service and cremation.",
      imageUrl: "/images/image-10.jpg",
      price: 4400,
      slug: "traditional-cremation",
    },
    {
      title: "Cremation With Memorial Service",
      category: "Pricing",
      description: "At a cemetery family prior at the urn of the deceased.",
      imageUrl: "/images/pexels-sora-shimazaki-5668886.jpg",
      price: 2555,
      slug: "cremation-with-memorial",
    },
    {
      title: "VIP-Class Burial Service",
      category: "Pricing",
      description: "Burial with a beautiful memorial for your loved ones.",
      imageUrl: "/images/image-10.jpg",
      price: 3000,
      slug: "vip-burial",
    },
  ];

  // Sample staff data
  const staff: StaffCardProps[] = [
    {
      name: "Rachel Winson",
      role: "Obituaries",
      description:
        "Rachel devoted herself to her beloved family. She was a loving wife, mother and grandmother.",
      imageUrl: "/images/image-10.jpg",
    },
    {
      name: "Andrew Larsen",
      role: "Obituaries",
      description:
        "Andrew was a talented writer. He taught children how to grow with joy and child and kind-hearted people.",
      imageUrl: "/images/pexels-sora-shimazaki-5668886.jpg",
    },
    {
      name: "Sally Roberts",
      role: "Obituaries",
      description:
        "Church was very important to Sally. She volunteered all her life, helping orphans and sick children.",
      imageUrl: "/images/image-45-840x840.jpg",
    },
  ];

  // Filter services based on search query
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Categories for the sidebar
  const categories = [
    "Family Support",
    "Funerals",
    "Funeral Service",
    "News",
    "The Last Goodbye",
    "Traditions",
    "Uncategorized",
    "Your Stories",
  ];

  // Recent posts for the sidebar
  const recentPosts = [
    {
      title: "What you should do with ashes after cremation",
      imageUrl:
        "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
      slug: "what-to-do-with-ashes",
    },
    {
      title: "Check-list of things to cancel when someone dies",
      imageUrl:
        "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
      slug: "checklist-when-someone-dies",
    },
  ];

  // Tags for the sidebar
  const tags = [
    "Emotions",
    "Family",
    "Memories",
    "Obituaries",
    "Special Items",
    "Mothers",
    "Remembrance",
    "Support",
  ];

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-12">
            {/* Services Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-serif mb-4">
                Our Services
              </h1>
              <p className="text-gray-600">
                We offer a comprehensive range of funeral and memorial services
                to honor your loved ones.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <nav className="inline-flex">
                <a
                  href="#"
                  className="px-3 py-1 bg-gray-800 text-white font-semibold"
                >
                  1
                </a>
                <a
                  href="#"
                  className="px-3 py-1 text-gray-700 hover:bg-gray-200"
                >
                  2
                </a>
                <a
                  href="#"
                  className="px-3 py-1 text-gray-700 hover:bg-gray-200"
                >
                  →
                </a>
              </nav>
            </div>

            {/* Staff Section */}
            {staff.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-serif mb-6">Our Staff</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {staff.map((person, index) => (
                    <StaffCard key={index} {...person} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm mb-8">
              <h2 className="text-lg font-serif mb-4">Search</h2>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 focus:ring-amber-500 focus:border-amber-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm mb-8">
              <h2 className="text-lg font-serif mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index} className="flex items-center">
                    <ArrowRight className="h-3 w-3 text-amber-500 mr-2" />
                    <a href="#" className="text-gray-700 hover:text-amber-600">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 shadow-sm mb-8">
              <h2 className="text-lg font-serif mb-4">Recent Posts</h2>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 relative mr-4">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-amber-600 font-medium text-sm"
                    >
                      {post.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm">
              <h2 className="text-lg font-serif mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-xs text-gray-700 hover:text-amber-600 bg-gray-100 hover:bg-gray-200 rounded px-2 py-1"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
