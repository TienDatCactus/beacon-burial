import { Button } from "@/components/ui/button";
import { ChevronDown, MoveRight } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
const CartBreadcrumps: React.FC = () => {
  const pathname = usePathname();

  const checkUrlStep = () => {
    switch (pathname) {
      case "/cart":
        return "1";
      case "/checkout":
        return "2";
      case "/checkout/success":
        return "3";
      default:
        return "1";
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-4 items-center my-12">
        <h1 className="text-6xl font-serif text-center ">Giỏ hàng</h1>
        <ChevronDown />
      </div>
      <div className="flex space-x-4 justify-center items-center pb-20 pt-10">
        <div
          className={`${
            checkUrlStep() == "1" ? "font-bold" : "text-neutral-400"
          } flex items-center space-x-2`}
        >
          <Button
            className={`${checkUrlStep() == "1" ? "" : "bg-gray-600"}`}
            size={"icon"}
          >
            1
          </Button>
          <span>Giỏ hàng</span>
        </div>
        <MoveRight className="text-neutral-400" />
        <div
          className={`${
            checkUrlStep() == "2" ? "font-bold" : "text-neutral-400"
          } flex items-center space-x-2`}
        >
          <Button
            className={`${checkUrlStep() == "2" ? "" : "bg-gray-600"}`}
            size={"icon"}
          >
            2
          </Button>
          <span>Phương thức Thanh toán</span>
        </div>
        <MoveRight className="text-neutral-400" />
        <div
          className={`${
            checkUrlStep() == "3" ? "font-bold" : "text-neutral-400"
          } flex items-center space-x-2`}
        >
          <Button
            size={"icon"}
            className={`${checkUrlStep() == "3" ? "" : "bg-gray-600"}`}
          >
            3
          </Button>
          <span>Hoàn tất</span>
        </div>
      </div>
    </>
  );
};

export default CartBreadcrumps;
