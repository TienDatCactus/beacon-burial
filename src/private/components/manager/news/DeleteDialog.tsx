import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NewsItem } from "@/lib/interfaces";
import { AlertTriangleIcon } from "lucide-react";
import React, { FC } from "react";

interface DeleteDialogProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedNews: NewsItem | null;
  deleteNews: () => void;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedNews,
  deleteNews,
}) => {
  if (!selectedNews) return null;

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-red-500" />
            <span>Xác nhận xóa bài viết</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="py-4">
          <p className="mb-2">Bạn có chắc chắn muốn xóa bài viết sau đây?</p>
          <div className="p-4 border rounded-md bg-muted/50 mt-2">
            <p className="font-medium">{selectedNews.title}</p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {selectedNews.summary}
            </p>
          </div>
          <p className="mt-4 text-sm text-red-500">
            Lưu ý: Hành động này không thể hoàn tác.
          </p>
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Hủy
          </Button>
          <Button variant="destructive" onClick={deleteNews}>
            Xóa bài viết
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
