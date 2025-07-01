"use client";

import React, { useState } from "react";
import {
  BarChart,
  Calendar,
  DollarSign,
  Download,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  Line,
  Pie,
  Cell,
  Legend,
  Tooltip,
  LineChart,
  BarChart as UIBarChart,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Mock sales data - we'd normally fetch this from an API
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

// Component for progress bars
const ProgressBar = ({
  label,
  value,
  percentage,
  color = "var(--primary)",
}: {
  label: string;
  value: number;
  percentage: number;
  color?: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{formatCurrency(value)}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

// Main dashboard component
const SalesDashboard = () => {
  const [dateRange, setDateRange] = useState("last30days");

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Bảng điều khiển bán hàng
        </h1>
        <div className="flex items-center gap-3">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="yesterday">Hôm qua</SelectItem>
              <SelectItem value="last7days">7 Ngày Qua</SelectItem>
              <SelectItem value="last30days">30 Ngày Qua</SelectItem>
              <SelectItem value="thisMonth">Tháng Này</SelectItem>
              <SelectItem value="lastMonth">Tháng Trước</SelectItem>
              <SelectItem value="thisYear">Năm Này</SelectItem>
              <SelectItem value="custom">Khoảng Thời Gian Tùy Chỉnh</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Key metrics summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng Doanh Thu
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mockSummaryData.totalSales)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+12.5%</span> so với tháng
              trước
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

      {/* Sales analysis tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
          <TabsTrigger value="products">Sản Phẩm</TabsTrigger>
          <TabsTrigger value="customers">Khách Hàng</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
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

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sản Phẩm Bán Chạy Nhất</CardTitle>
              <CardDescription>
                Sản phẩm tạo ra doanh thu nhiều nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {mockSummaryData.topSellingProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {product.count}{" "}
                          <span className="text-muted-foreground">
                            sản phẩm được bán
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="font-medium">
                      {formatCurrency(product.revenue)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <CardTitle className="mb-4 text-base">
                  Doanh Thu Theo Sản Phẩm
                </CardTitle>
                <ResponsiveContainer width="100%" height={250}>
                  <UIBarChart
                    layout="vertical"
                    data={mockSummaryData.topSellingProducts}
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => `$${value}`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Bar
                      dataKey="revenue"
                      fill="var(--primary)"
                      radius={[0, 4, 4, 0]}
                    >
                      {mockSummaryData.topSellingProducts.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`hsl(220, 70%, ${55 + index * 5}%)`}
                          />
                        )
                      )}
                    </Bar>
                  </UIBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Phân tích khách hàng</CardTitle>
                <CardDescription>Khách hàng mới theo thời gian</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart
                    data={mockSummaryData.customerAcquisition}
                    margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="var(--primary)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--primary)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorReturning"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Area
                      type="monotone"
                      dataKey="newCustomers"
                      name="Khách hàng mới"
                      stroke="var(--primary)"
                      fillOpacity={1}
                      fill="url(#colorNew)"
                    />
                    <Area
                      type="monotone"
                      dataKey="returningCustomers"
                      name="Khách hàng trở lại"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorReturning)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-between mt-4">
                  <Button className="bg-primary/90 hover:bg-primary">
                    Xem báo cáo chi tiết
                  </Button>
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      +18% so với tháng trước
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Giá trị khách hàng</CardTitle>
                <CardDescription>
                  Phân tích giá trị vòng đời khách hàng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={mockSummaryData.customerLifetimeValue}
                    margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="segment"
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip formatter={(value) => [`$${value}`, "Giá trị"]} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">2.6</div>
                    <p className="text-xs text-muted-foreground">
                      Số đơn hàng trung bình/khách
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold">64%</div>
                    <p className="text-xs text-muted-foreground">
                      Tỉ lệ khách hàng quay lại
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Trend Analysis View */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Phân tích xu hướng doanh thu</CardTitle>
            <CardDescription>
              So sánh doanh thu theo danh mục trong năm
            </CardDescription>
          </div>
          <Select defaultValue="thisYear">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisYear">Năm này</SelectItem>
              <SelectItem value="lastYear">Năm trước</SelectItem>
              <SelectItem value="last2Years">2 năm qua</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={[
                { month: "Jan", flowers: 3200, memorials: 1550, services: 850 },
                { month: "Feb", flowers: 2800, memorials: 1400, services: 920 },
                {
                  month: "Mar",
                  flowers: 3600,
                  memorials: 2100,
                  services: 1050,
                },
                { month: "Apr", flowers: 2950, memorials: 1750, services: 830 },
                { month: "May", flowers: 3450, memorials: 1900, services: 950 },
                {
                  month: "Jun",
                  flowers: 4200,
                  memorials: 2600,
                  services: 1650,
                },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                padding={{ left: 30, right: 30 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="flowers"
                name="Hoa"
                stroke="var(--primary)"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                dot={{ strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="memorials"
                name="Vật phẩm tưởng niệm"
                stroke="#82ca9d"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                dot={{ strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="services"
                name="Dịch vụ"
                stroke="#ffc658"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                dot={{ strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 flex justify-between">
            <div>
              <p className="text-sm font-medium">Nhận xét:</p>
              <p className="text-sm text-gray-500">
                Doanh thu từ hoa luôn dẫn đầu và có xu hướng tăng mạnh vào tháng
                6.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Xuất dữ liệu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesDashboard;
