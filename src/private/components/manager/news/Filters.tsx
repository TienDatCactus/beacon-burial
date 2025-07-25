import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewsCategory } from "@/lib/interfaces";
import { GridIcon, ListIcon, SearchIcon } from "lucide-react";
import { FC } from "react";

interface FiltersProps {
  categoryFilter: string | null;
  currentView: "list" | "grid";
  setCurrentView: (view: "list" | "grid") => void;
  searchTerm: string;
  handleSearch: (term: string) => void;
  handleCategoryFilter: (category: string | null) => void;
  setStatusFilter: (status: string | null) => void;
  categories: NewsCategory[];
}

const Filters: FC<FiltersProps> = ({
  categoryFilter,
  currentView,
  setCurrentView,
  searchTerm,
  handleSearch,
  handleCategoryFilter,
  setStatusFilter,
  categories,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4 md:items-center flex-1">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm bài viết..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Category filter */}
        <Select
          value={categoryFilter || ""}
          onValueChange={(value) =>
            handleCategoryFilter(value === "" ? null : value)
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          onValueChange={(value) =>
            setStatusFilter(value === "" ? null : value)
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="published">Đã đăng</SelectItem>
            <SelectItem value="draft">Nháp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* View toggle */}
      <div className="flex items-center space-x-2">
        <Button
          variant={currentView === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => setCurrentView("list")}
          className={
            currentView === "list" ? "bg-primary hover:bg-primary/90" : ""
          }
        >
          <ListIcon className="h-5 w-5" />
        </Button>
        <Button
          variant={currentView === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => setCurrentView("grid")}
          className={
            currentView === "grid" ? "bg-primary hover:bg-primary/90" : ""
          }
        >
          <GridIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Filters;
