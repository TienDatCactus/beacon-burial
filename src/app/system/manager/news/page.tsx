"use client";

import { Button } from "@/components/ui/button";
import { NewsCategory, NewsItem } from "@/lib/interfaces";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import withAuth from "./../../../../lib/hooks/useWithAuth";
import ListView from "@/private/components/manager/news/ListView";
import GridView from "@/private/components/manager/news/GridView";
import Filters from "@/private/components/manager/news/Filters";
import DetailsDialog from "@/private/components/manager/news/DetailsDialog";
import DeleteDialog from "@/private/components/manager/news/DeleteDialog";
import EditDialog from "@/private/components/manager/news/EditDialog";
import EmptyFilter from "@/shared/components/state/EmptyFilter";

// Mock news data
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Hướng dẫn tổ chức tang lễ theo truyền thống Việt Nam",
    slug: "huong-dan-to-chuc-tang-le-theo-truyen-thong-viet-nam",
    summary:
      "Tìm hiểu các nghi thức và truyền thống trong tang lễ Việt Nam và cách tổ chức sao cho trang trọng, đúng phong tục.",
    content: `
      <h2>Nghi thức truyền thống trong tang lễ Việt Nam</h2>
      <p>Tang lễ Việt Nam là một nghi thức quan trọng thể hiện lòng hiếu thảo và sự tôn kính với người đã khuất. Bài viết này sẽ hướng dẫn chi tiết về các bước tổ chức tang lễ theo phong tục truyền thống.</p>
      <h3>Các bước chuẩn bị</h3>
      <p>Khi người thân qua đời, gia đình cần thực hiện các bước sau...</p>
      <h3>Nghi thức cúng bái</h3>
      <p>Các nghi thức cúng bái trong tang lễ Việt Nam thường bao gồm...</p>
      <h3>Thời gian để tang</h3>
      <p>Theo truyền thống, thời gian để tang thường là...</p>
    `,
    coverImage: "/images/pexels-kseniachernaya-8986709.jpg",
    author: "Nguyễn Văn A",
    publishedAt: new Date("2023-10-15"),
    tags: ["truyền thống", "tang lễ", "nghi thức"],
    isPublished: true,
    category: "Hướng dẫn",
  },
  {
    id: "2",
    title: "Ý nghĩa của các loài hoa trong tang lễ",
    slug: "y-nghia-cua-cac-loai-hoa-trong-tang-le",
    summary:
      "Khám phá ý nghĩa sâu sắc đằng sau các loài hoa thường được sử dụng trong tang lễ và cách chọn hoa phù hợp.",
    content: `
      <h2>Ý nghĩa của các loài hoa trong tang lễ</h2>
      <p>Hoa không chỉ là vật trang trí trong tang lễ mà còn mang nhiều ý nghĩa tâm linh và văn hóa sâu sắc.</p>
      <h3>Hoa cúc trắng</h3>
      <p>Hoa cúc trắng tượng trưng cho sự tinh khiết, chân thành và lòng tôn kính...</p>
      <h3>Hoa ly</h3>
      <p>Hoa ly, đặc biệt là hoa ly trắng, thể hiện sự thanh cao và linh hồn trở về cõi vĩnh hằng...</p>
      <h3>Các loại hoa khác</h3>
      <p>Ngoài ra, các loài hoa như hoa hồng trắng, hoa lan, và hoa cẩm chướng cũng mang những ý nghĩa riêng...</p>
    `,
    coverImage: "/images/image-45-840x840.jpg",
    author: "Lê Thị B",
    publishedAt: new Date("2023-11-05"),
    tags: ["hoa tang lễ", "ý nghĩa", "văn hóa"],
    isPublished: true,
    category: "Kiến thức",
  },
  {
    id: "3",
    title: "Chính sách hỗ trợ chi phí mai táng từ bảo hiểm xã hội",
    slug: "chinh-sach-ho-tro-chi-phi-mai-tang-tu-bao-hiem-xa-hoi",
    summary:
      "Thông tin về các chính sách hỗ trợ chi phí mai táng từ bảo hiểm xã hội và cách thức đăng ký nhận trợ cấp.",
    content: `
      <h2>Chính sách hỗ trợ chi phí mai táng từ bảo hiểm xã hội</h2>
      <p>Người lao động tham gia bảo hiểm xã hội và thân nhân của họ có thể được hưởng trợ cấp mai táng khi không may qua đời.</p>
      <h3>Đối tượng được hưởng</h3>
      <p>Theo quy định hiện hành, các đối tượng sau đây được hưởng trợ cấp mai táng...</p>
      <h3>Mức trợ cấp</h3>
      <p>Mức trợ cấp mai táng phí được quy định dựa trên lương cơ sở...</p>
      <h3>Thủ tục đăng ký</h3>
      <p>Để nhận được trợ cấp mai táng, người thân cần chuẩn bị các giấy tờ sau...</p>
    `,
    coverImage: "/images/pexels-sora-shimazaki-5668886.jpg",
    author: "Phạm Văn C",
    publishedAt: new Date("2023-12-10"),
    tags: ["bảo hiểm xã hội", "trợ cấp", "chi phí mai táng"],
    isPublished: true,
    category: "Chính sách",
  },
  {
    id: "4",
    title: "5 cách giúp vượt qua nỗi đau mất người thân",
    slug: "5-cach-giup-vuot-qua-noi-dau-mat-nguoi-than",
    summary:
      "Những phương pháp tâm lý và thực tiễn giúp vượt qua giai đoạn đau buồn sau khi mất đi người thân yêu.",
    content: `
      <h2>5 cách giúp vượt qua nỗi đau mất người thân</h2>
      <p>Mất đi người thân là một trong những trải nghiệm đau đớn nhất trong cuộc đời. Dưới đây là một số cách có thể giúp bạn vượt qua giai đoạn khó khăn này.</p>
      <h3>1. Chấp nhận cảm xúc của bản thân</h3>
      <p>Đừng cố gắng kìm nén hoặc phủ nhận nỗi buồn. Hãy cho phép bản thân cảm nhận và bày tỏ cảm xúc...</p>
      <h3>2. Tìm kiếm sự hỗ trợ</h3>
      <p>Đừng cô lập bản thân. Hãy chia sẻ với người thân, bạn bè hoặc tham gia các nhóm hỗ trợ...</p>
      <h3>3. Chăm sóc sức khỏe thể chất</h3>
      <p>Duy trì lối sống lành mạnh, đảm bảo ngủ đủ giấc và ăn uống điều độ...</p>
      <h3>4. Tìm ý nghĩa</h3>
      <p>Tìm kiếm ý nghĩa trong mất mát có thể giúp bạn chấp nhận và vượt qua nó...</p>
      <h3>5. Tìm kiếm sự trợ giúp chuyên nghiệp nếu cần</h3>
      <p>Nếu nỗi đau quá lớn và kéo dài, đừng ngần ngại tìm đến các chuyên gia tâm lý...</p>
    `,
    coverImage: "/images/pexels-brett-sayles-3648309.jpg",
    author: "Trần Thị D",
    publishedAt: new Date("2024-01-20"),
    tags: ["tâm lý", "vượt qua đau buồn", "hỗ trợ tinh thần"],
    isPublished: false,
    category: "Tâm lý",
  },
];

const mockCategories: NewsCategory[] = [
  { id: "1", name: "Hướng dẫn", slug: "huong-dan" },
  { id: "2", name: "Kiến thức", slug: "kien-thuc" },
  { id: "3", name: "Chính sách", slug: "chinh-sach" },
  { id: "4", name: "Tâm lý", slug: "tam-ly" },
  { id: "5", name: "Tin tức", slug: "tin-tuc" },
];

const NewsManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "grid">("list");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredNews, setFilteredNews] = useState(mockNews);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter news based on search term, category and publish status
  const getFilteredNews = (
    news: typeof mockNews,
    search: string,
    category: string | null,
    status: string | null
  ) => {
    const term = search.trim().toLowerCase();

    return news.filter((item) => {
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.author.toLowerCase().includes(term) ||
        (item.tags &&
          item.tags.some((tag) => tag.toLowerCase().includes(term)));

      const matchesCategory = !category || item.category === category;
      const matchesStatus =
        !status ||
        (status === "published" && item.isPublished) ||
        (status === "draft" && !item.isPublished);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  // Handle search input changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle category filter changes
  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
  };

  // Handle sorting
  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);

    const sorted = [...filteredNews].sort((a, b) => {
      // Handle date sorting separately
      if (field === "publishedAt") {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return isAsc ? dateB - dateA : dateA - dateB;
      }

      const valA = a[field as keyof typeof a];
      const valB = b[field as keyof typeof b];

      if (typeof valA === "string" && typeof valB === "string") {
        return isAsc ? valB.localeCompare(valA) : valA.localeCompare(valB);
      }

      return isAsc ? Number(valB) - Number(valA) : Number(valA) - Number(valB);
    });

    setFilteredNews(sorted);
  };

  // Toggle news publish status
  const togglePublishStatus = (newsId: string, newStatus: boolean) => {
    const updatedNews = filteredNews.map((item) =>
      item.id === newsId ? { ...item, isPublished: newStatus } : item
    );
    setFilteredNews(updatedNews);

    if (selectedNews && selectedNews.id === newsId) {
      setSelectedNews({ ...selectedNews, isPublished: newStatus });
    }
  };

  // View news details
  const viewNewsDetails = (news: NewsItem) => {
    setSelectedNews(news);
    setIsViewDialogOpen(true);
  };

  // Edit news
  const editNews = (news: NewsItem) => {
    setSelectedNews(news);
    setIsEditDialogOpen(true);
  };

  // Delete news confirmation
  const confirmDeleteNews = (news: NewsItem) => {
    setSelectedNews(news);
    setIsDeleteDialogOpen(true);
  };

  // Delete news
  const deleteNews = () => {
    const updatedNews = filteredNews.filter(
      (item) => item.id !== selectedNews?.id
    );
    setFilteredNews(updatedNews);
    setIsDeleteDialogOpen(false);
  };

  // Apply filters when dependencies change
  useEffect(() => {
    const filtered = getFilteredNews(
      mockNews,
      searchTerm,
      categoryFilter,
      statusFilter
    );
    setFilteredNews(filtered);
  }, [searchTerm, categoryFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý tin tức</h1>
          <p className="text-gray-500 mt-1">
            Quản lý bài viết, danh mục và bình luận
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/80"
          onClick={() => {
            setSelectedNews({
              id: "",
              title: "",
              slug: "",
              summary: "",
              content: "",
              coverImage: "",
              author: "",
              publishedAt: new Date(),
              tags: [],
              isPublished: false,
              category: mockCategories[0].name,
            });
            setIsEditDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm bài viết
        </Button>
      </div>

      {/* Search and filters */}
      <Filters
        categoryFilter={categoryFilter}
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleCategoryFilter={handleCategoryFilter}
        setStatusFilter={setStatusFilter}
        categories={mockCategories}
      />

      {/* Empty state */}
      {filteredNews.length === 0 && (
        <EmptyFilter
          setSearchTerm={setSearchTerm}
          setStatusFilter={setCategoryFilter}
        />
      )}

      {/* News table (list view) */}
      {filteredNews.length > 0 && currentView === "list" && (
        <ListView
          filteredNews={filteredNews}
          sortField={sortField || ""}
          sortDirection={sortDirection}
          handleSort={handleSort}
          togglePublishStatus={togglePublishStatus}
          viewNewsDetails={viewNewsDetails}
          editNews={editNews}
          confirmDeleteNews={confirmDeleteNews}
        />
      )}

      {/* News grid view */}
      {filteredNews.length > 0 && currentView === "grid" && (
        <GridView
          filteredNews={filteredNews}
          togglePublishStatus={togglePublishStatus}
          viewNewsDetails={viewNewsDetails}
          editNews={editNews}
          confirmDeleteNews={confirmDeleteNews}
        />
      )}

      {/* View news details dialog */}
      {selectedNews && (
        <DetailsDialog
          isViewDialogOpen={isViewDialogOpen}
          setIsViewDialogOpen={setIsViewDialogOpen}
          selectedNews={selectedNews}
          togglePublishStatus={togglePublishStatus}
          editNews={editNews}
        />
      )}

      {/* Edit/Add news dialog */}
      {selectedNews && (
        <EditDialog
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          selectedNews={selectedNews}
          setSelectedNews={setSelectedNews}
          filteredNews={filteredNews}
          setFilteredNews={setFilteredNews}
          categories={mockCategories}
        />
      )}

      {/* Delete news confirmation dialog */}
      {selectedNews && (
        <DeleteDialog
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedNews={selectedNews}
          deleteNews={deleteNews}
        />
      )}
    </div>
  );
};

export default withAuth(NewsManagementPage, ["manager"]);
