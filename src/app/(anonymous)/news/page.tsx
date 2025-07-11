"use client";

import { NewsItem } from "@/lib/interfaces";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, SearchIcon, TagIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
];

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredNews, setFilteredNews] = useState(mockNews);
  const categories = Array.from(new Set(mockNews.map((news) => news.category)));

  const filterNews = (search: string, category: string | null) => {
    return mockNews.filter((news) => {
      const matchesSearch =
        !search ||
        news.title.toLowerCase().includes(search.toLowerCase()) ||
        news.summary.toLowerCase().includes(search.toLowerCase()) ||
        news.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      const matchesCategory = !category || news.category === category;

      return matchesSearch && matchesCategory && news.isPublished;
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredNews(filterNews(value, activeCategory));
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    setFilteredNews(filterNews(searchTerm, newCategory));
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

      {/* News grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <Link
            key={news.id}
            href={`/news/${news.slug}`}
            className="block transition-transform hover:-translate-y-1"
          >
            <Card className="h-full overflow-hidden hover:shadow-md">
              <div className="relative h-48 w-full">
                {news.coverImage && (
                  <Image
                    width={400}
                    height={200}
                    src={news.coverImage}
                    alt={news.title}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 text-xs bg-white/80 backdrop-blur-sm rounded-md">
                    {news.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {news.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {news.summary}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mt-auto justify-between">
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
                {news.tags && news.tags.length > 0 && (
                  <div className="flex items-start gap-1 mt-3">
                    <TagIcon className="h-3.5 w-3.5 mt-1 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {news.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-0.5 bg-muted rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {news.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{news.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filteredNews.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            Không tìm thấy bài viết nào phù hợp
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setActiveCategory(null);
              setFilteredNews(mockNews);
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
