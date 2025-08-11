"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/lib/hooks/useProducts";
import ProductCards from "@/shared/components/cards/ProductCards";
import PathCrumbs from "@/shared/components/layouts/path-crumbs";
import { ChevronDown, Search } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

const Shop: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("latest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("all");

  const {
    products: allProducts,
    loading,
    error,
    pagination,
    goToPage,
    refreshProducts,
    resetFilters,
    searchProducts,
  } = useProducts({
    limit: 9, // 9 products per page for shop
  });

  // Product categories
  const categories = [
    "Quan tài an táng",
    "Quan tài hỏa táng",
    "Tiểu quách",
    "Hũ tro cốt",
    "Áo quan",
  ];

  // Price range options
  const priceRanges = [
    { label: "Tất cả mức giá", value: "all" },
    { label: "Dưới 1 triệu", value: "0-1000" },
    { label: "1 - 3 triệu", value: "1000-3000" },
    { label: "3 - 5 triệu", value: "3000-5000" },
    { label: "5 - 10 triệu", value: "5000-10000" },
    { label: "Trên 10 triệu", value: "10000-999999" },
  ];

  const products = allProducts.filter((product) => product.status === "active");

  // Apply filters with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      const filters: any = { page: 1 };

      // Add search term if exists
      if (searchTerm.trim()) {
        filters.keyword = searchTerm.trim();
      }

      // Add category filter
      if (selectedCategory && selectedCategory !== "all") {
        filters.category = selectedCategory;
      }

      // Add price range filter
      if (priceRange && priceRange !== "all") {
        filters.priceRange = priceRange;
      }

      // Add sort parameter
      if (sortBy) {
        filters.sort = sortBy;
      }

      searchProducts(filters);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, selectedCategory, priceRange, sortBy, searchProducts]);

  // Handle sort change
  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  // Handle category filter
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Handle price range filter
  const handlePriceRangeChange = useCallback((range: string) => {
    setPriceRange(range);
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("latest");
    resetFilters();
  }, [resetFilters]);

  // Get price range label for display
  const getPriceRangeLabel = (value: string) => {
    const range = priceRanges.find((r) => r.value === value);
    return range ? range.label : "Tất cả mức giá";
  };

  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className="bg-gray-50 p-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[25rem]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-500">Đang tải sản phẩm...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="bg-gray-50 p-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[25rem]">
            <div className="text-center">
              <p className="text-red-500 mb-4">Lỗi khi tải sản phẩm: {error}</p>
              <button
                onClick={refreshProducts}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generate array of pages to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of page buttons to show
    const currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex logic for when we have many pages
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust if we're near the end
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("ellipsis-start");
        }
      }

      // Add middle pages
      for (let i = startPage; i <= endPage && i <= totalPages; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }

      // Add last page and ellipsis if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("ellipsis-end");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="bg-gray-50 p-20">
      <div className="container mx-auto px-4">
        <PathCrumbs />
        <div className="flex flex-col space-y-4 items-center mb-12">
          <h1 className="text-6xl text-center">Cửa hàng</h1>
          <ChevronDown />
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex gap-4 flex-wrap">
            {/* Category Filter */}
            {categories.length > 0 && (
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Price Range Filter - NEW */}
            <Select value={priceRange} onValueChange={handlePriceRangeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn mức giá" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Mới nhất</SelectItem>
                <SelectItem value="popularity">Phổ biến</SelectItem>
                <SelectItem value="price-low">
                  Sắp xếp theo giá: thấp đến cao
                </SelectItem>
                <SelectItem value="price-high">
                  Sắp xếp theo giá: cao đến thấp
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters & Reset */}
        {(searchTerm ||
          selectedCategory !== "all" ||
          priceRange !== "all" ||
          sortBy !== "latest") && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">Đang lọc theo:</span>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs flex items-center">
                  Từ khóa: {searchTerm}
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs flex items-center">
                  Danh mục: {selectedCategory}
                </span>
              )}
              {priceRange !== "all" && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs flex items-center">
                  Giá: {getPriceRangeLabel(priceRange)}
                </span>
              )}
              {sortBy !== "latest" && (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs flex items-center">
                  Sắp xếp:{" "}
                  {sortBy === "popularity"
                    ? "Phổ biến"
                    : sortBy === "price-low"
                    ? "Giá: thấp đến cao"
                    : sortBy === "price-high"
                    ? "Giá: cao đến thấp"
                    : "Mới nhất"}
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-primary text-xs hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            Đang hiển thị {products.length > 0 ? `1 – ${products.length}` : "0"}{" "}
            trong {pagination.totalResults} kết quả
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCards key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm ||
                selectedCategory !== "all" ||
                priceRange !== "all"
                  ? "Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn."
                  : "Chưa có sản phẩm nào."}
              </p>
              {(searchTerm ||
                selectedCategory !== "all" ||
                priceRange !== "all") && (
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-primary hover:underline"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination using ProductPagination pattern */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                {/* Previous page button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination.currentPage > 1) {
                        goToPage(pagination.currentPage - 1);
                      }
                    }}
                    className={
                      pagination.currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) => {
                  if (page === "ellipsis-start" || page === "ellipsis-end") {
                    return (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return (
                    <PaginationItem key={`page-${index}`}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(page as number);
                        }}
                        isActive={pagination.currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {/* Next page button */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination.currentPage < pagination.totalPages) {
                        goToPage(pagination.currentPage + 1);
                      }
                    }}
                    className={
                      pagination.currentPage === pagination.totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
