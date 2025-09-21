"use client";

import { useDashboardStatistics } from "@/lib/hooks/useDashboard";
import withAuth from "@/lib/hooks/useWithAuth";
import DashboardHeader from "@/private/components/manager/DashboardHeader";
import DashboardMetrics from "@/private/components/manager/DashboardMetrics";
import { useState } from "react";

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
