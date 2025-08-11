import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/api/product";
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
  categoryFilter: string | null;
  currentView: "list" | "grid";
  loading: boolean;
  setCurrentView: (view: "list" | "grid") => void;
  setSearchTerm: (term: string) => void;
  setFilteredProducts: (products: Product[]) => void;
  setCategoryFilter: (category: string | null) => void;
  filterByCategory: (category: string) => void;
  handleStatusFilter: (status: string | null) => void;
}> = ({
  searchTerm,
  categoryFilter,
  currentView,
  loading,
  setCurrentView,
  setSearchTerm,
  setCategoryFilter,
  filterByCategory,
  handleStatusFilter,
}) => {
  // Handle search input changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle category filter changes
  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
    if (category) {
      filterByCategory(category);
    } else {
      filterByCategory("");
    }
  };

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
              {loading && <span className="ml-2 animate-spin">↻</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleCategoryFilter(null)}>
              Tất cả danh mục
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCategoryFilter("Quan tài an táng")}
            >
              Quan tài an táng
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCategoryFilter("Quan tài hỏa táng")}
            >
              Quan tài hỏa táng
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCategoryFilter("Tiểu quách")}
            >
              Tiểu quách
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleCategoryFilter("Hũ tro cốt")}
            >
              Hũ tro cốt
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCategoryFilter("Áo quan")}>
              Áo quan
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
            <DropdownMenuItem onClick={() => handleStatusFilter(null)}>
              Tất cả trạng thái
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("active")}>
              Chỉ hoạt động
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("inactive")}>
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
