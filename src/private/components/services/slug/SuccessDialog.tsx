import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import React from "react";
const SuccessDialog: React.FC<{
  isSuccessDialogOpen: boolean;
  setIsSuccessDialogOpen: (open: boolean) => void;
}> = ({ isSuccessDialogOpen, setIsSuccessDialogOpen }) => {
  return (
    <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <DialogTitle className="text-center mb-2">
            Đặt dịch vụ thành công!
          </DialogTitle>
          <DialogDescription className="text-center mb-6">
            Cảm ơn bạn đã sử dụng dịch vụ của Thiên An Lạc. Chúng tôi sẽ liên hệ
            với bạn trong thời gian sớm nhất để xác nhận chi tiết.
          </DialogDescription>
          <Button onClick={() => setIsSuccessDialogOpen(false)}>Đã hiểu</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
