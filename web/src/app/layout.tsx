import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import Redux from "@/provider/Redux";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zoning Anime Myanmar",
  description: "We are Anime translator ZAM team and please support our teams",
  keywords: ["ZAM translator team", "Zoning Anime Myanmar"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Redux>{children}</Redux>
      </body>
    </html>
  );
}
