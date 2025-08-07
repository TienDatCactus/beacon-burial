import { Input } from "@/components/ui/input";
import { Service } from "@/lib/api/service";
import { Search } from "lucide-react";
import React from "react";
interface ServiceFilterProps {
  filteredServices: Service[];
  serviceCategories: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({
  filteredServices,
  serviceCategories,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl  mb-2">Các gói dịch vụ</h2>
          <p className="text-sm text-gray-500">
            {filteredServices.length} gói dịch vụ có sẵn
          </p>
        </div>
        <div className="relative max-w-xs w-full">
          <Input
            type="search"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedCategory === null
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Tất cả danh mục
        </button>
        {serviceCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceFilter;
