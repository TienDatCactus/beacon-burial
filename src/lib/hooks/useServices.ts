import {
  addService,
  changeServiceStatus,
  CreateServiceData,
  editService,
  getServiceById,
  getServiceCategories,
  getServices,
  Service,
  ServiceFilters,
  UpdateServiceData,
} from "@/lib/api/service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook for fetching and managing services list
 * Includes search, filtering, and pagination functionality
 */
export const useServices = (initialFilters: ServiceFilters = {}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 9,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ServiceFilters>({
    page: 1,
    limit: 9,
    ...initialFilters,
  });

  /**
   * Fetch services from API
   */
  const fetchServices = useCallback(
    async (newFilters?: ServiceFilters) => {
      setLoading(true);
      setError(null);

      try {
        const appliedFilters = newFilters || filters;
        const response = await getServices(appliedFilters);
        if (response) {
          setServices(response.data.data);
          setPagination({
            currentPage: response.data.currentPage,
            totalPages: response.data.totalPages,
            totalItems: response.data.totalResults,
            itemsPerPage: appliedFilters.limit || 9,
          });
          toast.success("Danh sách dịch vụ đã được tải thành công!");
        } else {
          setError("Failed to fetch services");
          toast.error("Không thể tải danh sách dịch vụ");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        toast.error("Lỗi khi tải danh sách dịch vụ");
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  /**
   * Search services by keyword
   */
  const searchByKeyword = useCallback(
    (keyword: string) => {
      const newFilters = { ...filters, keyword, page: 1 };
      setFilters(newFilters);
      fetchServices(newFilters);
    },
    [filters, fetchServices]
  );

  /**
   * Filter services by category
   */
  const filterByCategory = useCallback(
    (category: string | null) => {
      const newFilters = {
        ...filters,
        category: category || undefined,
        page: 1,
      };
      setFilters(newFilters);
      fetchServices(newFilters);
    },
    [filters, fetchServices]
  );

  /**
   * Filter services by price range
   */
  const filterByPriceRange = useCallback(
    (priceRange: string | null) => {
      const newFilters = {
        ...filters,
        priceRange: priceRange || undefined,
        page: 1,
      };
      setFilters(newFilters);
      fetchServices(newFilters);
    },
    [filters, fetchServices]
  );

  /**
   * Go to specific page
   */
  const goToPage = useCallback(
    (page: number) => {
      const newFilters = { ...filters, page };
      setFilters(newFilters);
      fetchServices(newFilters);
    },
    [filters, fetchServices]
  );

  /**
   * Reset all filters
   */
  const resetFilters = useCallback(() => {
    const resetFilters = { page: 1, limit: 9 };
    setFilters(resetFilters);
    fetchServices(resetFilters);
  }, [fetchServices]);

  /**
   * Refresh services list
   */
  const refreshServices = useCallback(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    pagination,
    searchByKeyword,
    filterByCategory,
    filterByPriceRange,
    goToPage,
    resetFilters,
    refreshServices,
    currentFilters: filters,
  };
};

/**
 * Custom hook for service management operations (CRUD)
 */
export const useServiceManagement = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Create a new service
   */
  const createService = useCallback(
    async (serviceData: CreateServiceData): Promise<boolean> => {
      setLoading(true);
      try {
        await addService(serviceData);
        toast.success("Tạo dịch vụ thành công!");
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        toast.error(`Lỗi khi tạo dịch vụ: ${errorMessage}`);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Update an existing service
   */
  const updateService = useCallback(
    async (
      serviceId: string,
      serviceData: UpdateServiceData
    ): Promise<boolean> => {
      setLoading(true);
      try {
        await editService(serviceId, serviceData);
        toast.success("Cập nhật dịch vụ thành công!");
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        toast.error(`Lỗi khi cập nhật dịch vụ: ${errorMessage}`);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Toggle service status (active <-> inactive)
   */
  const toggleServiceStatus = useCallback(
    async (serviceId: string): Promise<boolean> => {
      setLoading(true);
      try {
        await changeServiceStatus(serviceId);
        toast.success("Thay đổi trạng thái dịch vụ thành công!");
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        toast.error(`Lỗi khi thay đổi trạng thái: ${errorMessage}`);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    createService,
    updateService,
    toggleServiceStatus,
  };
};

/**
 * Custom hook for fetching a single service
 */
export const useService = (serviceId: string | null) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchService = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const serviceData = await getServiceById(id);
      if (serviceData) {
        setService(serviceData);
      } else {
        setError("Service not found");
        toast.error("Không tìm thấy dịch vụ");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      toast.error("Lỗi khi tải thông tin dịch vụ");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (serviceId) {
      fetchService(serviceId);
    }
  }, [serviceId, fetchService]);

  return {
    service,
    loading,
    error,
    refetch: serviceId ? () => fetchService(serviceId) : undefined,
  };
};

/**
 * Custom hook for service categories
 */
export const useServiceCategories = () => {
  const categories = getServiceCategories();

  return {
    categories,
  };
};

/**
 * Custom hook for featured services
 */
export const useFeaturedServices = () => {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedServices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getServices({ limit: 6 }); // Get first 6 services

      if (response) {
        const featured = response.data.filter(
          (service: Service) => service.isFeatured
        );
        setFeaturedServices(
          featured.length > 0 ? featured : response.data.slice(0, 6)
        );
      } else {
        setError("Failed to fetch featured services");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedServices();
  }, [fetchFeaturedServices]);

  return {
    featuredServices,
    loading,
    error,
    refreshFeaturedServices: fetchFeaturedServices,
  };
};
