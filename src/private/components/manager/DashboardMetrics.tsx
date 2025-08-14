import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStatistics } from "@/lib/hooks/useDashboard";
import { formatCurrency } from "@/lib/utils/formatting";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import React from "react";

const DashboardMetrics: React.FC = () => {
  const { statistics, loading, error } = useDashboardStatistics();

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !statistics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              Không thể tải dữ liệu thống kê: {error || "Dữ liệu không có sẵn"}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(statistics.totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+12.5%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Đơn Hàng</CardTitle>
          <ShoppingCart className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalOrders}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+8.2%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Giá Trị Đơn Hàng Trung Bình
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(statistics.averageOrderValue)}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+3.7%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Khách Hàng</CardTitle>
          <Users className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalCustomers}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+5.9%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
