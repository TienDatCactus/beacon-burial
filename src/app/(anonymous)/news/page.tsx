"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNews } from "@/lib/hooks/useNews";
import { CalendarIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

const NewsPage = () => {
  // Get all news at once for client-side filtering
  const { news: allNews, loading, error, fetchNews } = useNews();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 9 items per page for 3x3 grid

  const categories = ["Hướng dẫn", "Kiến thức", "Chính sách"];

  useEffect(() => {
    fetchNews({ status: "active", limit: 100 });
  }, [fetchNews]);

  // Client-side filtered news
  const filteredNews = useMemo(() => {
    return allNews.filter((item) => {
      const isActive = item.status === "active";
      // Filter by search term (title, summary, content)
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.summary &&
          item.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.content &&
          item.content.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by category
      const matchesCategory =
        !activeCategory || item.category === activeCategory;

      return isActive && matchesSearch && matchesCategory;
    });
  }, [allNews, searchTerm, activeCategory]);

  // Calculate pagination
  const totalItems = filteredNews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredNews.slice(startIndex, endIndex);
  }, [filteredNews, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategory]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setActiveCategory(null);
    setCurrentPage(1);
  };

  // Generate array of pages to show for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("ellipsis-start");
        }
      }

      for (let i = startPage; i <= endPage && i <= totalPages; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }

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
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Tin tức & Kiến thức
      </h1>

      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm tin tức..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick("")}
            >
              Tất cả
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Active filters indicator */}
      {(searchTerm || activeCategory) && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Đang lọc theo:</span>
            {searchTerm && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs">
                Từ khóa: {searchTerm}
              </span>
            )}
            {activeCategory && (
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs">
                Danh mục: {activeCategory}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Hiển thị{" "}
          {filteredNews.length > 0
            ? `1-${Math.min(currentItems.length, itemsPerPage)}`
            : "0"}{" "}
          trong {filteredNews.length} kết quả
        </p>
      </div>

      {/* Loading state */}
      {loading && allNews.length === 0 && (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải tin tức...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => fetchNews({ status: "active" })}
            variant="outline"
          >
            Thử lại
          </Button>
        </div>
      )}

      {/* News grid */}
      {!loading && !error && currentItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((newsItem) => (
            <Link
              key={newsItem._id}
              href={`/news/${newsItem._id}`}
              className="block transition-transform hover:-translate-y-1"
            >
              <Card className="h-full overflow-hidden hover:shadow-md">
                <div className="relative h-48 w-full">
                  {newsItem.image && (
                    <Image
                      width={400}
                      height={200}
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 text-xs bg-white/80 backdrop-blur-sm rounded-md">
                      {newsItem.category}
                    </span>
                  </div>
                </div>
                <CardContent>
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {newsItem.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {newsItem.summary}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-auto justify-between">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>
                        {new Date(newsItem.created_at).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredNews.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            Không tìm thấy bài viết nào phù hợp
          </p>
          <Button variant="outline" className="mt-4" onClick={resetFilters}>
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              {/* Previous page button */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
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
                        handlePageChange(page as number);
                      }}
                      isActive={currentPage === page}
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
                    if (currentPage < totalPages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  className={
                    currentPage === totalPages
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
  );
};

export default NewsPage;
