import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Check,
  Edit,
  MoreHorizontal,
  PackageCheck,
  Trash2,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
const GridView: React.FC<{
  filteredServices: any[];
  toggleStatus: (id: string, status: "active" | "inactive") => void;
  viewServiceDetails: (id: string) => void;
  editService: (id: string) => void;
  confirmDeleteService: (id: string) => void;
}> = ({
  filteredServices,
  toggleStatus,
  viewServiceDetails,
  editService,
  confirmDeleteService,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredServices.map((service) => (
        <Card
          key={service.id}
          className="overflow-hidden h-full flex flex-col border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
        >
          <div className="aspect-video relative bg-gray-100">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="h-100 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src = "/icons/image-off.svg";
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <PackageCheck className="h-12 w-12 text-gray-300" />
              </div>
            )}
            <Badge
              className={`absolute top-2 right-2 ${
                service.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {service.status === "active" ? "Hoạt động" : "Ngừng hoạt động"}
            </Badge>
            <div className="absolute left-0 bottom-0 bg-white bg-opacity-90 px-3 py-1 m-2 rounded-md shadow-sm">
              <div className="text-lg font-bold text-primary">
                {formatCurrency(service.price)}
              </div>
            </div>
          </div>
          <CardHeader className="pb-3 ">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl line-clamp-1">
                {service.name}
              </CardTitle>
              <Badge
                variant={
                  service.category === "Mai táng theo Phật giáo"
                    ? "default"
                    : service.category === "Mai táng theo Đạo giáo"
                    ? "outline"
                    : service.category === "Mai táng theo Công giáo"
                    ? "default"
                    : "secondary"
                }
                className={
                  service.category === "Mai táng theo Phật giáo"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : service.category === "Mai táng theo Đạo giáo"
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                    : service.category === "Mai táng theo Công giáo"
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    : ""
                }
              >
                {service.category}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2 mt-2">
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 flex-grow">
            <div className="space-y-1">
              <div className="text-sm text-gray-500 flex items-center">
                <Check className="h-3.5 w-3.5 mr-1 text-primary" />
                <span>Bao gồm {service.inclusions.length} gói dịch vụ</span>
              </div>

              {/* Preview a few inclusions */}
              <ul className="pl-5 text-sm text-gray-600">
                {service.inclusions
                  .slice(0, 3)
                  .map((inclusion: any, i: number) => (
                    <li key={i} className="list-disc list-outside">
                      {inclusion.name}
                    </li>
                  ))}
                {service.inclusions.length > 3 && (
                  <li className="list-none text-xs text-primary italic">
                    +{service.inclusions.length - 3} gói dịch vụ khác
                  </li>
                )}
              </ul>
            </div>

            {/* Popularity bar */}
            {service.popularityScore > 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Độ phổ biến</span>
                  <span>{service.popularityScore}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: `${service.popularityScore}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between pt-0 border-t mt-auto">
            <Switch
              id={`grid-status-${service.id}`}
              checked={service.status === "active"}
              onCheckedChange={(checked) =>
                toggleStatus(service.id, checked ? "active" : "inactive")
              }
              aria-label={`Toggle ${service.name} status`}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => viewServiceDetails(service)}
              >
                Xem
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => editService(service)}>
                    <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => confirmDeleteService(service)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GridView;
