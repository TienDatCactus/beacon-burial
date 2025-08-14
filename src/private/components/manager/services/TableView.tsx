import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Info, PackageCheck } from "lucide-react";
import React from "react";

import { Service } from "@/lib/api/service";
import { formatCurrency } from "@/lib/utils/formatting";
import Image from "next/image";
import ServicePagination from "./ServicePagination";

interface TableViewProps {
  filteredServices: Service[];
  toggleStatus: (id: string, status: "active" | "inactive") => void;
  viewServiceDetails: (service: Service) => void;
  editService: (service: Service) => void;
  confirmDeleteService: (service: Service) => void;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
  goToPage: (page: number) => void;
}
const TableView: React.FC<TableViewProps> = ({
  filteredServices,
  toggleStatus,
  viewServiceDetails,
  editService,
  pagination,
  goToPage,
}) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gói dịch vụ</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thành phần</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredServices.map((service) => (
            <TableRow key={service._id} className="hover:bg-gray-50 h-20">
              <TableCell>
                <div className="flex items-center gap-3">
                  {service.imageUrl ? (
                    <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={service.imageUrl[0]}
                        alt={service.title}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src =
                            "/icons/image-off.svg";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <PackageCheck className="h-6 w-6 text-gray-300" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{service.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-50">
                      {service.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    service.category === "Premium"
                      ? "default"
                      : service.category === "Basic"
                      ? "outline"
                      : service.category === "Traditional"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    service.category === "Premium"
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : service.category === "Specialized"
                      ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                      : service.category === "Traditional"
                      ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                      : ""
                  }
                >
                  {service.category === "Premium"
                    ? "Cao cấp"
                    : service.category === "Specialized"
                    ? "Chuyên biệt"
                    : service.category === "Traditional"
                    ? "Truyền thống"
                    : "Cơ bản"}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(service.price)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`status-${service._id}`}
                    checked={service.status === "active"}
                    onCheckedChange={(checked) =>
                      toggleStatus(service._id, checked ? "active" : "inactive")
                    }
                    aria-label={`Toggle ${service.title} status`}
                  />
                  <Badge
                    variant={
                      service.status === "active" ? "default" : "secondary"
                    }
                    className={
                      service.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }
                  >
                    {service.status === "active"
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"}
                  </Badge>
                </div>
              </TableCell>

              {/* <TableCell>
                <div className="flex items-center gap-2 w-[100px]">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${service.popularityScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{service.popularityScore}%</span>
                </div>
              </TableCell> */}

              <TableCell>
                <div className="flex items-center">
                  <Badge
                    variant="outline"
                    className="border-gray-200 text-gray-600"
                  >
                    {service.inclusions.length} thành phần
                  </Badge>
                  <Button
                    variant={"link"}
                    className="ml-1 text-xs text-primary hover:underline"
                    onClick={() => {
                      viewServiceDetails(service);
                      setTimeout(
                        () =>
                          document
                            .querySelector('[data-value="inclusions"]')
                            ?.dispatchEvent(
                              new MouseEvent("click", { bubbles: true })
                            ),
                        100
                      );
                    }}
                  >
                    Xem
                  </Button>
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewServiceDetails(service)}
                    className="hover:bg-gray-100"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editService(service)}
                    className="hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          Trang {pagination.currentPage} / {pagination.totalPages}
        </div>
        <ServicePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

export default TableView;
