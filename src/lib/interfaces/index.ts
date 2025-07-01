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
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface Cart {
  _id: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  subtotal?: number;
}
export interface CartItem {
  _id?: string;
  product: Product;
  quantity: number;
}

export type Service = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  status: "active" | "inactive";
  rating?: number;
  stock?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
};
