import { redirect } from "next/navigation";
import React from "react";
const page: React.FC = () => {
  return redirect("/home");
};

export default page;
