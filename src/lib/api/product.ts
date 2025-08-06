import { fetchWithAuth } from "../hooks/useFetch";

// Types for product based on sample data
export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string[]; // Array of image URLs
  description: string;
  category: string;
  status: "active" | "inactive";
  quantity: number;
  isFeatured: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  isFeatured?: boolean;
  status: "active" | "inactive";
  images?: File[]; // For file uploads (max 5 images)
}

export interface ProductListQuery {
  keyword?: string;
  category?: string;
  priceRange?: string; // Format: "min-max" e.g., "1000-3000"
  page?: number;
  limit?: number;
}

export interface ProductListResponse {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Helper function to create FormData for file uploads
function createProductFormData(productData: ProductFormData): FormData {
  const formData = new FormData();

  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price.toString());
  formData.append("category", productData.category);
  formData.append("quantity", productData.quantity.toString());
  formData.append("status", productData.status.toString());

  if (productData.isFeatured !== undefined) {
    formData.append("isFeatured", productData.isFeatured.toString());
  }

  // Handle images (max 5 images)
  if (productData.images && productData.images.length > 0) {
    const imagesToUpload = productData.images.slice(0, 5); // Limit to 5 images
    imagesToUpload.forEach((image) => {
      formData.append("images", image);
    });
  }

  return formData;
}

/**
 * Add new product (Admin only)
 * POST /api/product/add
 */
export async function addProduct(
  productData: ProductFormData
): Promise<ApiResponse<Product>> {
  try {
    const formData = createProductFormData(productData);

    const response = await fetchWithAuth(`/product/add`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Thêm sản phẩm thất bại",
      };
    }

    return {
      success: true,
      data: data.product || data,
      message: "Thêm sản phẩm thành công",
    };
  } catch (error) {
    console.error("Add product error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi thêm sản phẩm",
    };
  }
}

/**
 * Edit product (Admin only)
 * PUT /api/product/edit/:id
 */
export async function editProduct(
  productId: string,
  productData: ProductFormData
): Promise<ApiResponse<Product>> {
  try {
    const formData = createProductFormData(productData);

    const response = await fetchWithAuth(`/product/edit/${productId}`, {
      method: "PUT",

      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Chỉnh sửa sản phẩm thất bại",
      };
    }

    return {
      success: true,
      data: data.product || data,
      message: "Chỉnh sửa sản phẩm thành công",
    };
  } catch (error) {
    console.error("Edit product error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi chỉnh sửa sản phẩm",
    };
  }
}

/**
 * Change product status (Admin only)
 * PATCH /api/product/changeStatus/:id
 */
export async function changeProductStatus(
  productId: string
): Promise<ApiResponse<Product>> {
  try {
    const response = await fetchWithAuth(`/product/changeStatus/${productId}`, {
      method: "PATCH",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Thay đổi trạng thái sản phẩm thất bại",
      };
    }

    const newStatus = data.product?.status || data.status;
    const statusMessage = newStatus === "active" ? "kích hoạt" : "vô hiệu hóa";

    return {
      success: true,
      data: data.product || data,
      message: `Sản phẩm đã được ${statusMessage}`,
    };
  } catch (error) {
    console.error("Change product status error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi thay đổi trạng thái sản phẩm",
    };
  }
}

/**
 * Get product list with search, filter, and pagination
 * GET /api/product?keyword=value&category=value&priceRange=min-max&page=1
 */
export async function getProductList(
  query: ProductListQuery = {}
): Promise<ApiResponse<ProductListResponse>> {
  try {
    const searchParams = new URLSearchParams();

    // Add query parameters
    if (query.keyword) {
      searchParams.append("keyword", query.keyword);
    }
    if (query.category) {
      searchParams.append("category", query.category);
    }
    if (query.priceRange) {
      searchParams.append("priceRange", query.priceRange);
    }
    if (query.page) {
      searchParams.append("page", query.page.toString());
    }
    if (query.limit) {
      searchParams.append("limit", query.limit.toString());
    }

    const url = `/product?${searchParams.toString()}`;

    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Lấy danh sách sản phẩm thất bại",
      };
    }

    return {
      success: true,
      data: {
        products: data.products || data.data || [],
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || query.page || 1,
        totalProducts: data.totalProducts || data.total || 0,
        hasNextPage: data.hasNextPage || false,
        hasPrevPage: data.hasPrevPage || false,
      },
      message: "Lấy danh sách sản phẩm thành công",
    };
  } catch (error) {
    console.error("Get product list error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi lấy danh sách sản phẩm",
    };
  }
}

/**
 * Get single product by ID
 * GET /api/product/:id
 */
export async function getProductById(
  productId: string
): Promise<ApiResponse<Product>> {
  try {
    const response = await fetchWithAuth(`/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Lấy thông tin sản phẩm thất bại",
      };
    }

    return {
      success: true,
      data: data.product || data,
      message: "Lấy thông tin sản phẩm thành công",
    };
  } catch (error) {
    console.error("Get product by ID error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi lấy thông tin sản phẩm",
    };
  }
}

/**
 * Get products by category
 */
function getProductsByCategory(
  category: string,
  page: number = 1,
  limit: number = 9
): Promise<ApiResponse<ProductListResponse>> {
  return getProductList({ category, page, limit });
}

/**
 * Search products by keyword
 */
function searchProducts(
  keyword: string,
  page: number = 1,
  limit: number = 9
): Promise<ApiResponse<ProductListResponse>> {
  return getProductList({ keyword, page, limit });
}

/**
 * Get products by price range
 */
function getProductsByPriceRange(
  minPrice: number,
  maxPrice: number,
  page: number = 1,
  limit: number = 9
): Promise<ApiResponse<ProductListResponse>> {
  const priceRange = `${minPrice}-${maxPrice}`;
  return getProductList({ priceRange, page, limit });
}

/**
 * Get featured products
 */
async function getFeaturedProducts(
  limit: number = 6
): Promise<ApiResponse<Product[]>> {
  try {
    const result = await getProductList({ limit });
    if (result.success && result.data) {
      const featuredProducts = result.data.products.filter(
        (product) => product.isFeatured
      );
      return {
        success: true,
        data: featuredProducts,
        message: "Lấy sản phẩm nổi bật thành công",
      };
    }
    return {
      success: false,
      error: result.error || "Không thể lấy sản phẩm nổi bật",
    };
  } catch (error) {
    console.error("Get featured products error:", error);
    return {
      success: false,
      error: "Có lỗi xảy ra khi lấy sản phẩm nổi bật",
    };
  }
}

// Helper functions for admin authentication
export async function adminAction<T>(
  action: () => Promise<ApiResponse<T>>,
  actionName: string
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return {
        success: false,
        error: "Bạn cần đăng nhập với quyền admin để thực hiện hành động này",
      };
    }

    return await action();
  } catch (error) {
    console.error(`${actionName} error:`, error);
    return {
      success: false,
      error: `Có lỗi xảy ra khi ${actionName.toLowerCase()}`,
    };
  }
}

// Wrapper functions for admin actions with authentication check
export const adminAddProduct = (productData: ProductFormData) =>
  adminAction(() => addProduct(productData), "Thêm sản phẩm");

export const adminEditProduct = (
  productId: string,
  productData: ProductFormData
) =>
  adminAction(() => editProduct(productId, productData), "Chỉnh sửa sản phẩm");

export const adminChangeProductStatus = (productId: string) =>
  adminAction(
    () => changeProductStatus(productId),
    "Thay đổi trạng thái sản phẩm"
  );

// Export convenience functions
export {
  getProductList as getProducts,
  getProductById as getProduct,
  getProductsByCategory,
  searchProducts,
  getProductsByPriceRange,
  getFeaturedProducts,
};
