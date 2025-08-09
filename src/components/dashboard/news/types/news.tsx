export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  category: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  tags: string[];
  views?: number;
}

export interface CreateNewsDto {
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  category: string;
  isPublished: boolean;
  publishedAt?: Date;
  author: string;
  tags: string[];
}

export interface NewsCategory {
  value: string;
  label: string;
  color: string;
}