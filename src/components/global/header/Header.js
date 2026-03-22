import Image from "next/image";
import React from "react";
import { Phone } from 'lucide-react';


const Header = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary_color py-2">
        <div className="text-black text-xs md:text-sm max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="hover:text-primary_light flex items-center transition cursor-pointer">
              <i className="fa-solid fa-phone mr-1"></i>
              {/* <Phone className="mr-1 text-md"/> */}
              +91 85119 62244 | +91 76001 67002
            </span>

            <span className="hidden md:inline hover:text-primary_light transition cursor-pointer">
              <i className="fa-solid fa-envelope mr-1"></i>
              info.cruncheskhakhra@gmail.com
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-primary_light transition">
              Track Order
            </a>
            <a href="#" className="hover:text-primary_light transition">
              Store Locator
            </a>
            <a href="#" className="hover:text-primary_light transition">
              FAQs
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer transform hover:scale-105 transition duration-300">
              {/* Text Logo */}
              {/* <span className="font-serif text-3xl font-bold text-primary_color">
                Crunchy<span className="text-green_color">Khakhra</span>
              </span> */}

              {/* Image Logo */}
              <Image
                src="/img/cruncheslogo.png"
                alt="cruncheslogo"
                width={176}
                height={60}
                className="object-contain"
              />
            </div>

            {/* Menu */}
            <div className="hidden md:flex space-x-8 items-center font-medium">
              <a
                href="#"
                className="text-gray-600 hover:text-primary_color heading  transition"
              >
                Home
              </a>

              <a
                href="#"
                className="text-gray-600 hover:text-primary_color heading transition"
              >
                About Us
              </a>

              <a
                href="#"
                className="text-gray-600 hover:text-primary_color heading transition"
              >
                Products
              </a>

              <a
                href="#"
                className="text-gray-600 hover:text-primary_color heading transition"
              >
                Shop
              </a>

              <a
                href="#"
                className="text-gray-600 hover:text-primary_color heading transition"
              >
                Contact Us
              </a>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-5 text-gray-600">
              <button className="hover:text-primary_color transition transform hover:scale-110">
                <i className="fa-solid fa-magnifying-glass text-lg"></i>
              </button>

              <button className="hover:text-primary_color transition transform hover:scale-110">
                <i className="fa-regular fa-user text-lg"></i>
              </button>

              <button className="hover:text-primary_color transition transform hover:scale-110 relative">
                <i className="fa-solid fa-cart-shopping text-lg"></i>

                <span className="absolute -top-2 -right-2 bg-primary_color text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
