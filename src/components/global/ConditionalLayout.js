"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/global/header/Header";
import Footer from "@/components/global/footer/Footer";
import { Toaster } from "react-hot-toast";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  // Agar aapka route kuch aur hai (e.g., '/auth/login'), toh isko update kar lena
  //   const isLoginPage = pathname === "/user/login";
  const isLoginPage = [
    "/user/login",
    "/user/forgot-password",
    "/user/register",
  ].includes(pathname);

  return (
    <>
      {/* Agar login page nahi hai, tabhi Header dikhega */}
      {!isLoginPage && <Header />}

      {/* Main content hamesha dikhega */}
      <main>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </main>

      {/* Agar login page nahi hai, tabhi Footer dikhega */}
      {!isLoginPage && <Footer />}
    </>
  );
}
