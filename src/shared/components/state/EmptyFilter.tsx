import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import React from "react";
const EmptyFilter: React.FC<{
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string | null) => void;
}> = ({ setSearchTerm, setStatusFilter }) => {
  return (
    <div className="text-center py-12 border rounded-md bg-white">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <ShoppingCart className="h-6 w-6 text-gray-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        Không tìm thấy đơn hàng nào
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Chúng tôi không tìm thấy bất kỳ đơn hàng nào phù hợp với tiêu chí của
        bạn. Hãy thử điều chỉnh bộ lọc của bạn.
      </p>
      <div className="mt-6">
        <Button
          onClick={() => {
            setSearchTerm("");
            setStatusFilter(null);
          }}
          variant="outline"
        >
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
};

export default EmptyFilter;
