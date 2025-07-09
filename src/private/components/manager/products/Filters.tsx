import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Search,
  ListFilterPlus,
  ChartBarBig,
  LayoutGrid,
  List,
} from "lucide-react";
import React from "react";
const Filters: React.FC<{
  searchTerm: string;
  handleSearch: (term: string) => void;
  categoryFilter: string | null;
  handleCategoryFilter: (category: string | null) => void;
  currentView: "list" | "grid";
  setCurrentView: (view: "list" | "grid") => void;
  setStatusFilter: (status: string | null) => void;
}> = ({
  searchTerm,
  handleSearch,
  categoryFilter,
  handleCategoryFilter,
  currentView,
  setCurrentView,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="search"
          placeholder="Tìm kiếm sản phẩm theo tên, SKU hoặc mô tả..."
          className="pl-10 bg-primary/10 placeholder:text-gray-500 focus:bg-primary/20"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 flex-wrap justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ListFilterPlus />
              {categoryFilter ? categoryFilter : "Tất cả danh mục"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleCategoryFilter(null)}>
              Tất cả danh mục
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleCategoryFilter("Caskets")}>
              Quan tài
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleCategoryFilter("FuneralClothing")}
            >
              Trang phục tang lễ
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleCategoryFilter("FuneralAccessories")}
            >
              Phụ kiện lễ tang
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleCategoryFilter("Flowers")}>
              Vòng hoa – Hoa tươi
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleCategoryFilter("Altars")}>
              Đồ thờ cúng to
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ChartBarBig />
              Trạng thái
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
              Tất cả trạng thái
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("active")}>
              Chỉ hoạt động
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
              Chỉ không hoạt động
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentView(currentView === "list" ? "grid" : "list")
          }
          title={
            currentView === "list"
              ? "Chuyển sang Chế độ xem lưới"
              : "Chuyển sang Chế độ xem danh sách"
          }
        >
          {currentView === "list" ? <LayoutGrid /> : <List />}
        </Button>
      </div>
    </div>
  );
};

export default Filters;
