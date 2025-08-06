"use client";

import { Button } from "@/components/ui/button";
import DeleteDialog from "@/private/components/manager/products/DeleteDialog";
import DetailsDialog from "@/private/components/manager/products/DetailsDialog";
import EditDialog from "@/private/components/manager/products/EditDialog";
import Filters from "@/private/components/manager/products/Filters";
import GridView from "@/private/components/manager/products/GridView";
import ListView from "@/private/components/manager/products/ListView";
import EmptyFilter from "@/shared/components/state/EmptyFilter";
import {
  useProducts,
  useProductManagement,
  useProductCategories,
} from "@/lib/hooks/useProducts";
import { Product } from "@/lib/api/product";
import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import withAuth from "./../../../../lib/hooks/useWithAuth";

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Traditional Arrangement",
    slug: "traditional-arrangement",
    sku: "FL001",
    price: 165,
    status: "active",
    image: "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
    category: "Flowers",
    description:
      "A beautiful traditional flower arrangement, perfect for memorial services with elegant white lilies and soft greenery.",
    stock: 25,
    features: [
      "Fresh seasonal flowers",
      "Artistically arranged",
      "Long-lasting blooms",
      "Includes display vase",
    ],
    popularityScore: 85,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Pink & Lilac Bouquet",
    slug: "pink-lilac-bouquet",
    sku: "FL002",
    price: 155,
    status: "active",
    image: "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
    category: "Flowers",
    description:
      "Delicate bouquet featuring pink and lilac flowers, creating a gentle and comforting arrangement for memorial displays.",
    stock: 18,
    features: [
      "Handcrafted arrangement",
      "Premium flowers",
      "Satin ribbon wrap",
      "Card included",
    ],
    popularityScore: 76,
    isFeatured: false,
  },
  {
    id: "3",
    name: "Rose and Freesia Bouquet",
    slug: "rose-and-freesia-bouquet",
    sku: "FL003",
    price: 145,
    status: "inactive",
    image: "/images/image-45-840x840.jpg",
    category: "Flowers",
    description:
      "Elegant combination of roses and freesia flowers, offering a fragrant and visually stunning tribute arrangement.",
    stock: 0,
    features: [
      "Fragrant blooms",
      "Classic design",
      "Premium roses",
      "Elegant presentation",
    ],
    popularityScore: 68,
    isFeatured: false,
  },
  {
    id: "4",
    name: "White Rose Bouquet",
    slug: "white-rose-bouquet",
    sku: "FL004",
    price: 145,
    status: "active",
    image: "/images/image-10.jpg",
    category: "Flowers",
    description:
      "Classic white rose bouquet symbolizing remembrance, purity, and respect - perfect for funeral services.",
    stock: 32,
    features: [
      "Premium white roses",
      "Elegant simplicity",
      "Symbol of remembrance",
      "Handcrafted with care",
    ],
    popularityScore: 92,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Memorial Tribute",
    slug: "memorial-tribute",
    sku: "MT001",
    price: 175,
    status: "active",
    image: "/images/image-10.jpg",
    category: "Memorials",
    description:
      "A specially designed memorial tribute with a mix of premium flowers arranged to honor and celebrate life.",
    stock: 12,
    features: [
      "Custom designed tribute",
      "Premium flower selection",
      "Suitable for display stands",
      "Personalization available",
    ],
    popularityScore: 88,
    isFeatured: false,
  },
];

const ProductManagementPage: React.FC = () => {
  // Custom hooks for API integration
  const {
    products,
    loading: productsLoading,
    error: productsError,
    pagination,
    searchByKeyword,
    filterByCategory,
    goToPage,
    resetFilters,
    refreshProducts,
  } = useProducts({ limit: 9 }); // 9 products per page as specified

  const {
    loading: managementLoading,
    createProduct,
    updateProduct,
    toggleProductStatus,
  } = useProductManagement();

  const { categories } = useProductCategories();

  // Local state for UI management
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "grid">("list");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Update filtered products when products change
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Handle search input changes with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchByKeyword(searchTerm.trim());
      } else if (searchTerm === "") {
        refreshProducts();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchByKeyword, refreshProducts]);

  // Handle search input changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle category filter changes
  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
    if (category) {
      filterByCategory(category);
    } else {
      refreshProducts();
    }
  };

  // Handle status filter
  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    // Note: The API doesn't seem to support status filtering directly
    // We'll filter on the frontend for now
    if (status) {
      setFilteredProducts(
        products.filter((product) => product.status === status)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);

    const sorted = [...filteredProducts].sort((a, b) => {
      const valA = a[field as keyof Product];
      const valB = b[field as keyof Product];

      if (typeof valA === "string" && typeof valB === "string") {
        return isAsc ? valB.localeCompare(valA) : valA.localeCompare(valB);
      }

      return isAsc ? Number(valB) - Number(valA) : Number(valA) - Number(valB);
    });

    setFilteredProducts(sorted);
  };

  // Toggle product status using API
  const handleToggleStatus = async (
    productId: string,
    currentStatus: string
  ) => {
    console.log(
      `Toggling status for product ${productId} from ${currentStatus}`
    );
    const success = await toggleProductStatus(productId);
    if (success) {
      refreshProducts(); // Refresh the products list
    }
  };

  // View product details
  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };

  // Edit product
  const editProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  // Delete product confirmation
  const confirmDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const deleteProduct = async () => {
    toast.error("Tính năng xóa sản phẩm chưa được hỗ trợ bởi API");
    setIsDeleteDialogOpen(false);
  };

  // Create new product
  const handleCreateProduct = () => {
    const newProduct: Partial<Product> = {
      _id: "",
      name: "",
      slug: "",
      price: 0,
      status: "active",
      image: [],
      category: categories[0] || "",
      description: "",
      quantity: 0,
      isFeatured: false,
    };
    setSelectedProduct(newProduct as Product);
    setIsEditDialogOpen(true);
  };

  // Handle save product (create or update)
  const handleSaveProduct = async (productData: any, isEdit: boolean) => {
    let success = false;
    if (isEdit && selectedProduct?._id) {
      success = await updateProduct(selectedProduct._id, productData);
    } else {
      success = await createProduct(productData);
    }

    if (success) {
      setIsEditDialogOpen(false);
      refreshProducts(); // Refresh the products list
    }

    return success;
  };

  // Show loading state
  if (productsLoading && filteredProducts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-500">Đang tải sản phẩm...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (productsError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-500">{productsError}</p>
            <Button
              onClick={refreshProducts}
              className="mt-4"
              variant="outline"
            >
              Thử lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý sản phẩm
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý sản phẩm, giá cả và tồn kho
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/80"
          onClick={handleCreateProduct}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      {/* Search and filters */}
      <Filters
        categoryFilter={categoryFilter}
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleCategoryFilter={handleCategoryFilter}
        setStatusFilter={setStatusFilter}
      />
      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <EmptyFilter
          setSearchTerm={setSearchTerm}
          setStatusFilter={setCategoryFilter}
        />
      )}

      {/* Products table (list view) */}
      {filteredProducts.length > 0 && currentView === "list" && (
        <ListView
          filteredProducts={filteredProducts}
          sortField={sortField || ""}
          sortDirection={sortDirection}
          handleSort={handleSort}
          toggleStatus={handleToggleStatus}
          viewProductDetails={viewProductDetails}
          editProduct={editProduct}
          confirmDeleteProduct={confirmDeleteProduct}
        />
      )}

      {/* Products grid view */}
      {filteredProducts.length > 0 && currentView === "grid" && (
        <GridView
          filteredProducts={filteredProducts}
          toggleStatus={handleToggleStatus}
        />
      )}

      {/* View product details dialog */}
      {selectedProduct && (
        <DetailsDialog
          editProduct={editProduct}
          isViewDialogOpen={isViewDialogOpen}
          setIsViewDialogOpen={setIsViewDialogOpen}
          selectedProduct={selectedProduct}
          toggleStatus={handleToggleStatus}
        />
      )}

      {/* Edit/Add product dialog */}
      {selectedProduct && (
        <EditDialog
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          handleSaveProduct={handleSaveProduct}
        />
      )}

      {/* Delete product confirmation dialog */}
      {selectedProduct && (
        <DeleteDialog
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedProduct={selectedProduct}
          deleteProduct={deleteProduct}
        />
      )}
    </div>
  );
};

export default withAuth(ProductManagementPage, ["admin"]);
