import React from "react";
const loading: React.FC = () => {
  return (
    <div className="container h-screen mx-auto px-4 py-16 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-4 text-gray-600">Đang tải...</span>
    </div>
  );
};

export default loading;
