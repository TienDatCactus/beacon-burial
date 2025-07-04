"use client";
import Footer from "@/shared/components/layouts/footer";
import Header from "@/shared/components/layouts/header";
import NoneHomeHeader from "@/shared/components/layouts/non-home-header";
import { Merriweather } from "next/font/google";
import { usePathname } from "next/navigation";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={` ${merriweather.className} antialiased`}>
        {pathname === "/home" ? <Header /> : <NoneHomeHeader />}
        {children}
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
