import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "木屿宠物洗护 | 温柔洗护与安心美容",
  description:
    "木屿宠物洗护提供温和洗护、精细修毛、独立吹护和基础护理，让猫狗在安静洁净的环境里完成舒适洗护。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Noto+Serif+SC:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
