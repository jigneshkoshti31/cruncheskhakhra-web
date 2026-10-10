/* eslint-disable @next/next/no-img-element */
"use client";
import CommonBannerPage from "@/components/global/CommonBanner";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Yeh aapke products ka data hai.
const productsData = [
  { id: 1, category: "Masala", title: "Masala Khakhra", src: "/img/Photos/8.jpg (1).jpeg" },
  { id: 2, category: "Plain", title: "Plain Sada Khakhra", src: "/img/Photos/10.jpg.jpeg" },
  { id: 3, category: "Diet", title: "Diet Khakhra", src: "/img/Photos/17.jpg.jpeg" },
  { id: 4, category: "Jeera", title: "Jeera Khakhra", src: "/img/Photos/4.jpg (1).jpeg" },
  { id: 5, category: "Masala", title: "Spicy Masala", src: "/img/Photos/5.jpg (1).jpeg" },
  { id: 6, category: "Plain", title: "Methi Khakhra", src: "/img/Photos/methicoin.png" },
  { id: 7, category: "Premium", title: "Crunches Special 1", src: "/img/Photos/6.jpg (1).jpeg" },
  { id: 8, category: "Premium", title: "Crunches Special 2", src: "/img/Photos/7.jpg (1).jpeg" },
  { id: 9, category: "Premium", title: "Crunches Special 3", src: "/img/Photos/1.jpg (1).jpeg" },
  { id: 10, category: "Premium", title: "Crunches Special 4", src: "/img/Photos/9.jpg.jpeg" },
  { id: 11, category: "Premium", title: "Crunches Special 5", src: "/img/Photos/2.jpg (1).jpeg " },
  { id: 12, category: "Premium", title: "Crunches Special 6", src: "/img/Photos/13.jpg.jpeg" },
  { id: 13, category: "Premium", title: "Crunches Special 7", src: "/img/Photos/14.jpg.jpeg" },
  { id: 14, category: "Premium", title: "Crunches Special 8", src: "/img/Photos/16.jpg.jpeg" },
  { id: 15, category: "Premium", title: "Crunches Special 9", src: "/img/Photos/3.jpg (1).jpeg" },
  { id: 16, category: "Premium", title: "Crunches Special 10", src: "/img/Photos/18.jpg.jpeg" },
  { id: 17, category: "Premium", title: "Crunches Special 11", src: "/img/Photos/19_20260923_155913_0000.png" },
  { id: 18, category: "Premium", title: "Crunches Special 12", src: "/img/Photos/19.jpg.jpeg" },
  { id: 19, category: "Premium", title: "Crunches Special 13", src: "/img/Photos/20_20260923_155913_0001.png" },
  { id: 20, category: "Premium", title: "Crunches Special 14", src: "/img/Photos/20.jpg.jpeg" },
  { id: 21, category: "Premium", title: "Crunches Special 15", src: "/img/Photos/21_20260923_155913_0002.png" },
  { id: 22, category: "Premium", title: "Crunches Special 16", src: "/img/Photos/21.jpg.jpeg" },
  { id: 23, category: "Premium", title: "Crunches Special 17", src: "/img/Photos/22_20260923_155913_0003.png" },
  { id: 24, category: "Premium", title: "Crunches Special 18", src: "/img/Photos/22.jpg.jpeg" },
  { id: 25, category: "Premium", title: "Crunches Special 19", src: "/img/Photos/23_20260923_155913_0004.png" },
  { id: 26, category: "Premium", title: "Crunches Special 20", src: "/img/Photos/24_20260923_155913_0005.png" },
  { id: 27, category: "Premium", title: "Crunches Special 21", src: "/img/Photos/24.jpg.jpeg" },
  { id: 28, category: "Premium", title: "Crunches Special 22", src: "/img/Photos/25.jpg.jpeg" },
  { id: 29, category: "Premium", title: "Crunches Special 23", src: "/img/Photos/26_20260923_155913_0007.png" },
  { id: 30, category: "Premium", title: "Crunches Special 24", src: "/img/Photos/26.jpg.jpeg" },
  { id: 31, category: "Premium", title: "Crunches Special 25", src: "/img/Photos/27_20260923_155913_0008.png" },
  { id: 32, category: "Premium", title: "Crunches Special 26", src: "/img/Photos/28_20260923_155913_0009.png" },
  { id: 33, category: "Premium", title: "Crunches Special 27", src: "/img/Photos/29_20260923_155913_0010.png" },
  { id: 34, category: "Premium", title: "Crunches Special 28", src: "/img/Photos/30_20260923_155913_0011.png" },
  { id: 35, category: "Premium", title: "Crunches Special 29", src: "/img/Photos/31_20260923_155913_0012.png" },
  { id: 36, category: "Premium", title: "Crunches Special 30", src: "/img/Photos/32_20260923_155913_0013.png" },
  { id: 37, category: "Premium", title: "Crunches Special 31", src: "/img/Photos/33_20260923_155913_0014.png" },
  { id: 38, category: "Premium", title: "Crunches Special 32", src: "/img/Photos/34_20260923_155913_0015.png" },
  { id: 39, category: "Premium", title: "Crunches Special 33", src: "/img/Photos/40 New ++.jpg.jpeg" },
  { id: 40, category: "Premium", title: "Crunches Special 34", src: "/img/Photos/42 New ++.jpg.jpeg" },
  { id: 41, category: "Premium", title: "Crunches Special 35", src: "/img/Photos/IMG_2511.JPG (1).jpeg" },
  { id: 42, category: "Premium", title: "Crunches Special 36", src: "/img/Photos/IMG_2512.JPG (1).jpeg" },
  { id: 43, category: "Premium", title: "Crunches Special 37", src: "/img/Photos/IMG_2513.JPG (1).jpeg" },
  { id: 44, category: "Premium", title: "Crunches Special 38", src: "/img/Photos/IMG_2513.JPG.jpeg" },
  { id: 45, category: "Premium", title: "Crunches Special 39", src: "/img/Photos/IMG_2514.JPG (1).jpeg" },
  { id: 46, category: "Premium", title: "Crunches Special 40", src: "/img/Photos/IMG_2514.JPG.jpeg" },
  { id: 47, category: "Premium", title: "Crunches Special 41", src: "/img/Photos/IMG_2515.JPG (1).jpeg" },
  { id: 48, category: "Premium", title: "Crunches Special 42", src: "/img/Photos/IMG_2516.JPG (2).jpeg" },
  { id: 49, category: "Premium", title: "Crunches Special 43", src: "/img/Photos/IMG_2516.JPG (3).jpeg" },
  { id: 50, category: "Premium", title: "Crunches Special 44", src: "/img/Photos/IMG_2517.JPG (1).jpeg" },
  { id: 51, category: "Premium", title: "Crunches Special 45", src: "/img/Photos/IMG_2517.JPG.jpeg" },
  { id: 52, category: "Premium", title: "Crunches Special 46", src: "/img/Photos/IMG_2519.JPG (3).jpeg" },
  { id: 53, category: "Premium", title: "Crunches Special 47", src: "/img/Photos/IMG_2519.JPG (4).jpeg" },
  { id: 54, category: "Premium", title: "Crunches Special 48", src: "/img/Photos/IMG_2520.JPG (1).jpeg" },
  { id: 55, category: "Premium", title: "Crunches Special 49", src: "/img/Photos/IMG_2521.JPG (2).jpeg" },
  { id: 56, category: "Premium", title: "Crunches Special 50", src: "/img/Photos/IMG_2522.JPG (2).jpeg" },
  { id: 57, category: "Premium", title: "Crunches Special 51", src: "/img/Photos/IMG_2523.JPG (2).jpeg" },
  { id: 58, category: "Masala", title: "Maggie Khakhra", src: "/img/Photos/maggiecoin.jpeg" },
];

// Aapka Skeleton Card Component
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Image Skeleton with Wave */}
      <div className="w-full aspect-square rounded-xl mb-4 shimmer-wrapper bg-gray-200 animate-pulse"></div>

      {/* Title Skeleton */}
      <div className="h-5 rounded-md w-3/4 mb-3 shimmer-wrapper bg-gray-200 animate-pulse"></div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 rounded-md w-full shimmer-wrapper bg-gray-200 animate-pulse"></div>
        <div className="h-3 rounded-md w-5/6 shimmer-wrapper bg-gray-200 animate-pulse"></div>
      </div>

      {/* Rating Skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-4 rounded-full shimmer-wrapper bg-gray-200 animate-pulse"></div>
        <div className="h-4 rounded-md w-12 shimmer-wrapper bg-gray-200 animate-pulse"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="h-6 rounded-md w-full shimmer-wrapper bg-gray-200 animate-pulse"></div>
          <div className="h-3 rounded-md w-3/4 shimmer-wrapper bg-gray-200 animate-pulse"></div>
        </div>
        <div className="h-10 w-10 rounded-full shimmer-wrapper bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  // Loading state banaya gaya hai
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2 second (2000ms) baad loading false ho jayegi aur actual products dikhenge
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
          {isLoading
            ? // Jab tak isLoading true hai, 6 Skeleton Cards dikhenge
              Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : // isLoading false hone par actual Khakhra products dikhenge
              productsData.map((product) => (
                <div
                  key={product.id}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl"
                >
                  {/* Image */}
                  <Image
                    src={product.src}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
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