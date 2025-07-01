import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { PackageCheck } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface DetailDialogProps {
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  selectedService: any;
  editService: (service: any) => void;
  ServiceInclusionItem: React.FC<{ item: any }>;
}
const DetailDialog: React.FC<DetailDialogProps> = ({
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedService,
  editService,
  ServiceInclusionItem,
}) => {
  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{selectedService.name}</DialogTitle>
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
              <span className="text-gray-700">Status:</span>
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
                {selectedService.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Package image */}
              <div className="space-y-4">
                <div className="aspect-video relative rounded-md overflow-hidden border">
                  {selectedService.image ? (
                    <Image
                      width={800}
                      height={450}
                      src={selectedService.image}
                      alt={selectedService.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src =
                          "/icons/image-off.svg";
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <PackageCheck className="h-16 w-16 text-gray-300" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
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
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
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
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
              {/* Package details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Description
                  </h3>
                  <p className="mt-1">{selectedService.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Number of Inclusions
                  </h3>
                  <p className="mt-1 font-semibold">
                    {selectedService.inclusions.length} items
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Popularity
                  </h3>
                  <div className="mt-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Low Demand</span>
                      <span>High Demand</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{
                            width: `${selectedService.popularityScore}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {selectedService.popularityScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inclusions" className="pt-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Service Package Inclusions
                </h3>
                <Badge className="bg-blue-100 text-blue-800">
                  {selectedService.inclusions.length} items included
                </Badge>
              </div>

              <div className="grid gap-4">
                {selectedService.inclusions.map(
                  (inclusion: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                    >
                      <ServiceInclusionItem item={inclusion} />
                    </div>
                  )
                )}
              </div>

              <div className="mt-6 bg-primary/5 rounded-lg p-4">
                <h4 className="text-sm font-medium text-primary mb-2">
                  Package Details
                </h4>
                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                  <li>
                    Complete package suitable for{" "}
                    {selectedService.category === "Premium"
                      ? "premium ceremonies"
                      : selectedService.category === "Basic"
                      ? "basic ceremonies"
                      : selectedService.category === "Traditional"
                      ? "traditional cultural ceremonies"
                      : "specialized needs"}
                  </li>
                  <li>
                    Professional staff assistance throughout the arrangement
                    process
                  </li>
                  <li>All essential documentation and certificates included</li>
                  <li>24/7 support hotline for families</li>
                  <li>Package customization available upon request</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between mt-6">
          <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
            Close
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setIsViewDialogOpen(false);
              editService(selectedService);
            }}
          >
            Edit Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
