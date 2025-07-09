"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import withAuth from "@/lib/hooks/useWithAuth";
import DeleteService from "@/private/components/manager/services/DeleteService";
import DetailDialog from "@/private/components/manager/services/DetailDialog";
import EditService from "@/private/components/manager/services/EditService";
import GridView from "@/private/components/manager/services/GridView";
import TableView from "@/private/components/manager/services/TableView";
import EmptyFilter from "@/shared/components/state/EmptyFilter";
import {
  ChartBarBig,
  Check,
  LayoutGrid,
  List,
  ListFilterPlus,
  Plus,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const mockServices = [
  {
    id: "1",
    name: "Hằng Sống Premium Package",
    price: 129000000,
    status: "active",
    image: "/images/image-45-840x840.jpg",
    category: "Premium",
    description:
      "Complete premium funeral service package with high-quality coffin, ceremony setup, and transportation - inspired by Catholic traditions",
    inclusions: [
      {
        name: "Premium Coffin",
        description:
          "Rutherford model coffin with Pacific cedar wood and deluxe interior",
      },
      {
        name: "Ceremony Setup",
        description:
          "3 tent covers with vintage lamps, 8 standard table & chair sets or 2 tent covers with 4 Tiffany luxury chair sets",
      },
      {
        name: "Staff Service",
        description:
          "2 funeral service staff (8:00-20:00): Arranging furniture, guiding guests, maintaining memorial space",
      },
      {
        name: "Memorial Space Decoration",
        description:
          "6 different flower types in artistic Peony Glory arrangement, ~50m2 Hanoi silk curtains, Saint name board, Easter candle",
      },
      {
        name: "Funeral Vehicles",
        description:
          "1 lead car, 1 Ford Transit hearse, 1 passenger bus (45 seats)",
      },
      {
        name: "Ceremonial Items",
        description:
          "Memorial portrait, prayer cards, funeral notice, incense, candles, guest registry",
      },
      {
        name: "Mourning Clothes",
        description:
          "15 sets of black shirts or traditional fabric mourning clothes with mourning headbands",
      },
      {
        name: "Guest Reception",
        description:
          "4 packs of confectionery, 3kg sunflower seeds, 200 tissues, 200 envelopes, 10 boxes of water",
      },
    ],
    popularityScore: 85,
  },
  {
    id: "2",
    name: "Ánh Sáng Special Package",
    price: 235000000,
    status: "active",
    image: "/images/image-7-pist9h4b63nhjv2vay2lfsj3kyn0pwhy8idbbim086.jpg",
    category: "Premium",
    description:
      "Exclusive luxury funeral service package with premium offerings and personalized arrangements for 200-300 guests",
    inclusions: [
      {
        name: "Luxury Coffin",
        description:
          "Premium imported wood coffin with hand-crafted details and silk interior",
      },
      {
        name: "Ceremony Setup",
        description:
          "4 premium tent covers with crystal chandeliers, 10 luxury table & chair sets with premium linens",
      },
      {
        name: "Staff Service",
        description:
          "4 professional funeral service staff (24-hour service), 1 dedicated ceremony director",
      },
      {
        name: "Memorial Space Decoration",
        description:
          "Premium imported flower arrangements, custom backdrop, mood lighting, and premium curtains",
      },
      {
        name: "Funeral Vehicles",
        description:
          "2 lead cars, 1 premium Mercedes hearse, 2 premium passenger buses with refreshments",
      },
      {
        name: "Ceremonial Items",
        description:
          "Professional portrait by artist, custom prayer books, personalized announcements, premium incense",
      },
      {
        name: "Mourning Clothes",
        description:
          "25 sets of premium mourning attire with accessories for close family members",
      },
      {
        name: "Guest Reception",
        description:
          "Full professional catering service, premium refreshments, custom memorial tokens for 300 guests",
      },
    ],
    popularityScore: 72,
  },
  {
    id: "3",
    name: "Hồng Ân Basic Package",
    price: 87000000,
    status: "active",
    image: "/images/image-9-pist9h4brl9fb6a1imhxr4xsqxo5cqvbwpn4fqxahy.jpg",
    category: "Basic",
    description:
      "Essential funeral services with all necessary arrangements for a dignified ceremony - ideal for families with 100 guests",
    inclusions: [
      {
        name: "Standard Coffin",
        description: "Quality engineered wood coffin with satin interior",
      },
      {
        name: "Ceremony Setup",
        description: "2 tent covers, 6 standard table & chair sets",
      },
      {
        name: "Staff Service",
        description: "1 funeral service staff (8:00-17:00)",
      },
      {
        name: "Memorial Space Decoration",
        description: "Basic flower arrangements with standard varieties",
      },
      {
        name: "Funeral Vehicles",
        description: "1 standard hearse, 1 passenger van (16 seats)",
      },
      {
        name: "Ceremonial Items",
        description:
          "Standard portrait frame, prayer cards, basic funeral notice",
      },
      {
        name: "Mourning Clothes",
        description: "10 sets of standard mourning clothes",
      },
      {
        name: "Guest Reception",
        description: "Basic refreshments, tissues and envelopes for 100 guests",
      },
    ],
    popularityScore: 92,
  },
  {
    id: "4",
    name: "Thiên Đàng Custom Design Package",
    price: 350000000,
    status: "inactive",
    image: "/images/image-10.jpg",
    category: "Premium",
    description:
      "Fully customized premium funeral service with exclusive options and personalized arrangements according to family wishes",
    inclusions: [
      {
        name: "Custom Coffin",
        description:
          "Bespoke coffin design with premium materials of your choice",
      },
      {
        name: "Ceremony Setup",
        description:
          "Custom venue setup according to family preferences and religious requirements",
      },
      {
        name: "Staff Service",
        description:
          "Full team of professional staff with 24/7 support and dedicated coordinator",
      },
      {
        name: "Memorial Space Decoration",
        description:
          "Custom-designed memorial space with premium decorations and personalized themes",
      },
      {
        name: "Funeral Vehicles",
        description:
          "Fleet of premium vehicles according to needs with personalized routes",
      },
      {
        name: "Ceremonial Items",
        description:
          "Custom-designed ceremonial items, professional videography and memorial books",
      },
      {
        name: "Mourning Clothes",
        description:
          "Custom mourning attire for all family members with styling assistance",
      },
      {
        name: "Guest Reception",
        description:
          "Full-service premium catering with custom menu and personalized memorial gifts",
      },
    ],
    popularityScore: 65,
  },
  {
    id: "5",
    name: "Cremation Service Package",
    price: 65000000,
    status: "active",
    image: "/icons/funeral-urn-svgrepo-com.svg",
    category: "Specialized",
    description:
      "Complete cremation service with ceremony and premium urn for dignified final arrangements",
    inclusions: [
      {
        name: "Cremation Process",
        description: "Professional cremation service at modern facility",
      },
      {
        name: "Premium Urn",
        description: "High-quality decorative urn with personalized engraving",
      },
      {
        name: "Ceremony Setup",
        description: "Memorial service setup with seating for 50 guests",
      },
      {
        name: "Staff Service",
        description: "Professional staff assistance throughout the process",
      },
      {
        name: "Transportation",
        description: "Transportation to crematorium and return of remains",
      },
      {
        name: "Documentation",
        description: "All necessary documentation, permits and certificates",
      },
    ],
    popularityScore: 78,
  },
  {
    id: "6",
    name: "Vạn Phúc Traditional Package",
    price: 110000000,
    status: "active",
    image: "/images/pexels-brett-sayles-3648309.jpg",
    category: "Traditional",
    description:
      "Traditional funeral package with standard-sized coffin and complete ceremonial arrangements following cultural customs",
    inclusions: [
      {
        name: "Van Phuc Coffin",
        description:
          "Traditional design coffin with standard dimensions and quality materials",
      },
      {
        name: "Traditional Setup",
        description:
          "Setup following ancestral customs with proper ceremonial layout",
      },
      {
        name: "Staff Service",
        description:
          "2 experienced staff trained in traditional ceremonies (12 hours daily)",
      },
      {
        name: "Traditional Decorations",
        description:
          "Decorations and altar setup according to traditional customs",
      },
      {
        name: "Funeral Vehicles",
        description: "Traditional hearse and transportation for family members",
      },
      {
        name: "Traditional Items",
        description: "All ceremonial items required for traditional rituals",
      },
      {
        name: "Traditional Clothing",
        description:
          "12 sets of traditional mourning attire with proper accessories",
      },
      {
        name: "Ceremonial Food",
        description:
          "Traditional ceremonial food offerings and guest refreshments",
      },
    ],
    popularityScore: 70,
  },
  {
    id: "7",
    name: "Trường Phúc Premium Package",
    price: 175000000,
    status: "active",
    image: "/images/pexels-kseniachernaya-8986709.jpg",
    category: "Premium",
    description:
      "Premium funeral package with deluxe arrangements and comprehensive services for up to 200 guests",
    inclusions: [
      {
        name: "Premium Coffin",
        description: "Luxury coffin with premium wood and custom interior",
      },
      {
        name: "Premium Setup",
        description:
          "4 luxury tents with professional lighting and premium furniture",
      },
      {
        name: "Professional Staff",
        description:
          "3 professional staff members with supervisor (24-hour service)",
      },
      {
        name: "Premium Decorations",
        description:
          "Premium floral arrangements with imported flowers and artistic design",
      },

      {
        name: "Luxury Transportation",
        description:
          "Premium fleet including luxury hearse and 2 passenger vehicles",
      },
      {
        name: "Premium Ceremonial Items",
        description:
          "Complete set of premium ceremonial items with custom designs",
      },
      {
        name: "Premium Attire",
        description:
          "20 sets of premium mourning clothes with professional styling",
      },
      {
        name: "Premium Catering",
        description: "Premium catering service with custom menu for 200 guests",
      },
    ],
    popularityScore: 82,
  },
];

const ServiceInclusionItem = ({
  item,
}: {
  item: { name: string; description: string };
}) => {
  return (
    <div className="flex items-start gap-2 py-1">
      <div className="mt-1 bg-primary/10 rounded-full p-1 shrink-0">
        <Check className="h-3.5 w-3.5 text-primary" />
      </div>
      <div>
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
      </div>
    </div>
  );
};

// Main services management page component
const ServicesManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"list" | "grid">("list");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [newInclusion, setNewInclusion] = useState({
    name: "",
    description: "",
  });

  // Filter services based on search term and category
  const getFilteredServices = (
    services: typeof mockServices,
    searchTerm: string,
    categoryFilter: string | null
  ) => {
    const term = searchTerm.trim().toLowerCase();

    return services.filter((service) => {
      const matchSearch =
        !term ||
        service.name?.toLowerCase().includes(term) ||
        service.description?.toLowerCase().includes(term);

      const matchCategory =
        !categoryFilter || service.category === categoryFilter;

      return matchSearch && matchCategory;
    });
  };
  useEffect(() => {
    const filtered = getFilteredServices(
      mockServices,
      searchTerm,
      categoryFilter
    );
    setFilteredServices(filtered);
  }, [searchTerm, categoryFilter]);

  // Handle category filter changes
  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
  };

  // Toggle service status
  const toggleStatus = (serviceId: string, newStatus: string) => {
    const updatedServices = filteredServices.map((service) =>
      service.id === serviceId ? { ...service, status: newStatus } : service
    );

    setFilteredServices(updatedServices);

    if (selectedService && selectedService.id === serviceId) {
      setSelectedService({ ...selectedService, status: newStatus });
    }
  };

  // View service details
  const viewServiceDetails = (service: any) => {
    setSelectedService(service);
    setIsViewDialogOpen(true);
  };

  // Edit service
  const editService = (service: any) => {
    setSelectedService(service);
    setIsEditDialogOpen(true);
  };

  // Delete service confirmation
  const confirmDeleteService = (service: any) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  // Delete service
  const deleteService = () => {
    const updatedServices = filteredServices.filter(
      (service) => service.id !== selectedService?.id
    );
    setFilteredServices(updatedServices);
    setIsDeleteDialogOpen(false);
  };

  // Add a new inclusion to the service
  const addInclusion = () => {
    if (newInclusion.name && selectedService) {
      const updatedService = {
        ...selectedService,
        inclusions: [...selectedService.inclusions, { ...newInclusion }],
      };
      setSelectedService(updatedService);
      setNewInclusion({ name: "", description: "" });
    }
  };

  // Remove an inclusion from the service
  const removeInclusion = (index: number) => {
    if (selectedService && selectedService.inclusions.length > 1) {
      const updatedInclusions = selectedService.inclusions.filter(
        (_: any, i: number) => i !== index
      );
      setSelectedService({
        ...selectedService,
        inclusions: updatedInclusions,
      });
    }
  };

  // Update an inclusion field
  const updateInclusion = (index: number, field: string, value: string) => {
    if (selectedService) {
      const updatedInclusions = [...selectedService.inclusions];
      updatedInclusions[index] = {
        ...updatedInclusions[index],
        [field]: value,
      };
      setSelectedService({
        ...selectedService,
        inclusions: updatedInclusions,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý dịch vụ tang lễ
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý các gói dịch vụ, giá cả và nội dung bao gồm
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/80"
          onClick={() => {
            setSelectedService({
              id: "",
              name: "",
              price: 0,
              status: "active",
              image: "",
              category: "Basic",
              description: "",
              inclusions: [{ name: "", description: "" }],
              popularityScore: 0,
            });
            setIsEditDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm gói dịch vụ
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Tìm kiếm gói dịch vụ..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <DropdownMenuItem
                onClick={() => handleCategoryFilter("Buddhism")}
              >
                Mai táng theo Phật giáo
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCategoryFilter("Catholicism")}
              >
                Mai táng theo Công giáo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryFilter("Taoism")}>
                Mai táng theo Đạo giáo
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
                ? "Chuyển sang chế độ xem lưới"
                : "Chuyển sang chế độ xem danh sách"
            }
          >
            {currentView === "list" ? <List /> : <LayoutGrid />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ChartBarBig />
                Trạng thái
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => {
                  setFilteredServices(mockServices); // reset về tất cả trạng thái
                }}
              >
                Tất cả trạng thái
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  const active = mockServices.filter(
                    (s) => s.status === "active"
                  );
                  setFilteredServices(active);
                }}
              >
                Chỉ hoạt động
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  const inactive = mockServices.filter(
                    (s) => s.status === "inactive"
                  );
                  setFilteredServices(inactive);
                }}
              >
                Chỉ không hoạt động
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <EmptyFilter
          setSearchTerm={setSearchTerm}
          setStatusFilter={setCategoryFilter}
        />
      )}

      {/* Services table (list view) */}
      {filteredServices.length > 0 && currentView === "list" && (
        <TableView
          filteredServices={filteredServices}
          toggleStatus={toggleStatus}
          viewServiceDetails={viewServiceDetails}
          editService={editService}
          confirmDeleteService={confirmDeleteService}
        />
      )}

      {/* Services grid view */}
      {filteredServices.length > 0 && currentView === "grid" && (
        <GridView
          filteredServices={filteredServices}
          toggleStatus={toggleStatus}
          viewServiceDetails={viewServiceDetails}
          editService={editService}
          confirmDeleteService={confirmDeleteService}
        />
      )}

      {/* View service details dialog */}
      {selectedService && (
        <DetailDialog
          isViewDialogOpen={isViewDialogOpen}
          setIsViewDialogOpen={setIsViewDialogOpen}
          selectedService={selectedService}
          editService={editService}
          ServiceInclusionItem={ServiceInclusionItem}
        />
      )}

      {/* Edit service dialog */}
      {selectedService && (
        <EditService
          isEditDialogOpen={isEditDialogOpen}
          setIsEditDialogOpen={setIsEditDialogOpen}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          filteredServices={filteredServices}
          setFilteredServices={setFilteredServices}
          newInclusion={newInclusion}
          setNewInclusion={setNewInclusion}
          addInclusion={addInclusion}
          updateInclusion={updateInclusion}
          removeInclusion={removeInclusion}
        />
      )}

      {/* Delete service confirmation dialog */}
      {selectedService && (
        <DeleteService
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          selectedService={selectedService}
          deleteService={deleteService}
        />
      )}
    </div>
  );
};

export default withAuth(ServicesManagementPage, ["manager"]);
