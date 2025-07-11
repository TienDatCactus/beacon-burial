import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/shared/components/layouts/footer";
import { PathAwareHeader } from "@/shared/components/layouts/path-aware";
import { Merriweather } from "next/font/google";
import { Suspense } from "react";
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata = {
  title: "Thiên An Lạc",
  description: "Thiên An Lạc - Dịch vụ tang lễ trọn gói",
  keywords: [
    "funeral",
    "burial",
    "memorial",
    "services",
    "Thiên An Lạc",
    "tang lễ",
    "dịch vụ tang lễ",
    "trọn gói",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense fallback={<div>Loading...</div>}>
        <body className={` ${merriweather.className} antialiased`}>
          <PathAwareHeader />
          {children}
          <Footer />
          <Toaster richColors />
        </body>
      </Suspense>
    </html>
  );
}
