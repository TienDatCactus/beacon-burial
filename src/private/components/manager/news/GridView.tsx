import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { NewsItem } from "@/lib/interfaces";
import { CalendarIcon, User2Icon } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

interface GridViewProps {
  filteredNews: NewsItem[];
  togglePublishStatus: (newsId: string, newStatus: boolean) => void;
  viewNewsDetails: (news: NewsItem) => void;
  editNews: (news: NewsItem) => void;
  confirmDeleteNews: (news: NewsItem) => void;
}

const GridView: FC<GridViewProps> = ({
  filteredNews,
  togglePublishStatus,
  viewNewsDetails,
  editNews,
  confirmDeleteNews,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredNews.map((news) => (
        <Card key={news.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            {news.coverImage ? (
              <Image
                width={400}
                height={200}
                src={news.coverImage}
                alt={news.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Không có hình ảnh</span>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  news.isPublished
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {news.isPublished ? "Đã đăng" : "Nháp"}
              </span>
            </div>
          </div>

          <CardHeader className="p-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg line-clamp-2">
                {news.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User2Icon className="h-3.5 w-3.5" />
                  <span>{news.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>
                    {new Date(news.publishedAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
              <div className="mt-1">
                <span className="text-xs px-2 py-1 bg-muted rounded-md">
                  {news.category}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {news.summary}
            </p>
          </CardContent>

          <CardFooter className="p-4 flex flex-wrap gap-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => viewNewsDetails(news)}
            >
              Xem
            </Button>
            <Button variant="outline" size="sm" onClick={() => editNews(news)}>
              Sửa
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => togglePublishStatus(news.id, !news.isPublished)}
            >
              {news.isPublished ? "Hủy đăng" : "Đăng"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              onClick={() => confirmDeleteNews(news)}
            >
              Xóa
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GridView;
