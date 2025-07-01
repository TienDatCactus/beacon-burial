"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  Check,
  Info,
  PackageCheck,
  PackageX,
  ChartBarBig,
  LayoutGrid,
  List,
  ListFilterPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmptyFilter from "@/private/components/manager/products/EmptyFilter";
import ListView from "@/private/components/manager/products/ListView";
import GridView from "@/private/components/manager/products/GridView";

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

// Product Feature Item Component
const ProductFeatureItem = ({ feature }: { feature: string }) => {
  return (
    <div className="flex items-start gap-2 py-1">
      <div className="mt-0.5 bg-primary/10 rounded-full p-1 shrink-0">
        <Check className="h-3.5 w-3.5 text-primary" />
      </div>
      <p className="text-sm text-gray-700">{feature}</p>
    </div>
  );
};

// Empty filter component
const EmptyFilterComponent = ({
  setSearchTerm,
  setCategoryFilter,
}: {
  setSearchTerm: (term: string) => void;
  setCategoryFilter: (category: string | null) => void;
}) => {
  return (
    <div className="text-center py-12 border rounded-md bg-white">
      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Package className="h-6 w-6 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium mb-2">No products found</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        We couldn't find any products matching your filters. Try adjusting your
        search criteria.
      </p>
      <Button
        variant="outline"
        onClick={() => {
          setSearchTerm("");
          setCategoryFilter(null);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
};

const ProductManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"list" | "grid">("list");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Filter products based on search term and category
  const filterProducts = () => {
    let filtered = [...mockProducts];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    setFilteredProducts(filtered);
  };

  // Handle search input changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle category filter changes
  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
  };

  // Handle sorting
  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);

    const sorted = [...filteredProducts].sort((a, b) => {
      const valA = a[field as keyof typeof a];
      const valB = b[field as keyof typeof b];

      if (typeof valA === "string" && typeof valB === "string") {
        return isAsc ? valB.localeCompare(valA) : valA.localeCompare(valB);
      }

      return isAsc ? Number(valB) - Number(valA) : Number(valA) - Number(valB);
    });

    setFilteredProducts(sorted);
  };

  // Toggle product status
  const toggleStatus = (productId: string, newStatus: string) => {
    const updatedProducts = filteredProducts.map((product) =>
      product.id === productId ? { ...product, status: newStatus } : product
    );
    setFilteredProducts(updatedProducts);

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct({ ...selectedProduct, status: newStatus });
    }
  };

  // View product details
  const viewProductDetails = (product: any) => {
    setSelectedProduct(product);
    setIsViewDialogOpen(true);
  };

  // Edit product
  const editProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  // Delete product confirmation
  const confirmDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Delete product
  const deleteProduct = () => {
    const updatedProducts = filteredProducts.filter(
      (product) => product.id !== selectedProduct?.id
    );
    setFilteredProducts(updatedProducts);
    setIsDeleteDialogOpen(false);
  };

  // Apply filters when dependencies change
  React.useEffect(() => {
    filterProducts();
  }, [searchTerm, categoryFilter]);

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
          onClick={() => {
            setSelectedProduct({
              id: "",
              name: "",
              slug: "",
              sku: "",
              price: 0,
              status: "active",
              image: "",
              category: "Flowers",
              description: "",
              stock: 0,
              features: [""],
              popularityScore: 0,
              isFeatured: false,
            });
            setIsEditDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Tìm kiếm sản phẩm theo tên, SKU hoặc mô tả..."
            className="pl-10 bg-primary/10 placeholder:text-gray-500 focus:bg-primary/20"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ListFilterPlus />
                {categoryFilter ? categoryFilter : "Tất cả danh mục"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleCategoryFilter(null)}>
                Tất cả danh mục
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryFilter("Flowers")}>
                Hoa
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCategoryFilter("Memorials")}
              >
                Tưởng niệm
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryFilter("Urns")}>
                Bình tro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryFilter("Caskets")}>
                Quan tài
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ChartBarBig />
                Trạng thái
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleCategoryFilter(null)}>
                Tất cả trạng thái
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const active = filteredProducts.filter(
                    (p) => p.status === "active"
                  );
                  setFilteredProducts(active);
                }}
              >
                Chỉ hoạt động
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const inactive = filteredProducts.filter(
                    (p) => p.status === "inactive"
                  );
                  setFilteredProducts(inactive);
                }}
              >
                Chỉ không hoạt động
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentView(currentView === "list" ? "grid" : "list")
            }
            title={
              currentView === "list"
                ? "Chuyển sang Chế độ xem lưới"
                : "Chuyển sang Chế độ xem danh sách"
            }
          >
            {currentView === "list" ? <LayoutGrid /> : <List />}
          </Button>
        </div>
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <EmptyFilterComponent
          setSearchTerm={setSearchTerm}
          setCategoryFilter={setCategoryFilter}
        />
      )}

      {/* Products table (list view) */}
      {filteredProducts.length > 0 && currentView === "list" && (
        <ListView
          filteredProducts={filteredProducts}
          sortField={sortField || ""}
          sortDirection={sortDirection}
          handleSort={handleSort}
          toggleStatus={toggleStatus}
          viewProductDetails={viewProductDetails}
          editProduct={editProduct}
          confirmDeleteProduct={confirmDeleteProduct}
        />
      )}

      {/* Products grid view */}
      {filteredProducts.length > 0 && currentView === "grid" && (
        <GridView
          filteredProducts={filteredProducts}
          toggleStatus={toggleStatus}
        />
      )}

      {/* View product details dialog */}
      {selectedProduct && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
              <DialogDescription>
                Detailed information for this product.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="relative aspect-square rounded-md overflow-hidden bg-gray-100 mb-4">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      className={
                        selectedProduct.status === "active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-amber-100 text-amber-800 border-amber-200"
                      }
                    >
                      {selectedProduct.status === "active"
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Category
                    </h3>
                    <p>{selectedProduct.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                    <p>{selectedProduct.sku}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Stock</h3>
                    <p>{selectedProduct.stock} units</p>
                  </div>
                  {selectedProduct.popularityScore && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Popularity
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${selectedProduct.popularityScore}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm">
                          {selectedProduct.popularityScore}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-medium text-primary">
                      ${selectedProduct.price}
                    </span>
                    {selectedProduct.isFeatured && (
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Description
                  </h3>
                  <p className="text-gray-700">{selectedProduct.description}</p>
                </div>

                {selectedProduct.features &&
                  selectedProduct.features.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">
                        Features
                      </h3>
                      <div className="space-y-1 mt-2">
                        {selectedProduct.features.map(
                          (feature: string, index: number) => (
                            <ProductFeatureItem key={index} feature={feature} />
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => {
                  setIsViewDialogOpen(false);
                  editProduct(selectedProduct);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Product
              </Button>
              <Button
                variant={
                  selectedProduct.status === "active"
                    ? "destructive"
                    : "default"
                }
                onClick={() => {
                  toggleStatus(
                    selectedProduct.id,
                    selectedProduct.status === "active" ? "inactive" : "active"
                  );
                }}
              >
                {selectedProduct.status === "active" ? (
                  <>
                    <PackageX className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <PackageCheck className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit/Add product dialog */}
      {selectedProduct && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct.id ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                {selectedProduct.id
                  ? "Update the product details below."
                  : "Fill in the product details to create a new product."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={selectedProduct.name}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        name: e.target.value,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^\w\-]+/g, ""),
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={selectedProduct.sku}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        sku: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={selectedProduct.stock}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedProduct.category}
                    onValueChange={(value) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Flowers">Flowers</SelectItem>
                      <SelectItem value="Memorials">Memorials</SelectItem>
                      <SelectItem value="Urns">Urns</SelectItem>
                      <SelectItem value="Caskets">Caskets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={selectedProduct.status}
                    onValueChange={(value) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={selectedProduct.isFeatured}
                    onCheckedChange={(checked) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        isFeatured: checked,
                      })
                    }
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>

                <div>
                  <Label htmlFor="popularity">Popularity Score (0-100)</Label>
                  <Input
                    id="popularity"
                    type="number"
                    min="0"
                    max="100"
                    value={selectedProduct.popularityScore}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        popularityScore: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={selectedProduct.image}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                  {selectedProduct.image && (
                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={selectedProduct.image}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={selectedProduct.description}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Features</Label>
                  <div className="space-y-2 mt-2">
                    {selectedProduct.features.map(
                      (feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const updatedFeatures = [
                                ...selectedProduct.features,
                              ];
                              updatedFeatures[index] = e.target.value;
                              setSelectedProduct({
                                ...selectedProduct,
                                features: updatedFeatures,
                              });
                            }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updatedFeatures =
                                selectedProduct.features.filter(
                                  (_: string, i: number) => i !== index
                                );
                              setSelectedProduct({
                                ...selectedProduct,
                                features: updatedFeatures,
                              });
                            }}
                            disabled={selectedProduct.features.length <= 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setSelectedProduct({
                          ...selectedProduct,
                          features: [...selectedProduct.features, ""],
                        });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Feature
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedProduct.id) {
                    // Update existing product
                    const updatedProducts = filteredProducts.map((product) =>
                      product.id === selectedProduct.id
                        ? selectedProduct
                        : product
                    );
                    setFilteredProducts(updatedProducts);
                  } else {
                    // Add new product
                    const newProduct = {
                      ...selectedProduct,
                      id: `${Math.floor(Math.random() * 1000)}`,
                    };
                    setFilteredProducts([...filteredProducts, newProduct]);
                  }
                  setIsEditDialogOpen(false);
                }}
              >
                {selectedProduct.id ? "Save Changes" : "Add Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete product confirmation dialog */}
      {selectedProduct && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center p-4 bg-gray-50 rounded-md border">
              <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100 mr-4">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{selectedProduct.name}</h4>
                <p className="text-sm text-gray-500">{selectedProduct.sku}</p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={deleteProduct}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductManagementPage;
