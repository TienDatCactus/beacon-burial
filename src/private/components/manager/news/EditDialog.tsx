import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";
import { useNewsManagement } from "@/lib/hooks/useNews";
import {
  CreateNewsData,
  EditNewsData,
  News,
  NewsCategory,
} from "@/lib/api/news";
import { toast } from "sonner";

interface EditDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedNews: News | null;
  setFilteredNews: (callback: () => void) => void; // Changed to callback function
  filteredNews: News[];
  setSelectedNews: (news: News | null) => void;
  categories: NewsCategory[];
}

const EditDialog: FC<EditDialogProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedNews,
  setFilteredNews,
  filteredNews,
  setSelectedNews,
  categories,
}) => {
  // Use the news management hook for API calls
  const { createNews, updateNews, creating, updating } = useNewsManagement();

  const [formData, setFormData] = useState<Partial<News>>(
    selectedNews || {
      category: undefined,
      title: "",
      slug: "",
      summary: "",
      content: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>(
    formData.image || ""
  );
  // Update form data when selected news changes
  React.useEffect(() => {
    if (selectedNews) {
      setFormData(selectedNews);
      setImagePreview(selectedNews.image || "");
    }
  }, [selectedNews]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData((prev: Partial<News>) => {
      const updatedForm = { ...prev, [name]: value };

      if (name === "title" && (!prev.slug || prev.slug.trim() === "")) {
        const slug = value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[đĐ]/g, "d")
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-");

        updatedForm.slug = slug;
      }

      return updatedForm;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev: Partial<News>) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev: Partial<News>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Tiêu đề không được để trống";
    }

    if (!formData.slug?.trim()) {
      newErrors.slug = "Slug không được để trống";
    }

    if (!formData.summary?.trim()) {
      newErrors.summary = "Tóm tắt không được để trống";
    }

    if (!formData.content?.trim()) {
      newErrors.content = "Nội dung không được để trống";
    }

    if (!formData.category?.trim()) {
      newErrors.category = "Danh mục không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isNewNews = !formData._id || formData._id === "";

    try {
      if (isNewNews) {
        // Create new news item using API
        const newsData: CreateNewsData = {
          title: formData.title!,
          category: formData.category as
            | "Hướng dẫn"
            | "Kiến thức"
            | "Chính sách",
          summary: formData.summary!,
          content: formData.content!,
          image: formData.image || "",
        };

        const result = await createNews(newsData);
        if (result) {
          toast.success("Tin tức đã được tạo thành công!");
          setFilteredNews(() => {}); // Trigger refresh callback
          setIsEditDialogOpen(false);
          // Reset form
          setFormData({
            category: undefined,
            title: "",
            slug: "",
            summary: "",
            content: "",
          });
          setImagePreview("");
        }
      } else {
        // Update existing news using API
        const newsData: EditNewsData = {
          title: formData.title!,
          category: formData.category as
            | "Hướng dẫn"
            | "Kiến thức"
            | "Chính sách",
          summary: formData.summary!,
          content: formData.content!,
          image: formData.image || "",
        };

        const result = await updateNews(formData._id!, newsData);
        if (result) {
          toast.success("Tin tức đã được cập nhật thành công!");
          setFilteredNews(() => {}); // Trigger refresh callback
          setSelectedNews(null);
          setIsEditDialogOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving news:", error);
      toast.error(
        isNewNews ? "Không thể tạo tin tức" : "Không thể cập nhật tin tức"
      );
    }
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formData._id ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title" className="flex items-center gap-1">
              Tiêu đề <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>
        </div>
        {/* Slug */}
        <div className="grid gap-2">
          <Label htmlFor="slug" className="flex items-center gap-1">
            Slug <span className="text-red-500">*</span>
          </Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug || ""}
            onChange={handleInputChange}
            className={errors.slug ? "border-red-500" : ""}
          />
          {errors.slug && (
            <p className="text-red-500 text-xs mt-1">{errors.slug}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Slug sẽ được sử dụng trong URL: /news/
            {formData.slug || "your-slug"}
          </p>
        </div>

        {/* Category */}
        <div className="grid gap-2">
          <Label htmlFor="category" className="flex items-center gap-1">
            Danh mục <span className="text-red-500">*</span>
          </Label>
          <Select
            value={formData.category || ""}
            onValueChange={(value) => handleSelectChange(value, "category")}
          >
            <SelectTrigger
              className={cn("w-full", errors.category ? "border-red-500" : "")}
            >
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>

        {/* Summary */}
        <div className="grid gap-2">
          <Label htmlFor="summary" className="flex items-center gap-1">
            Tóm tắt <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="summary"
            name="summary"
            value={formData.summary || ""}
            onChange={handleInputChange}
            rows={3}
            className={errors.summary ? "border-red-500" : ""}
          />
          {errors.summary && (
            <p className="text-red-500 text-xs mt-1">{errors.summary}</p>
          )}
        </div>

        {/* Content */}
        <div className="grid gap-2">
          <Label htmlFor="content" className="flex items-center gap-1">
            Nội dung <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content || ""}
            onChange={handleInputChange}
            rows={8}
            className={errors.content ? "border-red-500" : ""}
          />
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">{errors.content}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Hỗ trợ HTML cơ bản cho định dạng nội dung
          </p>
        </div>
        {/* Cover Image */}
        <div className="grid gap-2">
          <Label htmlFor="coverImage">Ảnh đại diện</Label>
          <Input
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="text-xs text-muted-foreground">
            Chọn ảnh từ máy tính của bạn
          </p>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Xem trước ảnh đại diện"
              className="mt-2 max-h-40 rounded border"
            />
          )}
        </div>

        {/* Publication Date */}
        {/* <div className="grid gap-2">
          <Label htmlFor="publishedAt">Ngày đăng</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.created_at && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.created_at ? (
                  format(formData.created_at, "PPP", { locale: vi })
                ) : (
                  <span>Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  typeof formData.created_at === "string"
                    ? new Date(formData.created_at)
                    : formData.created_at
                }
                onSelect={handleDateChange}
                locale={vi}
              />
            </PopoverContent>
          </Popover>
        </div> */}

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={creating || updating}>
            {creating || updating
              ? "Đang xử lý..."
              : formData._id
              ? "Cập nhật"
              : "Thêm bài viết"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
