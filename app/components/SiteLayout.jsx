"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/NewComponent/nav/Navbar";
import Footer from "@/NewComponent/footer/Footer";

export default function SiteLayout({ children }) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}