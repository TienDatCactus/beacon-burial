import React from "react";
const ServiceTestimonial: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto mt-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl  mb-2">Cảm Nhận Của Các Gia Đình</h2>
        <p className="text-gray-600">
          Niềm tin mà các gia đình đặt vào chúng tôi là vinh dự lớn nhất của
          chúng tôi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="inline-block">
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 italic mb-4">
            &quot;Trong thời gian đau buồn của chúng tôi, đội ngũ nhân viên tại
            Thiên An Lạc đã cung cấp sự chăm sóc và chú ý đặc biệt đến từng chi
            tiết. Gói Hằng Sống đã mang đến cho cha chúng tôi lời từ biệt trang
            trọng mà ông xứng đáng được nhận.&quot;
          </p>
          <p className="font-medium">— Dat Ng.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="inline-block">
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 italic mb-4">
            &quot;Lòng trắc ẩn và sự chuyên nghiệp mà mọi người thể hiện đã
            khiến thời gian khó khăn trở nên dễ dàng hơn nhiều. Buổi lễ truyền
            thống thật đẹp và chính xác là những gì mẹ chúng tôi mong
            muốn.&quot;
          </p>
          <p className="font-medium">— Loc P.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center mb-4">
            <div className="text-amber-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="inline-block">
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-gray-600 italic mb-4">
            &quot;Tôi đánh giá cao giá cả minh bạch và thực tế là không có chi
            phí bất ngờ nào. Dịch vụ hỏa táng được xử lý một cách tôn trọng và
            nghiêm túc.&quot;
          </p>
          <p className="font-medium">— Minh L.</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceTestimonial;
