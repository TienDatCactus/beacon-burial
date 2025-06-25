export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
  category?: string;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
}
