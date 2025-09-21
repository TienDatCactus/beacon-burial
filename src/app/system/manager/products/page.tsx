"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/api/product";
import { useProductManagement, useProducts } from "@/lib/hooks/useProducts";
import { categories } from "@/lib/interfaces";
import DetailsDialog from "@/private/components/manager/products/DetailsDialog";
import EditDialog from "@/private/components/manager/products/EditDialog";
import Filters from "@/private/components/manager/products/Filters";
import GridView from "@/private/components/manager/products/GridView";
import ListView from "@/private/components/manager/products/ListView";
import EmptyFilter from "@/shared/components/state/EmptyFilter";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import withAuth from "./../../../../lib/hooks/useWithAuth";

const ProductManagementPage: React.FC = () => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    pagination,
    searchByKeyword,
    filterByCategory,
    goToPage,
    refreshProducts,
  } = useProducts({ limit: 9 });
  const { toggleProductStatus } = useProductManagement();

  // Local state for UI management
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "grid">("list");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    console.log("data products", products);
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchByKeyword(searchTerm.trim());
      } else if (searchTerm === "") {
        searchByKeyword("");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle status filter
  const handleStatusFilter = (status: string | null) => {
    if (status) {
      setFilteredProducts(
        products.filter((product) => product.status === status)
      );
    } else {
      setFilteredProducts(products);
    }
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
        loading={productsLoading}
        setCurrentView={setCurrentView}
        searchTerm={searchTerm}
        setCategoryFilter={setCategoryFilter}
        setFilteredProducts={setFilteredProducts}
        setSearchTerm={setSearchTerm}
        filterByCategory={filterByCategory}
        handleStatusFilter={handleStatusFilter}
      />

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <EmptyFilter
          error={productsError ? productsError : ""}
          setSearchTerm={setSearchTerm}
          setStatusFilter={setCategoryFilter}
        />
      )}

      {/* Products table (list view) */}
      {filteredProducts.length > 0 && currentView === "list" && (
        <ListView
          filteredProducts={filteredProducts}
          toggleStatus={handleToggleStatus}
          viewProductDetails={viewProductDetails}
          editProduct={editProduct}
          confirmDeleteProduct={confirmDeleteProduct}
          pagination={pagination}
          goToPage={goToPage}
        />
      )}

      {/* Products grid view */}
      {filteredProducts.length > 0 && currentView === "grid" && (
        <GridView
          filteredProducts={filteredProducts}
          toggleStatus={handleToggleStatus}
          pagination={pagination}
          goToPage={goToPage}
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
        />
      )}
    </div>
  );
};

export default withAuth(ProductManagementPage, ["admin"]);
