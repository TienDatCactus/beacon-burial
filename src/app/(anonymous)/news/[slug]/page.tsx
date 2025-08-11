"use client";

import { Button } from "@/components/ui/button";
import { News } from "@/lib/api/news";
import { useNewsDetails } from "@/lib/hooks/useNews";
import { ArrowLeftIcon, CalendarIcon, TagIcon, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewsDetail() {
  const slug = useParams().slug as string;
  const router = useRouter();

  const { newsItem, loading, error, fetchNewsDetails, clearNewsDetails } =
    useNewsDetails();
  const [relatedNews, setRelatedNews] = useState<News[]>([]);

  // Fetch news by slug
  useEffect(() => {
    const fetchNews = async () => {
      try {
        await fetchNewsDetails(slug);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    if (slug) {
      fetchNews();
    }
    return () => {
      clearNewsDetails();
    };
  }, [slug, fetchNewsDetails, clearNewsDetails]);
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="flex items-center justify-center min-h-[25rem]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Đang tải bài viết...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Lỗi: {error}</h1>
        <Button asChild>
          <Link href="/news">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Quay lại tin tức
          </Link>
        </Button>
      </div>
    );
  }

  // Not found state
  if (!newsItem) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Không tìm thấy bài viết</h1>
        <Button asChild>
          <Link href="/news">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Quay lại tin tức
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="/news"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Quay lại tin tức
          </Link>
        </Button>
      </div>

      {/* Article header */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {newsItem.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <User2Icon className="h-4 w-4" />
            <span>{newsItem.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {new Date(
                newsItem.created_at || newsItem.publishedAt
              ).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 bg-muted rounded text-xs">
              {newsItem.category}
            </span>
          </div>
        </div>

        <div className="mb-6 text-lg text-muted-foreground">
          <p>{newsItem.summary}</p>
        </div>

        {/* Cover image */}
        {newsItem.image && (
          <div className="w-full h-64 md:h-96 mb-8">
            <Image
              width={800}
              height={400}
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Article content */}
      <div className="max-w-3xl mx-auto">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />

        {/* Tags */}
        {newsItem.tags && newsItem.tags.length > 0 && (
          <div className="flex items-start gap-2 mt-8 border-t pt-6">
            <TagIcon className="h-5 w-5 mt-1 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/news?tag=${tag}`}
                  className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related articles */}
      {relatedNews.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedNews.map((news) => (
              <Link
                key={news._id}
                href={`/news/${news.slug}`}
                className="block transition-transform hover:-translate-y-1"
              >
                <div className="border rounded-lg overflow-hidden hover:shadow-md h-full">
                  {news.image && (
                    <div className="h-40">
                      <Image
                        width={400}
                        height={200}
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {news.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
