import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import React from "react";
const Filters: React.FC<{
  searchTerm: string;
  handleSearch: (term: string) => void;
  statusFilter: string | null;
  handleStatusFilter: (status: string | null) => void;
}> = ({ searchTerm, handleSearch, statusFilter, handleStatusFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Tìm kiếm theo ID hoặc khách hàng..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {statusFilter ? `Status: ${statusFilter}` : "Tất cả trạng thái"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleStatusFilter(null)}>
              Tất cả đơn hàng
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("processing")}>
              Đơn hàng đang xử lý
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("accepted")}>
              Đơn hàng đã xác nhận
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("declined")}>
              Đơn hàng đã từ chối
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Filters;
