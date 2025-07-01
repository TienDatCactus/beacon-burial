import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";
interface DeleteServiceProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedService: {
    id: string;
    name: string;
    description: string;
  };
  deleteService: () => void;
}
const DeleteService: React.FC<DeleteServiceProps> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedService,
  deleteService,
}) => {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Service Package</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this service package? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="font-medium">{selectedService.name}</p>
          <p className="text-sm text-gray-500">{selectedService.description}</p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={deleteService}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteService;
