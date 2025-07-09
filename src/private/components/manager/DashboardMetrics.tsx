import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import React from "react";
const DashboardMetrics: React.FC<{
  mockSummaryData: any;
}> = ({ mockSummaryData }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tổng Doanh Thu</CardTitle>
          <DollarSign className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(mockSummaryData.totalSales)}
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
          <div className="text-2xl font-bold">
            {mockSummaryData.ordersCount}
          </div>
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
            {formatCurrency(mockSummaryData.averageOrderValue)}
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
          <div className="text-2xl font-bold">
            {mockSummaryData.customersCount}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+5.9%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMetrics;
