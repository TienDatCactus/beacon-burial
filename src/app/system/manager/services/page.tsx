"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Service } from "@/lib/api/service";
import {
  useServiceCategories,
  useServiceManagement,
  useServices,
} from "@/lib/hooks/useServices";
import withAuth from "@/lib/hooks/useWithAuth";
import DetailDialog from "@/private/components/manager/services/DetailDialog";
import EditService from "@/private/components/manager/services/EditService";
import GridView from "@/private/components/manager/services/GridView";
import TableView from "@/private/components/manager/services/TableView";
import EmptyFilter from "@/shared/components/state/EmptyFilter";
import {
  ChartBarBig,
  LayoutGrid,
  List,
  ListFilterPlus,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

const ServicesManagementPage = () => {
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
    pagination,
    searchByKeyword,
    filterByCategory,
    filterByPriceRange,
    goToPage,
    refreshServices,
  } = useServices({ limit: 9 }); // 9 services per page as specified
  const { toggleServiceStatus } = useServiceManagement();

  const { categories } = useServiceCategories();

  // Local state for UI management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"list" | "grid">("list");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchByKeyword(searchTerm.trim());
      } else if (searchTerm === "") {
        searchByKeyword("");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
    filterByCategory(category);
  };

  const handlePriceRangeFilter = (priceRange: string | null) => {
    filterByPriceRange(priceRange);
  };

  const handleToggleStatus = async (serviceId: string) => {
    const success = await toggleServiceStatus(serviceId);
    if (success) {
      refreshServices();
    }
  };

  const handleToggleStatusWrapper = (id: string) => {
    handleToggleStatus(id);
  };

  // Create wrapper functions to match component interfaces
  const handleViewServiceDetails = (service: Service) => {
    setSelectedService(service);
    setIsViewDialogOpen(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setIsEditDialogOpen(true);
  };

  const handleConfirmDeleteService = (service: Service) => {
    setSelectedService(service);
  };

  // Create new service
  const handleCreateService = () => {
    const newService: Partial<Service> = {
      _id: "",
      title: "",
      slug: "",
      price: 0,
      status: "active",
      imageUrl: [],
      category: categories[0] || "",
      description: "",
      inclusions: [],
      isFeatured: false,
    };
    setSelectedService(newService as Service);
    setIsEditDialogOpen(true);
  };

  // Show loading state
  if (servicesLoading && services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Đang tải danh sách dịch vụ...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (servicesError && services.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Lỗi khi tải danh sách dịch vụ: {servicesError}
          </p>
          <Button onClick={refreshServices}>Thử lại</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý dịch vụ tang lễ
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý các gói dịch vụ, giá cả và nội dung bao gồm
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/80"
          onClick={handleCreateService}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm gói dịch vụ
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Tìm kiếm gói dịch vụ..."
            className="pl-10"
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
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ChartBarBig />
                Khoảng giá
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handlePriceRangeFilter(null)}>
                Tất cả giá
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePriceRangeFilter("0-50000000")}
              >
                Dưới 50 triệu
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePriceRangeFilter("50000000-100000000")}
              >
                50-100 triệu
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePriceRangeFilter("100000000-200000000")}
              >
                100-200 triệu
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePriceRangeFilter("200000000-999999999")}
              >
                Trên 200 triệu
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
                ? "Chuyển sang chế độ xem lưới"
                : "Chuyển sang chế độ xem danh sách"
            }
          >
            {currentView === "list" ? <List /> : <LayoutGrid />}
          </Button>
        </div>
      </div>

      {/* Show empty state when no services found */}
      {services.length === 0 && !servicesLoading && (
        <EmptyFilter
          setSearchTerm={setSearchTerm}
          setStatusFilter={setCategoryFilter}
        />
      )}

      {/* Services table (list view) */}
      {services.length > 0 && currentView === "list" && (
        <TableView
          pagination={pagination}
          filteredServices={services}
          toggleStatus={handleToggleStatusWrapper}
          viewServiceDetails={handleViewServiceDetails as any}
          editService={handleEditService as any}
          confirmDeleteService={handleConfirmDeleteService as any}
          goToPage={goToPage}
        />
      )}

      {/* Services grid view */}
      {services.length > 0 && currentView === "grid" && (
        <GridView
          goToPage={goToPage}
          filteredServices={services}
          toggleStatus={handleToggleStatusWrapper}
          viewServiceDetails={handleViewServiceDetails as any}
          editService={handleEditService as any}
          pagination={pagination}
        />
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => goToPage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            Trước
          </Button>
          <span className="flex items-center px-4">
            Trang {pagination.currentPage} / {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => goToPage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Tiếp
          </Button>
        </div>
      )}

      {/* View service details dialog */}
      {selectedService && (
        <DetailDialog
          editService={handleEditService}
          isViewDialogOpen={isViewDialogOpen}
          setIsViewDialogOpen={setIsViewDialogOpen}
          selectedService={selectedService}
        />
      )}

      {/* Edit/Add service dialog */}
      {selectedService && (
        <EditService
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
    </div>
  );
};

export default withAuth(ServicesManagementPage, ["admin"]);
