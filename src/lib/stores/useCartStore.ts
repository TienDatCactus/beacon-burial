"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { Cart, CartItem } from "../interfaces";
import { Product } from "../api/product";

// Extended interface for the cart store with actions
interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

// Create the cart store with persistence
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      _id: "cart",
      items: [],
      totalPrice: 0,
      totalItems: 0,
      subtotal: 0,

      addItem: (product: Product, quantity: number = 1) => {
        console.log(product, quantity);
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product._id === product._id
          );

          let updatedItems: CartItem[];

          if (existingItemIndex > -1) {
            updatedItems = state.items.map((item, index) => {
              if (index === existingItemIndex) {
                return {
                  ...item,
                  quantity: item.quantity + quantity,
                };
              }
              return item;
            });
          } else {
            updatedItems = [...state.items, { product, quantity }];
          }

          const totalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const subtotal = updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
            duration: 2000,
          });
          return {
            ...state,
            items: updatedItems,
            totalItems,
            totalPrice,
            subtotal,
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.product._id !== productId
          );

          // Calculate new totals
          const totalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          const subtotal = updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          return {
            ...state,
            items: updatedItems,
            totalItems,
            totalPrice,
            subtotal,
          };
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        // Safety check: if quantity is unreasonably high, cap it at 100
        if (quantity > 100) {
          quantity = 100;
        }

        if (quantity <= 0) {
          return get().removeItem(productId);
        }

        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.product._id === productId) {
              return {
                ...item,
                quantity,
              };
            }
            return item;
          });

          const totalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          const subtotal = updatedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          const totalPrice = subtotal;

          return {
            ...state,
            items: updatedItems,
            totalItems,
            totalPrice,
            subtotal,
          };
        });
      },

      // Clear the entire cart
      clearCart: () => {
        set({
          _id: "cart",
          items: [],
          totalPrice: 0,
          totalItems: 0,
          subtotal: 0,
        });
      },

      // Check if product is in cart
      isInCart: (productId: string) => {
        return get().items.some((item) => item.product._id === productId);
      },
    }),
    {
      name: "cart",
      version: 1,
      partialize: (state) => ({
        _id: state._id,
        items: state.items,
        subtotal: state.subtotal,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);
