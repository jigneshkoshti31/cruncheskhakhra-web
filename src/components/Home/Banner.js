import React from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
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
        <span className="bg-primary_color text-white px-3 py-1 rounded-full text-sm font-medium tracking-wide inline-block mb-4">
          100% Natural & Healthy
        </span>

        {/* Heading */}
        <h1
          className={`${playfair.className} text-5xl md:text-7xl font-bold text-white leading mb-4 drop-shadow-lg`}
        >
          Experience the <br />
          <span className="text-primary_light italic">Real Taste of</span>{" "}
          <br />
          Gujarati Khakhra
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg font-light drop-shadow-md">
          From Healthy and Crispy Khakhra Delivered to Your Doorstep.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="bg-primary_color hover:bg-primary_dark text-white px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            Shop Now
          </a>

          <a
            href="#"
            className="bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-primary_color border border-white px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:-translate-y-1"
          >
            Explore Flavours
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
