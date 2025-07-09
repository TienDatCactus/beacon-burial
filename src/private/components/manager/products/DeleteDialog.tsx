import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
const DeleteDialog: React.FC<{
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedProduct: any;
  deleteProduct: () => void;
}> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedProduct,
  deleteProduct,
}) => {
  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center p-4 bg-gray-50 rounded-md border">
          <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100 mr-4">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{selectedProduct.name}</h4>
            <p className="text-sm text-gray-500">{selectedProduct.sku}</p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={deleteProduct}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
