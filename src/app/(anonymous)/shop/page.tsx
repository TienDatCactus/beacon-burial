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
import React, { useState, useEffect } from "react";

const Shop: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("latest");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  // Get product categories
  const categories = [
    "Quan tài an táng",
    "Quan tài hỏa táng",
    "Tiểu quách",
    "Hũ tro cốt",
    "Áo quan",
  ];

  const products = allProducts.filter((product) => product.status === "active");

  // Handle search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        // Search by keyword
        searchProducts({ keyword: searchTerm, page: 1 });
      } else if (searchTerm === "") {
        // Reset search when input is cleared
        if (selectedCategory && selectedCategory !== "all") {
          searchProducts({ category: selectedCategory, page: 1 });
        } else {
          searchProducts({ page: 1 });
        }
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, selectedCategory, searchProducts]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    refreshProducts();
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Clear search term to avoid conflicts
    setSearchTerm("");

    if (category === "all") {
      // Reset all filters
      searchProducts({ page: 1 });
    } else {
      // Filter by category
      searchProducts({ category, page: 1 });
    }
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    goToPage(page);
  };

  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className="bg-gray-50 p-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
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
          <div className="flex items-center justify-center min-h-[400px]">
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

  return (
    <div className="bg-gray-50 p-20">
      <div className="container mx-auto px-4">
        <PathCrumbs />
        <div className="flex flex-col space-y-4 items-center mb-12">
          <h1 className="text-6xl  text-center ">Cửa hàng</h1>
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <SelectTrigger className="w-[11.25rem]">
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

            {/* Sort Filter */}
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[11.25rem]">
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

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            Đang hiển thị {products.length > 0 ? `1 – ${products.length}` : "0"}{" "}
            trong {pagination.totalProducts} kết quả
            {searchTerm && ` cho "${searchTerm}"`}
            {selectedCategory &&
              selectedCategory !== "all" &&
              ` trong danh mục "${selectedCategory}"`}
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
                {searchTerm || selectedCategory !== "all"
                  ? "Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn."
                  : "Chưa có sản phẩm nào."}
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    resetFilters();
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                {pagination.hasPrevPage && (
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pagination.currentPage - 1);
                      }}
                    />
                  </PaginationItem>
                )}

                {/* Page numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    // Show first page, last page, current page, and pages around current
                    return (
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - pagination.currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    // Add ellipsis between non-consecutive pages
                    const showEllipsisBefore =
                      index > 0 && array[index - 1] < page - 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                            isActive={page === pagination.currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    );
                  })}

                {pagination.hasNextPage && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pagination.currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
