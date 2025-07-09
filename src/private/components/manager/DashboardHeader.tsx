import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import React from "react";
const DashboardHeader: React.FC<{
  dateRange: string;
  setDateRange: React.Dispatch<React.SetStateAction<string>>;
}> = ({ dateRange, setDateRange }) => {
  return (
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
  );
};

export default DashboardHeader;
