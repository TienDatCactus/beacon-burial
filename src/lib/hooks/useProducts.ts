"use client";

import {
  adminAddProduct,
  adminChangeProductStatus,
  adminEditProduct,
  getFeaturedProducts,
  getProductById,
  getProductList,
  Product,
  ProductFormData,
  ProductListQuery,
  searchProducts,
} from "@/lib/api/product";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// Hook for managing product list with filters and pagination
export function useProducts(initialQuery: ProductListQuery = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 1,
  });
  const [query, setQuery] = useState<ProductListQuery>(initialQuery);

  const fetchProducts = async (searchQuery: ProductListQuery = {}) => {
    setLoading(true);
    setError(null);
    try {
      const finalQuery = { ...query, ...searchQuery };
      const result = await getProductList(finalQuery);

      if (result.success && result.data) {
        setProducts(result.data.products);
        setPagination({
          currentPage: result.data.currentPage,
          totalPages: result.data.totalPages,
          totalResults: result.data.totalProducts,
        });
        // Update query state only if search was successful
        setQuery(finalQuery);
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
  };
  // Stable search function that doesn't change on every render
  const searchProducts = useCallback(
    async (searchQuery: ProductListQuery) => {
      setLoading(true);
      setError(null);

      try {
        const result = await getProductList(searchQuery);

        if (result.success && result.data) {
          setProducts(result.data.products);
          setPagination({
            currentPage: result.data.currentPage,
            totalPages: result.data.totalPages,
            totalResults: result.data.totalProducts,
          });
          setQuery(searchQuery);
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
    [] // No dependencies to make it stable
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
    const resetQuery = { ...initialQuery, page: 1 };
    setQuery(resetQuery);
    fetchProducts(resetQuery);
  }, [fetchProducts, initialQuery]);

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
    searchProducts, // Add the stable search function
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
        console.log("cac" + JSON.stringify(result.data, null, 2));
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
      try {
        const result = await adminAddProduct(productData);

        if (result.success) {
          toast.success(result.message);
          return true;
        } else {
          toast.error(result.error);
          return false;
        }
      } catch (err) {
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
