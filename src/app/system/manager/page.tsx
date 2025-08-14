"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import withAuth from "@/lib/hooks/useWithAuth";
import { useDashboardStatistics } from "@/lib/hooks/useDashboard";
import CustomersTab from "@/private/components/manager/CustomersTab";
import DashboardHeader from "@/private/components/manager/DashboardHeader";
import DashboardMetrics from "@/private/components/manager/DashboardMetrics";
import OverviewTab from "@/private/components/manager/OverviewTab";
import ProductsTab from "@/private/components/manager/ProductsTab";
import TrendAnalysis from "@/private/components/manager/TrendAnalysis";
import { useState } from "react";

const mockSummaryData = {
  totalSales: 28750,
  ordersCount: 152,
  averageOrderValue: 189.14,
  customersCount: 89,
  topSellingProducts: [
    { name: "Traditional Arrangement", revenue: 6930, count: 42 },
    { name: "Pink & Lilac Bouquet", revenue: 5580, count: 36 },
    { name: "Memorial Tribute", revenue: 3500, count: 20 },
    { name: "White Rose Bouquet", revenue: 2900, count: 20 },
    { name: "Rose and Freesia Bouquet", revenue: 2610, count: 18 },
  ],
  monthlySales: [
    { month: "Jan", revenue: 4250 },
    { month: "Feb", revenue: 3800 },
    { month: "Mar", revenue: 5200 },
    { month: "Apr", revenue: 4100 },
    { month: "May", revenue: 4800 },
    { month: "Jun", revenue: 6600 },
  ],
  salesByCategory: [
    { category: "Flowers", revenue: 15200, percentage: 53 },
    { category: "Memorial Items", revenue: 8300, percentage: 29 },
    { category: "Services", revenue: 5250, percentage: 18 },
  ],
  customerAcquisition: [
    { month: "Jan", newCustomers: 8, returningCustomers: 12 },
    { month: "Feb", newCustomers: 10, returningCustomers: 14 },
    { month: "Mar", newCustomers: 12, returningCustomers: 18 },
    { month: "Apr", newCustomers: 9, returningCustomers: 16 },
    { month: "May", newCustomers: 11, returningCustomers: 20 },
    { month: "Jun", newCustomers: 15, returningCustomers: 24 },
  ],
  customerLifetimeValue: [
    { segment: "0-3 months", value: 175 },
    { segment: "3-6 months", value: 290 },
    { segment: "6-12 months", value: 385 },
    { segment: "1-2 years", value: 520 },
    { segment: "2+ years", value: 780 },
  ],
  recentOrders: [
    {
      id: "ORD-2025-1010",
      date: "Jun 27, 2025",
      customer: "John Smith",
      amount: 320,
      status: "completed",
    },
    {
      id: "ORD-2025-1009",
      date: "Jun 26, 2025",
      customer: "Emily Johnson",
      amount: 290,
      status: "processing",
    },
    {
      id: "ORD-2025-1008",
      date: "Jun 26, 2025",
      customer: "Michael Brown",
      amount: 320,
      status: "shipped",
    },
    {
      id: "ORD-2025-1007",
      date: "Jun 25, 2025",
      customer: "Sarah Wilson",
      amount: 165,
      status: "completed",
    },
  ],
};

const SalesDashboard = () => {
  const [dateRange, setDateRange] = useState("last30days");
  const { refreshStatistics, loading: dashboardLoading } =
    useDashboardStatistics();

  return (
    <div className="space-y-6 flex h-screen flex-col">
      {/* Page header */}
      <DashboardHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={refreshStatistics}
        isRefreshing={dashboardLoading}
      />
      {/* Key metrics summary */}
      <DashboardMetrics />
      <div className="flex flex-1/2 flex-col text-center space-y-4 justify-center items-center">
        <h1 className="text-4xl font-semibold text-primary">
          Các thông tin khác sẽ được cập nhật sau
        </h1>
        <p>Hãy liên hệ với chúng tôi để biết thêm chi tiết</p>
      </div>
      {/* Sales analysis tabs */}
      {/* <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
          <TabsTrigger value="products">Sản Phẩm</TabsTrigger>
          <TabsTrigger value="customers">Khách Hàng</TabsTrigger>
        </TabsList>

        <OverviewTab mockSummaryData={mockSummaryData} />
        <ProductsTab mockSummaryData={mockSummaryData} />
        <CustomersTab mockSummaryData={mockSummaryData} />
      </Tabs> */}

      {/* Trend Analysis View */}
      {/* <TrendAnalysis /> */}
    </div>
  );
};

export default withAuth(SalesDashboard, ["admin"]);
