import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Line,
  AreaChart,
  LineChart,
} from "recharts";
const CustomersTab: React.FC<{
  mockSummaryData: {
    customerAcquisition: {
      month: string;
      newCustomers: number;
      returningCustomers: number;
    }[];
    customerLifetimeValue: {
      segment: string;
      value: number;
    }[];
  };
}> = ({ mockSummaryData }) => {
  return (
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
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
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
                <XAxis dataKey="segment" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip formatter={(value) => [`$${value}`, "Giá trị"]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#82ca9d"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 shadow-md border border-dashed border-gray-300 p-3 rounded-lg">
                <div className="text-2xl font-bold">2.6</div>
                <p className="text-xs text-muted-foreground">
                  Số đơn hàng trung bình/khách
                </p>
              </div>
              <div className="bg-gray-50 shadow-md border border-dashed border-gray-300 p-3 rounded-lg">
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
  );
};

export default CustomersTab;
