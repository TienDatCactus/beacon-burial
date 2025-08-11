import { ServiceInclusionItem } from "@/app/system/manager/services/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Service } from "@/lib/api/service";
import { formatCurrency } from "@/lib/utils";
import { PackageCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

interface DetailDialogProps {
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  selectedService: Service;
  editService: (service: Service) => void;
}
const DetailDialog: React.FC<DetailDialogProps> = ({
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedService,
  editService,
}) => {
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{selectedService.title}</DialogTitle>
          <div className="flex justify-between items-center">
            <Badge
              variant={
                selectedService.category === "Premium"
                  ? "default"
                  : selectedService.category === "Basic"
                  ? "outline"
                  : "secondary"
              }
              className={
                selectedService.category === "Premium"
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : selectedService.category === "Specialized"
                  ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                  : ""
              }
            >
              {selectedService.category} Package
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Trạng thái:</span>
              <Badge
                variant={
                  selectedService.status === "active" ? "default" : "secondary"
                }
                className={
                  selectedService.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {selectedService.status === "active"
                  ? "Hoạt động"
                  : "Ngừng hoạt động"}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList>
            <TabsTrigger value="overview">Thông tin chung</TabsTrigger>
            <TabsTrigger value="inclusions">Nội dung bao gồm</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Package image */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedService.imageUrl ? (
                    selectedService.imageUrl.map((url) => (
                      <Image
                        key={url}
                        width={800}
                        height={450}
                        src={url}
                        alt={selectedService.title}
                        className="h-40 w-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src =
                            "/icons/image-off.svg";
                        }}
                      />
                    ))
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <PackageCheck className="h-16 w-16 text-gray-300" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-500">
                      Giá cả
                    </h3>
                    <Badge
                      variant={
                        selectedService.category === "Premium"
                          ? "default"
                          : selectedService.category === "Basic"
                          ? "outline"
                          : selectedService.category === "Traditional"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        selectedService.category === "Premium"
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : selectedService.category === "Specialized"
                          ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                          : selectedService.category === "Traditional"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : ""
                      }
                    >
                      {selectedService.category}
                    </Badge>
                  </div>
                  <p className="mt-1 text-2xl font-bold">
                    {formatCurrency(selectedService.price)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Trạng thái
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        selectedService.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="font-medium">
                      {selectedService.status === "active"
                        ? "Đang hoạt động"
                        : "Không hoạt động"}
                    </span>
                  </div>
                </div>
              </div>
              {/* Package details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Mô tả gói dịch vụ
                  </h3>
                  <p className="mt-1">{selectedService.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Số mục bao gồm
                  </h3>
                  <p className="mt-1 font-semibold">
                    {selectedService.inclusions.length} mục
                  </p>
                </div>
                {/* 
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Điểm phổ biến của gói dịch vụ
                  </h3>
                  <div className="mt-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Thấp</span>
                      <span>Cao</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <Progress
                          value={selectedService.popularityScore}
                          className="h-2"
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {selectedService.popularityScore}%
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="inclusions"
            className="pt-4 max-h-100 overflow-y-auto"
          >
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Bao gồm trong gói dịch vụ
                </h3>
                <Badge className="bg-blue-100 text-blue-800">
                  Bao gồm {selectedService.inclusions.length} mục
                </Badge>
              </div>

              <div className="grid gap-4">
                {selectedService.inclusions.map(
                  (inclusion: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-dashed border-gray-400 shadow-md rounded-xl p-3 hover:bg-gray-100 transition-colors"
                    >
                      <ServiceInclusionItem item={inclusion} />
                    </div>
                  )
                )}
              </div>

              <div className="mt-6 bg-primary/5 rounded-lg p-4">
                <h4 className="text-sm font-medium text-primary mb-2">
                  Chi tiết gói dịch vụ
                </h4>
                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                  <li>
                    Gói dịch vụ hoàn chỉnh phù hợp cho{" "}
                    {selectedService.category === "Premium"
                      ? "lễ nghi cao cấp"
                      : selectedService.category === "Basic"
                      ? "lễ nghi cơ bản"
                      : selectedService.category === "Traditional"
                      ? "lễ nghi văn hóa truyền thống"
                      : "nhu cầu chuyên biệt"}
                  </li>
                  <li>
                    Hỗ trợ từ nhân viên chuyên nghiệp trong suốt quá trình sắp
                    xếp
                  </li>
                  <li>
                    Tất cả tài liệu và chứng chỉ cần thiết đều được bao gồm
                  </li>
                  <li>Đường dây hỗ trợ 24/7 cho gia đình</li>
                  <li>Có thể tùy chỉnh gói dịch vụ theo yêu cầu</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between mt-6">
          <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
            Đóng
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setIsViewDialogOpen(false);
              editService(selectedService);
            }}
          >
            Chỉnh sửa gói dịch vụ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
