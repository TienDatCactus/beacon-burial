export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  isPublished: boolean;
  category: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
}

export interface NewsComment {
  id: string;
  newsId: string;
  author: string;
  email: string;
  content: string;
  createdAt: Date;
  isApproved: boolean;
}
