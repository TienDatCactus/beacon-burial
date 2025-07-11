import { Button } from "@/components/ui/button";
import { NewsItem } from "@/lib/interfaces";
import Image from "next/image";
import React, { FC } from "react";

interface ListViewProps {
  filteredNews: NewsItem[];
  sortField: string;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  togglePublishStatus: (newsId: string, newStatus: boolean) => void;
  viewNewsDetails: (news: NewsItem) => void;
  editNews: (news: NewsItem) => void;
  confirmDeleteNews: (news: NewsItem) => void;
}

const ListView: FC<ListViewProps> = ({
  filteredNews,
  sortField,
  sortDirection,
  handleSort,
  togglePublishStatus,
  viewNewsDetails,
  editNews,
  confirmDeleteNews,
}) => {
  // Helper function to render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortField === field) {
      return (
        <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>
      );
    }
    return null;
  };

  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b bg-muted/50">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Tiêu đề {renderSortIndicator("title")}
              </th>
              <th
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Danh mục {renderSortIndicator("category")}
              </th>
              <th
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer"
                onClick={() => handleSort("author")}
              >
                Tác giả {renderSortIndicator("author")}
              </th>
              <th
                className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer"
                onClick={() => handleSort("publishedAt")}
              >
                Ngày đăng {renderSortIndicator("publishedAt")}
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Trạng thái
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {filteredNews.map((news) => (
              <tr
                key={news.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    {news.coverImage && (
                      <Image
                        width={40}
                        height={40}
                        src={news.coverImage}
                        alt={news.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                    )}
                    <span className="font-medium line-clamp-1">
                      {news.title}
                    </span>
                  </div>
                </td>
                <td className="p-4 align-middle">{news.category}</td>
                <td className="p-4 align-middle">{news.author}</td>
                <td className="p-4 align-middle">
                  {new Date(news.publishedAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        news.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {news.isPublished ? "Đã đăng" : "Nháp"}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 px-2 h-7"
                      onClick={() =>
                        togglePublishStatus(news.id, !news.isPublished)
                      }
                    >
                      {news.isPublished ? "Hủy đăng" : "Đăng"}
                    </Button>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => viewNewsDetails(news)}
                    >
                      Xem
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editNews(news)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => confirmDeleteNews(news)}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
