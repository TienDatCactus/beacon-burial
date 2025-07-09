import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Package } from "lucide-react";
import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  BarChart as UIBarChart,
} from "recharts";
const ProductsTab: React.FC<{
  mockSummaryData: {
    topSellingProducts: {
      name: string;
      count: number;
      revenue: number;
    }[];
  };
}> = ({ mockSummaryData }) => {
  return (
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
              <div key={index} className="flex items-center justify-between">
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
                  fill="var(--primary)"
                  tickFormatter={(value) => `$${value}`}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  fill="var(--primary)"
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
                  {mockSummaryData.topSellingProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="var(--primary)" />
                  ))}
                </Bar>
              </UIBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ProductsTab;
