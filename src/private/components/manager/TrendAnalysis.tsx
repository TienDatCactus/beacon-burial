import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const TrendAnalysis: React.FC = () => {
  return (
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
  );
};

export default TrendAnalysis;
