"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import NoneHomeHeader from "./non-home-header";

export function PathAwareHeader() {
  const pathname = usePathname();
  return pathname === "/home" ? <Header /> : <NoneHomeHeader />;
}
