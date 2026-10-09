/* eslint-disable @next/next/no-img-element */
"use client";
import CommonBannerPage from "@/components/global/CommonBanner";
import React, { useState } from "react";

// Yeh aapke products ka demo data hai.
// Aap in 'src' links ko apne actual photos ke URL se replace kar dena.
const productsData = [
  {
    id: 1,
    category: "Masala",
    title: "Masala Khakhra",
    src: "./img/our_product_gallery/masala_khakhra.jpg",
  },
  {
    id: 2,
    category: "Plain",
    title: "Plain Sada Khakhra",
    src: "",
  },
  {
    id: 3,
    category: "Diet",
    title: "Diet Khakhra",
    src: "./img/our_product_gallery/diet_khakhra.jpg",
  },
  {
    id: 4,
    category: "Jeera",
    title: "Jeera Khakhra",
    src: "./img/our_product_gallery/jeera_khakhra.jpg",
  },
  {
    id: 5,
    category: "Masala",
    title: "Spicy Masala",
    src: "./img/our_product_gallery/spicy_masala.jpg",
  },
  {
    id: 6,
    category: "Plain",
    title: "Methi Khakhra",
    src: "./img/our_product_gallery/methi_khakhra.jpg",
  },
];

const GalleryPage = () => {
  return (
    <>
      <CommonBannerPage
        image="/img/our_story_Section_bg.png"
        title="Our Product Gallery"
        decs="Explore Our Collection"
      />
      <div className="min-h-screen bg-gray-50 py-7 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Fresh, healthy, and crispy Gujarati khakhra delivered to your
            doorstep. Browse through our premium and delicious varieties.
          </p>
          <div className="w-24 h-1 bg-[#E8A51D] mx-auto rounded-full mb-8 mt-2"></div>
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image */}
              <img
                src={product.src}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#005A32]/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="inline-block px-3 py-1 bg-[#E8A51D] text-white text-xs font-bold rounded-full mb-2 w-max">
                  {product.category}
                </span>
                <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {product.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
