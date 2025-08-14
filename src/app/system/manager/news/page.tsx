"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Filters from "@/private/components/manager/news/Filters";
import ListView from "@/private/components/manager/news/ListView";
import GridView from "@/private/components/manager/news/GridView";
import EditDialog from "@/private/components/manager/news/EditDialog";
import DetailsDialog from "@/private/components/manager/news/DetailsDialog";
import { useNews, useNewsManagement } from "@/lib/hooks/useNews";
import { News, NewsFilters } from "@/lib/api/news";
import withAuth from "@/lib/hooks/useWithAuth";
import { Plus } from "lucide-react";

const NewsPage: React.FC = () => {
  // Real API hooks
  const { news, pagination, loading, error, fetchNews } = useNews();
  const { creating, updateNewsStatus } = useNewsManagement();

  // Local state for UI
  const [currentView, setCurrentView] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    "Hướng dẫn" | "Kiến thức" | "Chính sách" | null
  >(null);
  const [statusFilter, setStatusFilter] = useState<
    "active" | "inactive" | null
  >(null);
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Mock categories based on API enum
  const categories = [
    { id: "1", name: "Hướng dẫn", slug: "huong-dan" },
    { id: "2", name: "Kiến thức", slug: "kien-thuc" },
    { id: "3", name: "Chính sách", slug: "chinh-sach" },
  ];

  // Load news data on mount
  useEffect(() => {
    fetchNews({ page: 1, limit: 10 });
  }, []);

  // Apply filters to the API call (without status filter)
  const applyApiFilters = (
    keyword: string,
    category: "Hướng dẫn" | "Kiến thức" | "Chính sách" | null,
    page: number = 1
  ) => {
    const filters: NewsFilters = {
      page,
      limit: 10,
    };

    if (keyword.trim()) {
      filters.keyword = keyword.trim();
    }

    if (category !== null) {
      filters.category = category;
    }

    fetchNews(filters);
  };

  // Client-side status filtering
  const filteredNews = news.filter((item) => {
    return statusFilter == null || item.status == statusFilter;
  });

  // Event handlers
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyApiFilters(term, categoryFilter);
  };

  const handleCategoryFilter = (category: string | null) => {
    const categoryValue =
      category === "all"
        ? null
        : (category as "Hướng dẫn" | "Kiến thức" | "Chính sách" | null);
    setCategoryFilter(categoryValue);
    applyApiFilters(searchTerm, categoryValue);
  };

  // Handle status filter - only applied client-side
  const handleStatusFilter = (status: "active" | "inactive" | null) => {
    setStatusFilter(status);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const togglePublishStatus = async (newsId: string, newStatus: boolean) => {
    try {
      await updateNewsStatus(newsId, {
        status: newStatus ? "active" : "inactive",
      });
      toast.success(
        `Tin tức đã được ${newStatus ? "kích hoạt" : "vô hiệu hóa"}`
      );
      // Refetch current page
      applyApiFilters(searchTerm, categoryFilter, pagination.currentPage);
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái tin tức");
    }
  };

  const viewNewsDetails = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsDetailsOpen(true);
  };

  const editNewsHandler = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsEditOpen(true);
  };

  const handlePageChange = (page: number) => {
    applyApiFilters(searchTerm, categoryFilter, page);
  };

  if (loading && news.length === 0) {
    return <div className="p-6">Đang tải...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý tin tức</h1>
        <Button onClick={() => setIsCreateOpen(true)} disabled={creating}>
          <Plus className="h-4 w-4 mr-2" />
          Tạo tin tức mới
        </Button>
      </div>

      <Filters
        categories={categories}
        categoryFilter={categoryFilter}
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        handleSearch={handleSearch}
        handleCategoryFilter={handleCategoryFilter}
        setStatusFilter={handleStatusFilter}
      />

      {filteredNews.length === 0 && !loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            Không có tin tức nào được tìm thấy
          </p>
          <Button onClick={() => setIsCreateOpen(true)} disabled={creating}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo tin tức đầu tiên
          </Button>
        </div>
      ) : (
        <>
          {currentView === "list" ? (
            <ListView
              filteredNews={filteredNews}
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
              togglePublishStatus={togglePublishStatus}
              viewNewsDetails={viewNewsDetails}
              editNews={editNewsHandler}
            />
          ) : (
            <GridView
              filteredNews={filteredNews}
              togglePublishStatus={togglePublishStatus}
              viewNewsDetails={viewNewsDetails}
              editNews={editNewsHandler}
            />
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    variant={
                      page === pagination.currentPage ? "default" : "outline"
                    }
                    size="sm"
                    disabled={loading}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Create/Edit Dialog */}
      <EditDialog
        isEditDialogOpen={isCreateOpen || isEditOpen}
        setIsEditDialogOpen={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setIsEditOpen(false);
            setSelectedNews(null);
          }
        }}
        selectedNews={selectedNews}
        setFilteredNews={() => {
          applyApiFilters(searchTerm, categoryFilter, pagination.currentPage);
        }}
        setSelectedNews={setSelectedNews}
        categories={categories}
      />

      {/* Details Dialog */}
      <DetailsDialog
        isViewDialogOpen={isDetailsOpen}
        setIsViewDialogOpen={(open) => {
          setIsDetailsOpen(open);
          if (!open) setSelectedNews(null);
        }}
        selectedNews={selectedNews}
        togglePublishStatus={togglePublishStatus}
        editNews={editNewsHandler}
      />
    </div>
  );
};

export default withAuth(NewsPage, ["admin", "manager"]);
