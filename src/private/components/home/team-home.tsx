import React from "react";
import TeamCard from "./elements/TeamCard";
const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Nguyễn Văn Minh",
      role: "Giám đốc điều hành",
      image: "/images/pexels-sora-shimazaki-5668886.jpg",
      social: {
        facebook: "https://facebook.com/nguyenvanminh",
        linkedin: "https://linkedin.com/in/nguyenvanminh",
      },
    },
    {
      name: "Trần Thị Hương",
      role: "Quản lý dịch vụ",
      image: "/images/pexels-sora-shimazaki-5668886.jpg",
      social: {
        facebook: "https://facebook.com/tranthuong",
        linkedin: "https://linkedin.com/in/tranthuong",
      },
    },
    {
      name: "Lê Đức Thành",
      role: "Giám đốc tang lễ",
      image: "/images/pexels-sora-shimazaki-5668886.jpg",
      social: {
        facebook: "https://facebook.com/leducthanh",
        twitter: "https://twitter.com/leducthanh",
      },
    },
    {
      name: "Phạm Thanh Hà",
      role: "Trợ lý chuyên nghiệp",
      image: "/images/pexels-sora-shimazaki-5668886.jpg",
      social: {
        instagram: "https://instagram.com/phamthanhha",
        linkedin: "https://linkedin.com/in/phamthanhha",
      },
    },
  ];
  return (
    <section className="max-w-[125rem] flex flex-col justify-center items-center mx-auto p-20 space-y-10 bg-primary-foreground/10">
      <div className=" items-start flex">
        <div className="w-1/4 space-y-2">
          <p className="text-sm">Đội ngũ của chúng tôi</p>
          <h1 className="text-5xl font-semibold">Ban quản trị</h1>
        </div>
        <p className="text-gray-600 w-1/2 text-base ">
          Đội ngũ giám đốc tang lễ, quản lý dịch vụ và trợ lý chuyên nghiệp,
          giàu kinh nghiệm của chúng tôi sẽ hỗ trợ tận tình và chu đáo trong mọi
          tình huống.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} index={index} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
