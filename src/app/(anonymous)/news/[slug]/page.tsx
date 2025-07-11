"use client";

import { Button } from "@/components/ui/button";
import { NewsItem } from "@/lib/interfaces";
import { ArrowLeftIcon, CalendarIcon, TagIcon, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Hướng dẫn tổ chức tang lễ theo truyền thống Việt Nam",
    slug: "huong-dan-to-chuc-tang-le-theo-truyen-thong-viet-nam",
    summary:
      "Tìm hiểu các nghi thức và truyền thống trong tang lễ Việt Nam và cách tổ chức sao cho trang trọng, đúng phong tục.",
    content: `
      <h2>Nghi thức truyền thống trong tang lễ Việt Nam</h2>
      <p>Tang lễ Việt Nam là một nghi thức quan trọng thể hiện lòng hiếu thảo và sự tôn kính với người đã khuất. Bài viết này sẽ hướng dẫn chi tiết về các bước tổ chức tang lễ theo phong tục truyền thống.</p>
      <h3>Các bước chuẩn bị</h3>
      <p>Khi người thân qua đời, gia đình cần thực hiện các bước sau:</p>
      <ul>
        <li>Thông báo cho người thân, họ hàng</li>
        <li>Chuẩn bị quan tài và các đồ cần thiết cho tang lễ</li>
        <li>Sắp xếp lịch tang lễ và chọn ngày tốt theo phong tục</li>
        <li>Mời thầy cúng hoặc người có kinh nghiệm hướng dẫn các nghi thức</li>
      </ul>
      
      <h3>Nghi thức cúng bái</h3>
      <p>Các nghi thức cúng bái trong tang lễ Việt Nam thường bao gồm:</p>
      <ul>
        <li>Lễ nhập quan: đưa người mất vào quan tài</li>
        <li>Lễ thành phục: con cháu mặc đồ tang</li>
        <li>Lễ cầu siêu: cầu nguyện cho linh hồn người mất được siêu thoát</li>
        <li>Lễ động quan: di chuyển quan tài ra khỏi nhà</li>
        <li>Lễ hạ huyệt: đưa quan tài xuống mộ</li>
      </ul>
      
      <h3>Thời gian để tang</h3>
      <p>Theo truyền thống, thời gian để tang thường là:</p>
      <ul>
        <li>Con để tang cha mẹ: 3 năm (hiện đại hóa còn 49 ngày hoặc 100 ngày)</li>
        <li>Vợ để tang chồng hoặc chồng để tang vợ: 1-3 năm</li>
        <li>Cháu để tang ông bà: 1 năm</li>
      </ul>
      
      <h3>Trang phục tang lễ</h3>
      <p>Trang phục trong tang lễ có ý nghĩa quan trọng, thể hiện mối quan hệ với người mất:</p>
      <ul>
        <li>Con trai trưởng: áo tang trắng, khăn tang trắng, áo màu xanh bên trong</li>
        <li>Con trai thứ: áo tang trắng, khăn tang trắng, áo màu đen bên trong</li>
        <li>Con gái, con dâu: áo tang trắng, khăn tang trắng, dây rơm</li>
        <li>Cháu nội: áo tang vải thô màu vàng nhạt</li>
        <li>Họ hàng xa: băng vải trắng quấn cánh tay</li>
      </ul>
      
      <h3>Kiêng kỵ trong tang lễ</h3>
      <p>Khi tổ chức tang lễ, có một số kiêng kỵ cần lưu ý:</p>
      <ul>
        <li>Không được khóc lóc quá mức khi lau rửa thi thể người mất</li>
        <li>Không đặt di ảnh người mất lên ban thờ khi chưa mãn tang</li>
        <li>Không mở cửa sổ phòng đặt quan tài</li>
        <li>Tránh mặc quần áo màu đỏ, vàng sáng khi đi viếng</li>
        <li>Không dùng đũa cắm thẳng vào bát cơm khi đi viếng</li>
      </ul>
      
      <h3>Hiện đại hóa tang lễ</h3>
      <p>Ngày nay, tang lễ Việt Nam đã có nhiều thay đổi để phù hợp với cuộc sống hiện đại:</p>
      <ul>
        <li>Thời gian để tang được rút ngắn</li>
        <li>Đơn giản hóa nhiều nghi thức rườm rà</li>
        <li>Sử dụng dịch vụ tang lễ chuyên nghiệp</li>
        <li>Hỏa táng thay vì địa táng truyền thống</li>
        <li>Kết hợp các yếu tố hiện đại và truyền thống</li>
      </ul>
    `,
    coverImage: "/images/pexels-kseniachernaya-8986709.jpg",
    author: "Nguyễn Văn A",
    publishedAt: new Date("2023-10-15"),
    tags: ["truyền thống", "tang lễ", "nghi thức"],
    isPublished: true,
    category: "Hướng dẫn",
  },
  {
    id: "2",
    title: "Ý nghĩa của các loài hoa trong tang lễ",
    slug: "y-nghia-cua-cac-loai-hoa-trong-tang-le",
    summary:
      "Khám phá ý nghĩa sâu sắc đằng sau các loài hoa thường được sử dụng trong tang lễ và cách chọn hoa phù hợp.",
    content: `
      <h2>Ý nghĩa của các loài hoa trong tang lễ</h2>
      <p>Hoa không chỉ là vật trang trí trong tang lễ mà còn mang nhiều ý nghĩa tâm linh và văn hóa sâu sắc. Từ xưa đến nay, việc dâng hoa trong tang lễ là một cách để thể hiện lòng tôn kính, niềm tiếc thương và sự an ủi đối với gia đình người mất.</p>

      <h3>Hoa cúc trắng</h3>
      <p>Hoa cúc trắng tượng trưng cho sự tinh khiết, chân thành và lòng tôn kính. Trong văn hóa phương Đông, đặc biệt là Việt Nam, hoa cúc trắng thường được sử dụng nhiều nhất trong tang lễ. Loài hoa này còn tượng trưng cho sự trường tồn của linh hồn sau khi đã rời bỏ cõi trần.</p>
      <p>Cách sử dụng phổ biến:</p>
      <ul>
        <li>Vòng hoa viếng với hoa cúc trắng là chủ đạo</li>
        <li>Bình hoa trang trí xung quanh di ảnh</li>
        <li>Rải hoa cúc trắng quanh quan tài</li>
      </ul>

      <h3>Hoa ly</h3>
      <p>Hoa ly, đặc biệt là hoa ly trắng, thể hiện sự thanh cao và linh hồn trở về cõi vĩnh hằng. Hoa ly còn tượng trưng cho sự thanh khiết của tâm hồn. Trong các tang lễ phương Tây, hoa ly trắng thường là loại hoa chủ đạo.</p>
      <p>Hoa ly có sáu cánh, tượng trưng cho sáu điều mà người đã khuất mang theo:</p>
      <ul>
        <li>Tình yêu</li>
        <li>Niềm tin</li>
        <li>Sự tha thứ</li>
        <li>Lòng trắc ẩn</li>
        <li>Sự can đảm</li>
        <li>Lòng biết ơn</li>
      </ul>

      <h3>Hoa hồng trắng</h3>
      <p>Hoa hồng trắng biểu tượng cho sự thuần khiết, vô tội, và là lời tạm biệt đầy tôn kính. Loài hoa này thường được sử dụng trong tang lễ của những người trẻ tuổi hoặc phụ nữ.</p>
      <p>Kết hợp hoa hồng trắng với các loại hoa khác còn mang những ý nghĩa đặc biệt:</p>
      <ul>
        <li>Hồng trắng và đỏ: tình yêu vượt qua ranh giới sự sống và cái chết</li>
        <li>Hồng trắng và tím: sự tôn kính và lòng thành kính</li>
      </ul>

      <h3>Hoa lan</h3>
      <p>Trong văn hóa phương Đông, đặc biệt là Trung Quốc và Việt Nam, hoa lan tượng trưng cho sự cao quý, thanh lịch và tình bạn vĩnh cửu. Hoa lan trắng thường được dùng trong tang lễ để tượng trưng cho sự tôn kính và niềm tiếc thương sâu sắc.</p>
      <p>Các loại hoa lan phổ biến trong tang lễ:</p>
      <ul>
        <li>Lan hồ điệp trắng: sự vĩnh hằng và thanh khiết</li>
        <li>Lan vũ nữ: sự thanh cao và tinh tế</li>
      </ul>

      <h3>Hoa cẩm chướng</h3>
      <p>Hoa cẩm chướng trắng tượng trưng cho tình yêu thuần khiết. Trong các tang lễ, hoa cẩm chướng còn mang ý nghĩa là lòng tiếc thương và kỷ niệm khó quên. Vì độ bền của mình, hoa cẩm chướng còn tượng trưng cho tình cảm vĩnh cửu.</p>

      <h3>Các loại hoa khác</h3>
      <p>Ngoài ra, các loài hoa như hoa huệ (biểu tượng cho linh hồn được trở về với Chúa), hoa lay ơn (tượng trưng cho sự mạnh mẽ trong tâm hồn), và hoa đồng tiền trắng (biểu thị cho sự bình an) cũng thường được sử dụng trong tang lễ với những ý nghĩa riêng.</p>

      <h3>Lưu ý khi chọn hoa viếng</h3>
      <p>Khi lựa chọn hoa để viếng tang lễ, có một số điều nên lưu ý:</p>
      <ul>
        <li>Nên chọn hoa có màu trắng hoặc màu nhạt, tránh màu sặc sỡ</li>
        <li>Vòng hoa nên có kích thước phù hợp, không quá lớn hoặc quá nhỏ</li>
        <li>Tránh chọn hoa có mùi hương quá nồng</li>
        <li>Tìm hiểu phong tục địa phương trước khi chọn loại hoa</li>
        <li>Tham khảo ý kiến của gia đình người mất nếu có thể</li>
      </ul>

      <h3>Kết luận</h3>
      <p>Việc hiểu rõ ý nghĩa của các loài hoa trong tang lễ không chỉ giúp chúng ta thể hiện lòng tôn kính đối với người đã khuất một cách phù hợp, mà còn là cách để chia sẻ nỗi đau với gia đình họ. Mỗi loài hoa đều mang một thông điệp riêng, và việc lựa chọn đúng loài hoa sẽ giúp chúng ta bày tỏ cảm xúc chân thành nhất trong những giây phút đau buồn.</p>
    `,
    coverImage: "/images/image-45-840x840.jpg",
    author: "Lê Thị B",
    publishedAt: new Date("2023-11-05"),
    tags: ["hoa tang lễ", "ý nghĩa", "văn hóa"],
    isPublished: true,
    category: "Kiến thức",
  },
  {
    id: "3",
    title: "Chính sách hỗ trợ chi phí mai táng từ bảo hiểm xã hội",
    slug: "chinh-sach-ho-tro-chi-phi-mai-tang-tu-bao-hiem-xa-hoi",
    summary:
      "Thông tin về các chính sách hỗ trợ chi phí mai táng từ bảo hiểm xã hội và cách thức đăng ký nhận trợ cấp.",
    content: `
      <h2>Chính sách hỗ trợ chi phí mai táng từ bảo hiểm xã hội</h2>
      <p>Người lao động tham gia bảo hiểm xã hội và thân nhân của họ có thể được hưởng trợ cấp mai táng khi không may qua đời. Bài viết này sẽ cung cấp thông tin chi tiết về chính sách này và hướng dẫn cách thức đăng ký nhận trợ cấp.</p>

      <h3>Đối tượng được hưởng</h3>
      <p>Theo quy định hiện hành, các đối tượng sau đây được hưởng trợ cấp mai táng:</p>
      <ol>
        <li><strong>Người lao động đang tham gia BHXH bắt buộc</strong>: Khi người lao động đang đóng BHXH bắt buộc qua đời, thân nhân sẽ được nhận trợ cấp mai táng.</li>
        <li><strong>Người đang hưởng lương hưu</strong>: Khi người đang hưởng lương hưu qua đời, thân nhân sẽ được nhận trợ cấp mai táng.</li>
        <li><strong>Người đang hưởng trợ cấp BHXH hàng tháng</strong>: Bao gồm người đang hưởng trợ cấp tai nạn lao động, bệnh nghề nghiệp hàng tháng hoặc trợ cấp hàng tháng khác.</li>
        <li><strong>Người lao động đang hưởng chế độ ốm đau</strong>: Người lao động đang trong thời gian hưởng chế độ ốm đau đối với người lao động bị ốm thường hoặc con ốm mà qua đời.</li>
        <li><strong>Người lao động đang nghỉ việc hưởng chế độ thai sản</strong>: Người lao động đang nghỉ việc hưởng chế độ thai sản theo quy định của pháp luật về BHXH mà qua đời.</li>
      </ol>

      <h3>Mức trợ cấp</h3>
      <p>Mức trợ cấp mai táng phí được quy định dựa trên lương cơ sở:</p>
      <ul>
        <li>Theo quy định tại Điều 66 Luật BHXH 2014, trợ cấp mai táng bằng 10 lần mức lương cơ sở tại tháng mà người tham gia BHXH qua đời.</li>
        <li>Từ ngày 01/07/2023, mức lương cơ sở là 1.800.000 đồng/tháng.</li>
        <li>Như vậy, mức trợ cấp mai táng hiện nay là: 10 x 1.800.000 = 18.000.000 đồng.</li>
      </ul>

      <h3>Thủ tục đăng ký</h3>
      <p>Để nhận được trợ cấp mai táng, người thân cần chuẩn bị các giấy tờ sau:</p>
      
      <h4>Hồ sơ cần chuẩn bị:</h4>
      <ol>
        <li><strong>Tờ khai của người có liên quan</strong>: Sử dụng mẫu số 09-HSB (ban hành kèm theo Quyết định số 166/QĐ-BHXH).</li>
        <li><strong>Giấy chứng tử hoặc Giấy báo tử</strong>: Bản chính hoặc bản sao có chứng thực của người tham gia BHXH đã qua đời.</li>
        <li><strong>Trường hợp người nhận trợ cấp không phải thân nhân</strong>: Cần có giấy ủy quyền của thân nhân (mẫu số 13-HSB) hoặc giấy xác nhận của UBND cấp xã về việc đã tổ chức mai táng.</li>
      </ol>

      <h4>Nơi nộp hồ sơ:</h4>
      <ul>
        <li>Cơ quan BHXH tỉnh/huyện nơi cư trú của người tham gia BHXH đã qua đời.</li>
        <li>Có thể nộp trực tiếp hoặc qua dịch vụ bưu chính.</li>
        <li>Trường hợp đặc biệt có thể nộp qua đơn vị sử dụng lao động nơi người tham gia BHXH làm việc trước khi qua đời.</li>
      </ul>

      <h4>Thời hạn giải quyết:</h4>
      <ul>
        <li>Trong thời hạn 05 ngày làm việc kể từ ngày nhận đủ hồ sơ theo quy định.</li>
        <li>Trường hợp từ chối, cơ quan BHXH phải trả lời bằng văn bản và nêu rõ lý do.</li>
      </ul>

      <h3>Một số lưu ý quan trọng</h3>
      <ul>
        <li><strong>Thời hiệu yêu cầu</strong>: Thời hiệu để giải quyết hưởng trợ cấp mai táng là 12 tháng kể từ ngày người tham gia BHXH qua đời.</li>
        <li><strong>Người nhận trợ cấp</strong>: Là người tổ chức mai táng. Trong trường hợp nhiều người cùng tổ chức mai táng thì ủy quyền cho một người đại diện nhận trợ cấp.</li>
        <li><strong>Trường hợp mất tích</strong>: Nếu người tham gia BHXH bị Tòa án tuyên bố là đã chết, thời hiệu hưởng trợ cấp mai táng được tính từ ngày ghi trong bản án hoặc quyết định có hiệu lực pháp luật.</li>
      </ul>

      <h3>Hướng dẫn thêm</h3>
      <p>Để biết thêm thông tin chi tiết hoặc được hướng dẫn cụ thể, người dân có thể:</p>
      <ul>
        <li>Liên hệ trực tiếp với cơ quan BHXH nơi cư trú</li>
        <li>Gọi đến đường dây nóng của BHXH Việt Nam: 1900 9068</li>
        <li>Truy cập trang web chính thức của BHXH Việt Nam: https://baohiemxahoi.gov.vn</li>
      </ul>

      <h3>Kết luận</h3>
      <p>Chính sách hỗ trợ chi phí mai táng từ BHXH là một trong những chính sách an sinh xã hội quan trọng, giúp giảm bớt gánh nặng tài chính cho gia đình người lao động trong những thời điểm khó khăn. Việc nắm rõ quy định và thủ tục đăng ký sẽ giúp người dân tiếp cận được quyền lợi của mình một cách thuận lợi nhất.</p>
    `,
    coverImage: "/images/pexels-sora-shimazaki-5668886.jpg",
    author: "Phạm Văn C",
    publishedAt: new Date("2023-12-10"),
    tags: ["bảo hiểm xã hội", "trợ cấp", "chi phí mai táng"],
    isPublished: true,
    category: "Chính sách",
  },
];

export default function NewsDetail() {
  const slug = useParams().slug as string;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

  // Find news item by slug
  useEffect(() => {
    const foundItem = mockNews.find((item) => item.slug === slug);

    if (foundItem) {
      setNewsItem(foundItem);

      // Find related news based on category and tags
      const related = mockNews
        .filter(
          (item) =>
            item.id !== foundItem.id &&
            (item.category === foundItem.category ||
              item.tags.some((tag) => foundItem.tags.includes(tag)))
        )
        .slice(0, 3);

      setRelatedNews(related);
    }
  }, [slug]);

  if (!newsItem) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Không tìm thấy bài viết</h1>
        <Button asChild>
          <Link href="/news">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Quay lại tin tức
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      {/* Back button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="/news"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Quay lại tin tức
          </Link>
        </Button>
      </div>

      {/* Article header */}
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {newsItem.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <User2Icon className="h-4 w-4" />
            <span>{newsItem.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {new Date(newsItem.publishedAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 bg-muted rounded text-xs">
              {newsItem.category}
            </span>
          </div>
        </div>

        <div className="mb-6 text-lg text-muted-foreground">
          <p>{newsItem.summary}</p>
        </div>

        {/* Cover image */}
        {newsItem.coverImage && (
          <div className="w-full h-64 md:h-96 mb-8">
            <Image
              width={800}
              height={400}
              src={newsItem.coverImage}
              alt={newsItem.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Article content */}
      <div className="max-w-3xl mx-auto">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />

        {/* Tags */}
        {newsItem.tags && newsItem.tags.length > 0 && (
          <div className="flex items-start gap-2 mt-8 border-t pt-6">
            <TagIcon className="h-5 w-5 mt-1 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/news?tag=${tag}`}
                  className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related articles */}
      {relatedNews.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.slug}`}
                className="block transition-transform hover:-translate-y-1"
              >
                <div className="border rounded-lg overflow-hidden hover:shadow-md h-full">
                  {news.coverImage && (
                    <div className="h-40">
                      <Image
                        width={400}
                        height={200}
                        src={news.coverImage}
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {news.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
