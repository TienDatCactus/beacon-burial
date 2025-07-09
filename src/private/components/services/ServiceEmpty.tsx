import { Button } from "@/components/ui/button";
import React from "react";
interface ServiceEmptyProps {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
}
const ServiceEmpty: React.FC<ServiceEmptyProps> = ({
  setSearchQuery,
  setSelectedCategory,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
        <svg
          className="h-6 w-6 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium">No services found</h3>
      <p className="text-gray-500 mt-2 mb-4">
        We couldn&apos;t find any service packages matching your criteria.
      </p>
      <Button
        variant="outline"
        onClick={() => {
          setSearchQuery("");
          setSelectedCategory(null);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default ServiceEmpty;
