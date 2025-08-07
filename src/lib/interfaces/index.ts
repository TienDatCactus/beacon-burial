import { Product } from "../api/product";

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
