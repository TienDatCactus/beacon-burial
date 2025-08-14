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
import { News, NewsCategory } from "@/lib/api/news";
import { useNewsManagement } from "@/lib/hooks/useNews";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface EditDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedNews: News | null;
  setFilteredNews: (callback: () => void) => void;
  setSelectedNews: (news: News | null) => void;
  categories: NewsCategory[];
}

const EditDialog: FC<EditDialogProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedNews,
  setFilteredNews,
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
      status: "active", // Default status
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Update form data when selected news changes
  useEffect(() => {
    if (selectedNews) {
      setFormData(selectedNews);
      setImageFile(null);
    } else {
      setFormData({
        category: undefined,
        title: "",
        slug: "",
        summary: "",
        content: "",
        status: "active", // Default status
      });
      setImageFile(null);
    }
  }, [selectedNews, isEditDialogOpen]);

  // Slug generation utility
  const generateSlugFromTitle = (title: string) => {
    return (
      title
        .toLowerCase()
        // Normalize Vietnamese characters (remove diacritics)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // Handle specific Vietnamese characters
        .replace(/[đĐ]/g, "d")
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
        .replace(/[èéẹẻẽêềếệểễ]/g, "e")
        .replace(/[ìíịỉĩ]/g, "i")
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
        .replace(/[ùúụủũưừứựửữ]/g, "u")
        .replace(/[ỳýỵỷỹ]/g, "y")
        // Remove any non-alphanumeric characters
        .replace(/[^a-z0-9\s-]/g, "")
        // Replace spaces with hyphens
        .replace(/\s+/g, "-")
        // Replace multiple hyphens with a single hyphen
        .replace(/-+/g, "-")
        // Trim hyphens from start and end
        .replace(/^-+|-+$/g, "")
    );
  };

  // Button handler to manually generate slug
  const handleGenerateSlug = () => {
    if (!formData.title) {
      toast.error("Vui lòng nhập tiêu đề trước");
      return;
    }

    const slug = generateSlugFromTitle(formData.title);
    setFormData((prev) => ({ ...prev, slug }));

    // Clear any slug errors
    if (errors.slug) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.slug;
        return newErrors;
      });
    }
  };

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

      // Generate slug from title if appropriate
      if (name === "title") {
        // Only auto-generate slug if it's empty or if we're creating a new post
        const shouldGenerateSlug =
          !prev._id || !prev.slug || prev.slug.trim() === "";

        if (shouldGenerateSlug) {
          updatedForm.slug = generateSlugFromTitle(value);
        }
      }

      return updatedForm;
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Store single file object for upload
    setImageFile(files[0]);

    // Clear any image errors
    if (errors.image) {
      setErrors({
        ...errors,
        image: "",
      });
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev: Partial<News>) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Remove the selected image file
  const removeImage = () => {
    setImageFile(null);
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

    // Require image for new news posts
    if (!formData._id && !imageFile) {
      newErrors.image = "Vui lòng thêm ảnh đại diện";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isNewNews = !formData._id || formData._id === "";
    setIsUploading(true);

    try {
      // Prepare form data with file
      const newsData: any = {
        title: formData.title!,
        slug: formData.slug,
        category: formData.category as "Hướng dẫn" | "Kiến thức" | "Chính sách",
        summary: formData.summary!,
        content: formData.content!,
        status: formData.status || "active",
      };

      // Only include file if a new image was selected
      if (imageFile) {
        newsData.file = imageFile; // Single file, not files array
      }

      let result;

      if (isNewNews) {
        result = await createNews(newsData);
      } else {
        result = await updateNews(formData._id!, newsData);
      }

      if (result) {
        toast.success(
          isNewNews
            ? "Tin tức đã được tạo thành công!"
            : "Tin tức đã được cập nhật thành công!"
        );

        setFilteredNews(() => {}); // Trigger refresh callback
        setIsEditDialogOpen(false);

        if (isNewNews) {
          // Reset form
          setFormData({
            category: undefined,
            title: "",
            slug: "",
            summary: "",
            content: "",
            status: "active",
          });
          setImageFile(null);
        } else {
          setSelectedNews(null);
        }
      }
    } catch (error) {
      console.error("Error saving news:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : isNewNews
          ? "Không thể tạo tin tức"
          : "Không thể cập nhật tin tức"
      );
    } finally {
      setIsUploading(false);
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

          {/* Slug with generate button */}
          <div className="grid gap-2">
            <Label htmlFor="slug" className="flex items-center gap-1">
              Slug <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                name="slug"
                value={formData.slug || ""}
                onChange={handleInputChange}
                className={cn("flex-1", errors.slug ? "border-red-500" : "")}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateSlug}
                size="sm"
              >
                Tạo từ tiêu đề
              </Button>
            </div>
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
                className={cn(
                  "w-full",
                  errors.category ? "border-red-500" : ""
                )}
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
            <Label htmlFor="image" className="flex items-center gap-1">
              Ảnh đại diện
              {!formData._id && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={errors.image ? "border-red-500" : ""}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Chọn ảnh từ máy tính của bạn
            </p>

            {/* File upload preview */}
            {imageFile && (
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-1">Ảnh mới đã chọn:</h4>
                <div className="flex gap-2">
                  <div className="relative group">
                    <div className="h-28 w-28 border rounded-md bg-gray-50 flex items-center justify-center p-1">
                      <Image
                        height={100}
                        width={100}
                        src={URL.createObjectURL(imageFile)}
                        alt={imageFile.name}
                        className="object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Existing image */}
            {!imageFile && formData.image && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-1">Ảnh hiện tại:</h4>
                <div className="flex gap-2">
                  <div className="relative group">
                    <Image
                      src={formData.image}
                      alt="Ảnh đại diện"
                      width={120}
                      height={120}
                      className="object-cover w-28 h-28 max-h-28 rounded-md border"
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "/icons/image-off.svg")
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsEditDialogOpen(false)}
            disabled={isUploading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isUploading || creating || updating}
          >
            {isUploading || creating || updating ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                Đang xử lý...
              </>
            ) : formData._id ? (
              "Cập nhật"
            ) : (
              "Thêm bài viết"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
