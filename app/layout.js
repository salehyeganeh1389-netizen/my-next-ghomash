import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLayout from "./components/SiteLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "قماش شیخ الاسلامی",
  description: "فروشگاه قماش شیخ الاسلامی",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}