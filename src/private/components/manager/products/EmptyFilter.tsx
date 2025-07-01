import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import React from "react";
interface EmptyFilterProps {
  handleSearch: (searchTerm: string) => void;
}
const EmptyFilter: React.FC<EmptyFilterProps> = ({ handleSearch }) => {
  return (
    <div className="text-center py-12 border rounded-md bg-white">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <Package className="h-6 w-6 text-gray-600" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        Không tìm thấy sản phẩm nào
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Chúng tôi không thể tìm thấy bất kỳ sản phẩm nào phù hợp với tìm kiếm
        của bạn. Hãy thử điều chỉnh bộ lọc của bạn.
      </p>
      <div className="mt-6">
        <Button onClick={() => handleSearch("")} variant="outline">
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
};

export default EmptyFilter;
