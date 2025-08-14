import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Pie,
  Cell,
  Legend,
  BarChart as UIBarChart,
  PieChart,
} from "recharts";
import ProgressBar from "./ProgressBar";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/formatting";
const OverviewTab: React.FC<{
  mockSummaryData: {
    monthlySales: { month: string; revenue: number }[];
    salesByCategory: {
      category: string;
      revenue: number;
      percentage: number;
    }[];
    recentOrders: {
      id: string;
      date: string;
      customer: string;
      amount: number;
      status: string;
    }[];
  };
}> = ({ mockSummaryData }) => {
  return (
    <TabsContent value="overview" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Monthly revenue chart */}
        <Card>
          <CardHeader>
            <CardTitle>Doanh Thu Theo Tháng</CardTitle>
            <CardDescription>
              Xu hướng doanh thu trong 6 tháng qua
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={250}>
              <UIBarChart
                data={mockSummaryData.monthlySales}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Revenue"]}
                  labelStyle={{ fontWeight: "bold", color: "#333" }}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--primary)"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </UIBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by category */}
        <Card>
          <CardHeader>
            <CardTitle>Doanh Thu Theo Danh Mục</CardTitle>
            <CardDescription>
              Phân bổ doanh thu theo các danh mục sản phẩm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={mockSummaryData.salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                  nameKey="category"
                  label={({ category, percentage }) =>
                    `${category}: ${percentage}%`
                  }
                >
                  {mockSummaryData.salesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "var(--primary)"
                          : index === 1
                          ? "#4caf50"
                          : "#ff9800"
                      }
                    />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Revenue"]}
                  labelFormatter={(name) => `Category: ${name}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 mt-4">
              {mockSummaryData.salesByCategory.map((category, index) => (
                <ProgressBar
                  key={index}
                  label={category.category}
                  value={category.revenue}
                  percentage={category.percentage}
                  color={
                    index === 0
                      ? "var(--primary)"
                      : index === 1
                      ? "#4caf50"
                      : "#ff9800"
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader>
          <CardTitle>Đơn Hàng Mới Nhất</CardTitle>
          <CardDescription>
            Giao dịch mới nhất từ cửa hàng của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3">Mã Đơn Hàng</th>
                  <th className="text-left pb-3">Ngày</th>
                  <th className="text-left pb-3">Khách Hàng</th>
                  <th className="text-left pb-3">Số Tiền</th>
                  <th className="text-left pb-3">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {mockSummaryData.recentOrders.map((order, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3">{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.customer}</td>
                    <td>{formatCurrency(order.amount)}</td>
                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              Xem Tất Cả Đơn Hàng
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default OverviewTab;
