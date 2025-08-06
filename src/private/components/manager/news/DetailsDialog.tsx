import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { News } from "@/lib/interfaces";
import { CalendarIcon, TagIcon, User2Icon } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";

interface DetailsDialogProps {
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  selectedNews: News | null;
  togglePublishStatus: (newsId: string, newStatus: boolean) => void;
  editNews: (news: News) => void;
}

const DetailsDialog: FC<DetailsDialogProps> = ({
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedNews,
  togglePublishStatus,
  editNews,
}) => {
  if (!selectedNews) return null;

  return (
    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {selectedNews.title}
          </DialogTitle>
        </DialogHeader>

        {/* Cover image */}
        {selectedNews.image && (
          <div className="w-full h-64 mb-4 overflow-hidden rounded-md">
            <Image
              width={700}
              height={400}
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* News metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User2Icon className="h-4 w-4" />
            <span>{selectedNews.slug}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>
              Ngày đăng:{" "}
              {new Date(selectedNews.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>
          {selectedNews.updated_at && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>
                Cập nhật:{" "}
                {new Date(selectedNews.updated_at).toLocaleDateString("vi-VN")}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 bg-muted rounded text-xs">
              {selectedNews.category}
            </span>
          </div>
        </div>

        {/* News summary */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Tóm tắt:</h3>
          <p className="text-muted-foreground">{selectedNews.summary}</p>
        </div>

        {/* News content */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Nội dung:</h3>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedNews.content }}
          />
        </div>

        {/* Tags */}
        {/* {selectedNews.tags && selectedNews.tags.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1 flex items-center gap-1">
              <TagIcon className="h-4 w-4" />
              <span>Tags:</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedNews.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )} */}

        {/* Publication status */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Trạng thái:</h3>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                selectedNews.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {selectedNews.status === "active" ? "Đã đăng" : "Nháp"}
            </span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() =>
              togglePublishStatus(
                selectedNews._id,
                selectedNews.status !== "active"
              )
            }
          >
            {selectedNews.status === "active" ? "Hủy đăng" : "Đăng"}
          </Button>
          <Button
            onClick={() => {
              setIsViewDialogOpen(false);
              editNews(selectedNews);
            }}
          >
            Chỉnh sửa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
