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
import { NewsCategory, NewsItem } from "@/lib/interfaces";
import { CalendarIcon } from "lucide-react";
import React, { FC, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

interface EditDialogProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedNews: NewsItem | null;
  setFilteredNews: (news: NewsItem[]) => void;
  filteredNews: NewsItem[];
  setSelectedNews: (news: NewsItem | null) => void;
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
  const [formData, setFormData] = useState<Partial<NewsItem>>(
    selectedNews || {
      id: "",
      title: "",
      slug: "",
      summary: "",
      content: "",
      coverImage: "",
      author: "",
      publishedAt: new Date(),
      tags: [],
      isPublished: false,
      category: categories[0]?.name || "",
    }
  );

  const [tagsInput, setTagsInput] = useState(
    (selectedNews?.tags || []).join(", ")
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when selected news changes
  React.useEffect(() => {
    if (selectedNews) {
      setFormData(selectedNews);
      setTagsInput((selectedNews.tags || []).join(", "));
    }
  }, [selectedNews]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Generate slug from title if this is the title field
    if (name === "title" && (!formData.slug || formData.slug === "")) {
      const slug = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");

      setFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);

    const tagsArray = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    setFormData((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isPublished: checked,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({
        ...prev,
        publishedAt: date,
      }));
    }
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

    if (!formData.author?.trim()) {
      newErrors.author = "Tác giả không được để trống";
    }

    if (!formData.category?.trim()) {
      newErrors.category = "Danh mục không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const isNewNews = !formData.id || formData.id === "";

    if (isNewNews) {
      // Create new news item
      const newNews: NewsItem = {
        ...formData,
        id: `news-${Date.now()}`,
        publishedAt: formData.publishedAt || new Date(),
        updatedAt: new Date(),
      } as NewsItem;

      setFilteredNews([newNews, ...filteredNews]);
    } else {
      // Update existing news
      const updatedNews = {
        ...formData,
        updatedAt: new Date(),
      } as NewsItem;

      setFilteredNews(
        filteredNews.map((item) =>
          item.id === updatedNews.id ? updatedNews : item
        )
      );

      // Update selected news
      setSelectedNews(updatedNews);
    }

    setIsEditDialogOpen(false);
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {formData.id ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
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

          {/* Author */}
          <div className="grid gap-2">
            <Label htmlFor="author" className="flex items-center gap-1">
              Tác giả <span className="text-red-500">*</span>
            </Label>
            <Input
              id="author"
              name="author"
              value={formData.author || ""}
              onChange={handleInputChange}
              className={errors.author ? "border-red-500" : ""}
            />
            {errors.author && (
              <p className="text-red-500 text-xs mt-1">{errors.author}</p>
            )}
          </div>

          {/* Cover Image */}
          <div className="grid gap-2">
            <Label htmlFor="coverImage">Ảnh đại diện</Label>
            <Input
              id="coverImage"
              name="coverImage"
              value={formData.coverImage || ""}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground">
              Nhập đường dẫn URL của ảnh
            </p>
          </div>

          {/* Tags */}
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              name="tags"
              value={tagsInput}
              onChange={handleTagsChange}
            />
            <p className="text-xs text-muted-foreground">
              Phân tách các tags bằng dấu phẩy (,)
            </p>
          </div>

          {/* Publication Date */}
          <div className="grid gap-2">
            <Label htmlFor="publishedAt">Ngày đăng</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.publishedAt && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.publishedAt ? (
                    format(formData.publishedAt, "PPP", { locale: vi })
                  ) : (
                    <span>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.publishedAt}
                  onSelect={handleDateChange}
                  initialFocus
                  locale={vi}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Publish Status */}
          <div className="flex items-center justify-between gap-2 mt-2">
            <Label htmlFor="isPublished">Đăng bài</Label>
            <Switch
              id="isPublished"
              checked={formData.isPublished || false}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>
            {formData.id ? "Cập nhật" : "Thêm bài viết"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
