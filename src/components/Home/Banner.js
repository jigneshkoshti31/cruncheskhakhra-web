import React from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { Plus_Jakarta_Sans } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  // Variable fonts don't require weight arrays, but you can specify them
  weight: ['400', '500', '600', '700'], 
  variable: '--font-jakarta', // Optional: for Tailwind integration
});


const Banner = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/banner.png"
          alt="banner"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        {/* Tag */}
        <span className="bg-[rgba(244, 182, 24, 0.1)] border-2 border-primary_color text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide inline-block mb-4">
          🌾100% Natural & Healthy
        </span>

        {/* Heading */}
        <h1
          className={`${jakarta.className} text-5xl md:text-7xl font-bold text-white leading md:leading-20 mb-4 drop-shadow-lg`}
        >
          Experience the <br />
          <span className="text-primary_color italic">Real Taste of</span>{" "}
          <br />
          Gujarati Khakhra
        </h1>

        {/* Description */}
        <p className="text-lg md:text-lg text-gray-200 mb-8 max-w-xl font-light drop-shadow-md">
          From Healthy and Crispy Khakhra Delivered to Your Doorstep.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <a
            href="/user/product"
            className="bg-primary_color hover:bg-primary_dark text-white px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            Explore Flavours
          </a>

          <a
            href="/user/product"
            className="bg-[rgba(244, 182, 24, 0.1)] hover:bg-white text-white hover:text-primary_color border border-white px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:-translate-y-1"
          >
            Buy Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
