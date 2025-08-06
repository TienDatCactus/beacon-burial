"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Product,
  ProductFormData,
  ProductListQuery,
  ProductListResponse,
  ApiResponse,
  getProductList,
  getProductById,
  addProduct,
  editProduct,
  changeProductStatus,
  adminAddProduct,
  adminEditProduct,
  adminChangeProductStatus,
  searchProducts,
  getProductsByCategory,
  getProductsByPriceRange,
  getFeaturedProducts,
} from "@/lib/api/product";
import { toast } from "sonner";

// Hook for managing product list with filters and pagination
export function useProducts(initialQuery: ProductListQuery = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [query, setQuery] = useState<ProductListQuery>(initialQuery);

  const fetchProducts = useCallback(
    async (searchQuery: ProductListQuery = {}) => {
      setLoading(true);
      setError(null);

      try {
        const result = await getProductList({ ...query, ...searchQuery });

        if (result.success && result.data) {
          setProducts(result.data.products);
          setPagination({
            currentPage: result.data.currentPage,
            totalPages: result.data.totalPages,
            totalProducts: result.data.totalProducts,
            hasNextPage: result.data.hasNextPage,
            hasPrevPage: result.data.hasPrevPage,
          });
        } else {
          setError(result.error || "Không thể tải danh sách sản phẩm");
          toast.error(result.error || "Không thể tải danh sách sản phẩm");
        }
      } catch (err) {
        const errorMessage = "Có lỗi xảy ra khi tải sản phẩm";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const searchByKeyword = useCallback(
    (keyword: string) => {
      const newQuery = { ...query, keyword, page: 1 };
      setQuery(newQuery);
      fetchProducts(newQuery);
    },
    [query, fetchProducts]
  );

  const filterByCategory = useCallback(
    (category: string) => {
      const newQuery = { ...query, category, page: 1 };
      setQuery(newQuery);
      fetchProducts(newQuery);
    },
    [query, fetchProducts]
  );

  const filterByPriceRange = useCallback(
    (priceRange: string) => {
      const newQuery = { ...query, priceRange, page: 1 };
      setQuery(newQuery);
      fetchProducts(newQuery);
    },
    [query, fetchProducts]
  );

  const goToPage = useCallback(
    (page: number) => {
      const newQuery = { ...query, page };
      setQuery(newQuery);
      fetchProducts(newQuery);
    },
    [query, fetchProducts]
  );

  const resetFilters = useCallback(() => {
    const newQuery = { page: 1 };
    setQuery(newQuery);
    fetchProducts(newQuery);
  }, [fetchProducts]);

  const refreshProducts = useCallback(() => {
    fetchProducts(query);
  }, [fetchProducts, query]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    pagination,
    query,
    searchByKeyword,
    filterByCategory,
    filterByPriceRange,
    goToPage,
    resetFilters,
    refreshProducts,
    fetchProducts,
  };
}

// Hook for managing single product operations
export function useProduct(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getProductById(id);

      if (result.success && result.data) {
        setProduct(result.data);
      } else {
        setError(result.error || "Không thể tải thông tin sản phẩm");
        toast.error(result.error || "Không thể tải thông tin sản phẩm");
      }
    } catch (err) {
      const errorMessage = "Có lỗi xảy ra khi tải sản phẩm";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  return {
    product,
    loading,
    error,
    fetchProduct,
    setProduct,
  };
}

// Hook for admin product management operations
export function useProductManagement() {
  const [loading, setLoading] = useState(false);

  const createProduct = useCallback(
    async (productData: ProductFormData): Promise<boolean> => {
      setLoading(true);
      console.log(productData);
      try {
        const result = await adminAddProduct(productData);

        if (result.success) {
          toast.success(result.message || "Thêm sản phẩm thành công");
          return true;
        } else {
          toast.error(result.error || "Thêm sản phẩm thất bại");
          return false;
        }
      } catch (err) {
        toast.error("Có lỗi xảy ra khi thêm sản phẩm");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateProduct = useCallback(
    async (
      productId: string,
      productData: ProductFormData
    ): Promise<boolean> => {
      setLoading(true);

      try {
        const result = await adminEditProduct(productId, productData);

        if (result.success) {
          toast.success(result.message || "Cập nhật sản phẩm thành công");
          return true;
        } else {
          toast.error(result.error || "Cập nhật sản phẩm thất bại");
          return false;
        }
      } catch (err) {
        toast.error("Có lỗi xảy ra khi cập nhật sản phẩm");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const toggleProductStatus = useCallback(
    async (productId: string): Promise<boolean> => {
      setLoading(true);

      try {
        const result = await adminChangeProductStatus(productId);

        if (result.success) {
          toast.success(result.message || "Thay đổi trạng thái thành công");
          return true;
        } else {
          toast.error(result.error || "Thay đổi trạng thái thất bại");
          return false;
        }
      } catch (err) {
        toast.error("Có lỗi xảy ra khi thay đổi trạng thái");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    createProduct,
    updateProduct,
    toggleProductStatus,
  };
}

// Hook for featured products
export function useFeaturedProducts(limit: number = 6) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getFeaturedProducts(limit);

      if (result.success && result.data) {
        setFeaturedProducts(result.data);
      } else {
        setError(result.error || "Không thể tải sản phẩm nổi bật");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi tải sản phẩm nổi bật");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return {
    featuredProducts,
    loading,
    error,
    refreshFeaturedProducts: fetchFeaturedProducts,
  };
}

// Hook for product categories (helper)
export function useProductCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);

    try {
      // Get all products and extract unique categories
      const result = await getProductList({ limit: 1000 }); // Get all products

      if (result.success && result.data) {
        const uniqueCategories = Array.from(
          new Set(result.data.products.map((product) => product.category))
        ).filter(Boolean);

        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    refreshCategories: fetchCategories,
  };
}

// Hook for product search with debounce
export function useProductSearch(debounceMs: number = 300) {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const performSearch = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    try {
      const result = await searchProducts(keyword);

      if (result.success && result.data) {
        setSearchResults(result.data.products);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, debounceMs, performSearch]);

  return {
    searchResults,
    loading,
    searchTerm,
    setSearchTerm,
    performSearch,
  };
}
