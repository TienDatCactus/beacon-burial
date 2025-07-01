import { Button } from "@/components/ui/button";
import { PackageX } from "lucide-react";
import React from "react";

interface EmptyFilterProps {
  setSearchTerm: (term: string) => void;
  setCategoryFilter: (category: string | null) => void;
}
const EmptyFilter: React.FC<EmptyFilterProps> = ({
  setSearchTerm,
  setCategoryFilter,
}) => {
  return (
    <div className="text-center py-12 border rounded-md bg-white">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <PackageX className="h-6 w-6 text-gray-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        No services found
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        We couldn't find any service packages matching your search. Try
        adjusting your filters.
      </p>
      <div className="mt-6">
        <Button
          onClick={() => {
            setSearchTerm("");
            setCategoryFilter(null);
          }}
          variant="outline"
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
};

export default EmptyFilter;
