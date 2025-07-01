import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Switch } from "@radix-ui/react-switch";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
interface EditServiceProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedService: any; // Replace with your service type
  setSelectedService: (service: any) => void;
  filteredServices: any[]; // Replace with your service type array
  setFilteredServices: (services: any[]) => void;
  newInclusion: { name: string; description: string };

  setNewInclusion: (inclusion: { name: string; description: string }) => void;
  addInclusion: () => void;
  updateInclusion: (index: number, field: string, value: string) => void;
  removeInclusion: (index: number) => void;
}
const EditService: React.FC<EditServiceProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedService,
  setSelectedService,
  filteredServices,
  setFilteredServices,
  newInclusion,
  setNewInclusion,
  addInclusion,
  updateInclusion,
  removeInclusion,
}) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="max-w-5xl h-screen ">
        <DialogHeader>
          <DialogTitle>Edit Service Package</DialogTitle>
          <DialogDescription>
            Update the details for this service package
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Package Name</Label>
              <Input
                id="name"
                value={selectedService.name}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    name: e.target.value,
                  })
                }
                placeholder="Enter service package name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (VND)</Label>
              <Input
                id="price"
                type="number"
                value={selectedService.price}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    price: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setSelectedService({
                        ...selectedService,
                        image: event.target?.result as string,
                      });
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
                placeholder="Enter image URL path"
              />
              {selectedService.image && (
                <div className="mt-2 border rounded-md p-2 bg-gray-50">
                  <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
                  <div className="aspect-video w-full bg-gray-100 rounded overflow-hidden">
                    <Image
                      width={800}
                      height={450}
                      src={selectedService.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "/icons/image-off.svg")
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="popularity">Popularity Score (0-100)</Label>
              <Input
                id="popularity"
                type="number"
                min="0"
                max="100"
                value={selectedService.popularityScore || 0}
                onChange={(e) =>
                  setSelectedService({
                    ...selectedService,
                    popularityScore: Math.min(
                      100,
                      Math.max(0, parseInt(e.target.value) || 0)
                    ),
                  })
                }
                placeholder="Enter popularity score (0-100)"
              />
              <div className="mt-1 flex items-center">
                <Progress value={selectedService.popularityScore || 0} />
                <span className="ml-2 text-sm">
                  {selectedService.popularityScore || 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={selectedService.category}
                onValueChange={(value) =>
                  setSelectedService({
                    ...selectedService,
                    category: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Specialized">Specialized</SelectItem>
                  <SelectItem value="Traditional">Traditional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center gap-2 pt-2">
                <Switch
                  id="status"
                  checked={selectedService.status === "active"}
                  onCheckedChange={(checked) =>
                    setSelectedService({
                      ...selectedService,
                      status: checked ? "active" : "inactive",
                    })
                  }
                />
                <Label
                  htmlFor="status"
                  className={
                    selectedService.status === "active"
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {selectedService.status === "active" ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={selectedService.description}
              onChange={(e) =>
                setSelectedService({
                  ...selectedService,
                  description: e.target.value,
                })
              }
              placeholder="Enter service package description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Service Inclusions</Label>
            <div className="border rounded-lg p-4 space-y-4">
              {selectedService.inclusions.map(
                (inclusion: any, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="space-y-2">
                      <Label htmlFor={`inclusion-name-${index}`}>Name</Label>
                      <Input
                        id={`inclusion-name-${index}`}
                        value={inclusion.name}
                        onChange={(e) =>
                          updateInclusion(index, "name", e.target.value)
                        }
                        placeholder="Inclusion name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`inclusion-description-${index}`}>
                        Description
                      </Label>
                      <Input
                        id={`inclusion-description-${index}`}
                        value={inclusion.description}
                        onChange={(e) =>
                          updateInclusion(index, "description", e.target.value)
                        }
                        placeholder="Inclusion description"
                      />
                    </div>
                    <div className="flex items-end pb-2">
                      {selectedService.inclusions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeInclusion(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* Add new inclusion form */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4 pt-2 border-t">
                <div className="space-y-2">
                  <Label htmlFor="new-inclusion-name">New Inclusion Name</Label>
                  <Input
                    id="new-inclusion-name"
                    value={newInclusion.name}
                    onChange={(e) =>
                      setNewInclusion({
                        ...newInclusion,
                        name: e.target.value,
                      })
                    }
                    placeholder="E.g., Premium Coffin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-inclusion-description">
                    New Inclusion Description
                  </Label>
                  <Input
                    id="new-inclusion-description"
                    value={newInclusion.description}
                    onChange={(e) =>
                      setNewInclusion({
                        ...newInclusion,
                        description: e.target.value,
                      })
                    }
                    placeholder="E.g., High-quality wooden coffin with silk interior"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={addInclusion}
                    disabled={!newInclusion.name}
                    className="bg-primary/10 hover:bg-primary/20 text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // If it's a new service, generate a unique ID
              if (!selectedService.id) {
                selectedService.id = Date.now().toString();
              }

              // Update existing service or add new service
              const serviceIndex = filteredServices.findIndex(
                (s) => s.id === selectedService.id
              );

              if (serviceIndex > -1) {
                // Update existing service
                const updatedServices = [...filteredServices];
                updatedServices[serviceIndex] = selectedService;
                setFilteredServices(updatedServices);
              } else {
                // Add new service
                setFilteredServices([...filteredServices, selectedService]);
              }

              // Close dialog
              setIsEditDialogOpen(false);
            }}
            disabled={
              !selectedService.name ||
              selectedService.price <= 0 ||
              selectedService.inclusions.length === 0
            }
          >
            {selectedService.id ? "Save Changes" : "Create Package"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditService;
