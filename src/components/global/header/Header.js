"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react"; // Added useEffect
import {
  Phone,
  Mail,
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

// --- DYNAMIC DATA ---
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/user/about-us" },
  { name: "Products", path: "/user/product", hasMegaMenu: true },
  { name: "Shop", path: "" },
  { name: "Contact Us", path: "/user/contact-us" },
];

const megaMenuProducts = [
  {
    category: "Classic Range",
    items: [
      "Plain Khakhra",
      "Jeera Khakhra",
      "Methi Khakhra",
      "Masala Khakhra",
      "Diet Khakhra",
    ],
  },
  {
    category: "Spicy & Tangy",
    items: [
      "Peri Peri Khakhra",
      "Pudina Khakhra",
      "Garlic Khakhra",
      "Chaat Masala",
      "Panipuri Flavor",
    ],
  },
  {
    category: "Premium Fusion",
    items: [
      "Cheese Khakhra",
      "Pizza Khakhra",
      "Manchurian",
      "Chorafali Khakhra",
      "Mathiya Special",
    ],
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // New state for scroll

  // Scroll detect karne ke liye logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full relative z-100">
      {/* Top Bar - Scroll hone par hide hoga smoothly */}
      <div
        className={`bg-[#facc15] transition-all duration-300 overflow-hidden ${isScrolled ? "h-0 opacity-0" : "h-auto py-2 opacity-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-black">
          <div className="flex flex-wrap justify-center md:justify-start items-center space-x-4 mb-2 md:mb-0">
            {/* Number 1 */}
            <div className="flex gap-3 items-center">
              <a href="tel:+918511962244">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href="https://wa.me/918511962244" target="_blank">
                <i className="fa-brands fa-whatsapp text-green-500"></i>
              </a>
              <span>+91 85119 62244</span>
            </div>

            {/* Number 2 */}
            <div className="flex gap-3 items-center">
              <a href="tel:+917600167002">
                <i className="fa-solid fa-phone"></i>
              </a>
              <a href="https://wa.me/917600167002" target="_blank">
                <i className="fa-brands fa-whatsapp text-green-500"></i>
              </a>
              <span>+91 76001 67002</span>
            </div>
            <a
              href="mailto:info.cruncheskhakhra@gmail.com"
              className="hidden md:flex hover:text-white items-center transition cursor-pointer font-medium"
            >
              <Mail className="mr-1.5 w-4 h-4" />
              info.cruncheskhakhra@gmail.com
            </a>
          </div>
          <div className="items-center md:block hidden justify-center space-x-4 font-medium">
            <Link href="/track" className="hover:text-white transition">
              Track Order
            </Link>
            <Link href="/store" className="hover:text-white transition">
              Store Locator
            </Link>
            <Link href="/faqs" className="hover:text-white transition">
              FAQs
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar - Sticky aur Smooth effect yahan hai */}
      <nav
        className={`bg-white transition-all duration-500 ease-in-out w-full
          ${
            isScrolled
              ? "fixed top-0 left-0 shadow-md py-0"
              : "relative shadow-sm py-0"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-20" : "h-20"}`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 flex items-center transform hover:scale-105 transition duration-300"
            >
              <Image
                src="/img/cruncheslogo.png"
                alt="cruncheslogo"
                width={isScrolled ? 140 : 176}
                // width={176}
                height={60}
                className="object-contain transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Menu - Keep as is */}
            <div className="hidden lg:flex space-x-8 items-center h-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <div
                    key={link.name}
                    className="h-full flex items-center group"
                  >
                    <Link
                      href={link.path}
                      className={`flex items-center text-sm font-semibold tracking-wide transition-colors duration-200 h-full
                        ${isActive ? "text-yellow-500" : "text-gray-700 hover:text-yellow-500"}
                      `}
                    >
                      {link.name}
                      {link.hasMegaMenu && (
                        <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                      )}
                    </Link>

                    {/* MEGA MENU - No UI change */}
                    {link.hasMegaMenu && (
                      <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                        <div className="max-w-7xl mx-auto px-8 py-8 flex gap-8">
                          <div className="flex-1 grid grid-cols-3 gap-6">
                            {megaMenuProducts.map((group, idx) => (
                              <div key={idx}>
                                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                                  {group.category}
                                </h3>
                                <ul className="space-y-3">
                                  {group.items.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                      {/* <Link href={`/user/product/${item.toLowerCase().replace(/ /g, "-")}`} className="text-gray-500 hover:text-yellow-500 hover:font-semibold text-sm transition-colors flex items-center gap-1 group/item"> */}
                                      <Link
                                        href="/user/product"
                                        className="text-gray-500 hover:text-yellow-500 hover:font-semibold text-sm transition-colors flex items-center gap-1 group/item"
                                      >
                                        <span className="w-0 overflow-hidden group-hover/item:w-3 transition-all duration-300 ease-out">
                                          <ArrowRight className="w-3 h-3 mr-1" />
                                        </span>
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="w-87.5 grid grid-cols-2 gap-4">
                            {/* --- First Card (Achari Khakhra) --- */}
                            <div className="relative group/card cursor-pointer rounded-lg overflow-hidden h-48 bg-neutral-50 shadow-sm border border-neutral-100 transition-all hover:shadow-lg">
                              <Image
                                src="/img/achari.jpeg"
                                alt="crunches"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {/* Dark Overlay on Hover for premium look (optional) */}
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                            </div>

                            {/* --- Second Card (Methi Khakhra) --- */}
                            <div className="relative group/card cursor-pointer rounded-lg overflow-hidden h-48 bg-neutral-50 shadow-sm border border-neutral-100 transition-all hover:shadow-lg">
                              <Image
                                src="/img/Methi.JPG"
                                alt="crunches"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {/* Dark Overlay on Hover for premium look (optional) */}
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop Icons - Keep as is */}
            <div className="flex items-center space-x-4 md:space-x-6 text-gray-700">
              <div className="hidden md:block">
                <button className="shrink-0 mt-1 bg-[#F5F2FF] w-10 h-10 text-center flex items-center justify-center rounded-full text-primary_color hover:bg-primary_color hover:text-white transition hover:scale-110 ">
                  <Search className="w-5 h-5" />
                </button>
              </div>
              <div className="hidden md:block">
                <button className="shrink-0 mt-1 bg-[#FFF3EC] w-10 h-10 flex items-center justify-center rounded-full text-primary_color hover:bg-primary_color hover:text-white transition hover:scale-110 ">
                  <User className="w-5 h-5" />
                </button>
              </div>
              <button className="shrink-0 mt-1 bg-orange-100 w-10 h-10 flex  items-center justify-center rounded-full text-primary_color hover:bg-primary_color hover:text-white transition hover:scale-110 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>
              <button
                className="lg:hidden text-gray-700 hover:text-yellow-500 transition"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out border-t ${isMobileMenuOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 py-0 border-transparent"}`}
        >
          <div className="px-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <div key={link.name}>
                  <Link
                    href={link.path}
                    className={`block py-3 px-4 rounded-md font-medium transition ${isActive ? "bg-yellow-50 text-yellow-600" : "text-gray-700 hover:bg-gray-50 hover:text-yellow-500"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.hasMegaMenu && (
                    <div className="pl-8 pr-4 py-2 grid grid-cols-2 gap-2">
                      {megaMenuProducts[0].items.slice(0, 4).map((item, i) => (
                        <Link
                          key={i}
                          href="#"
                          className="text-sm text-gray-500 hover:text-yellow-500 py-1 block"
                        >
                          {item}
                        </Link>
                      ))}
                      <Link
                        href="/user/product"
                        className="text-sm font-semibold text-yellow-600 py-1 block"
                      >
                        View All &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
      {/* Spacer - Taaki sticky hone par content upar na chadh jaye */}
      {isScrolled && <div className="h-20 w-full"></div>}
    </header>
  );
};

export default Header;
