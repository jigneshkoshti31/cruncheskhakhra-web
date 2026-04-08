"use client";
import React, { useState } from "react";
// Next.js Image component import
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import Link from "next/link";

// --- UPDATED MOCK DATA STRUCTURE (Objects with dimensions for better optimization) ---
const productData = {
  id: "CKF-MUM-42023",
  title: "Plain Khakhra",
  rating: 4.8,
  reviewsCount: 349,
  price: 200.0,
  originalPrice: 280.0,
  shortDesc:
    "The classic Plain Khakhra. A traditional savory and crispy Indian flatbread made from whole wheat flour and mild spices. Perfect for breakfast or as a light snack with tea.",
  nutrition: [
    { label: "Energy", value: "80 kcal" },
    { label: "Protein", value: "1.2g" },
    { label: "Carbs", value: "7.2g" },
    { label: "Sugar", value: "0.0g" },
    { label: "Fat", value: "2.3g" },
  ],
  // Arrays are now standard objects with dimensions
  images: [
    {
      src: "/img/social-img/22.jpg",
      width: 800,
      height: 800,
    }, // Main
    {
      src: "/img/social-img/14.jpg",
      width: 800,
      height: 800,
    }, // Thumb 1
    {
      src: "/img/social-img/26.jpg",
      width: 800,
      height: 800,
    }, // Thumb 2
    {
      src: "/img/social-img/17.jpg",
      width: 800,
      height: 800,
    }, // Thumb 3
  ],
  tabs: ["Product Description", "Specifications", "Return Policy", "Reviews"],
  description:
    "Enjoy the perfect combination of crunchiness and flavor with our Plain Khakhra. Made with premium ingredients and a traditional blend of aromatic Indian spices, this khakhra is roasted to perfection to give you a light, crunchy, and delicious snack.",
  specifications: {
    "Brand Name": "Crunchos Khakhra",
    "Product Type": "Gujarati Khakhra Snacks",
    "Country of origin": "India",
    "Diet Type": "100% Vegetarian",
    Flavor: "Plain/Traditional",
    "Net Weight": "200g",
    "Shelf Life": "6 Months",
  },
  returnPolicy:
    "Due to food safety standard standard standard regulations, we do not accept returns on food products once opened. Damaged items reported within 24 hours of delivery are eligible for refund/replacement.",
  reviews: [
    {
      id: 1,
      name: "Elias McLaughlin",
      rating: 5,
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Standard standard standard standard dummy text.",
      avatar: { src: "https://i.pravatar.cc/150?u=1", width: 64, height: 64 }, // Avatar object
    },
    {
      id: 2,
      name: "Elias McLaughlin",
      rating: 5,
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Standard standard standard standard standard standard dummy text.",
      avatar: { src: "https://i.pravatar.cc/150?u=2", width: 64, height: 64 },
    },
  ],
  relatedProducts: [
    {
      id: 101,
      title: "Methi Khakhra (Jain)",
      price: 200.0,
      original: 280.0,
      rating: 4.8,
      image: {
        src: "/img/social-img/22.jpg",
        width: 400,
        height: 400,
      },
    },
    {
      id: 102,
      title: "Masala Khakhra",
      price: 220.0,
      original: 250.0,
      rating: 4.5,
      image: {
        src: "/img/social-img/19.jpg",
        width: 400,
        height: 400,
      },
    },
    {
      id: 103,
      title: "Jeera Khakhra",
      price: 200.0,
      original: 280.0,
      rating: 4.9,
      image: {
        src: "/img/social-img/22.jpg",
        width: 400,
        height: 400,
      },
    },
  ],
};

// --- HELPER COMPONENT ---
const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ProductDetailspage = () => {
  // Now state stores the entire image object
  const [activeImageObj, setActiveImageObj] = useState(productData.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(productData.tabs[0]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-10 font-sans text-gray-800">
      {/* --- TOP SECTION: IMAGE & DETAILS --- */}
      <div className="flex flex-col items-start lg:flex-row gap-12">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-2/5 flex flex-col gap-4">
          {/* Main Optimized Image */}
          {/* relative position, aspect-ratio on parent are important when using next/image with full width */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm transition-opacity duration-300">
            <Image
              src={activeImageObj.src}
              alt={productData.title}
              // Hardcoded width/height is okay here because we enforce aspect-square on parent.
              // next/image will use this to generate optimal responsive sizes.
              width={activeImageObj.width}
              height={activeImageObj.height}
              priority={true} // Crucial optimization for Largest Contentful Paint (LCP)
              className="w-full h-full object-cover animate-fade-in"
              sizes="(max-w-768px) 100vw, 50vw" // Helps browser pick optimal size from srcset
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {productData.images.map((imgObj, index) => (
              <button
                key={index}
                onClick={() => setActiveImageObj(imgObj)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all duration-200 relative ${
                  activeImageObj.src === imgObj.src
                    ? "border-yellow-500 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* Thumbnails are small, so hardcoded standard dimensions are fine */}
                <Image
                  src={imgObj.src}
                  alt={`thumb-${index}`}
                  width={100} // Requesting smaller size for thumbs
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info (No visual changes here, just JSX refinement) */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{productData.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <span className="text-sm text-gray-500">
              ({productData.reviewsCount} Reviews)
            </span>
          </div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-bold text-red-500">
              ₹{productData.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ₹{productData.originalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {productData.shortDesc}
          </p>
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <p className="font-semibold text-sm mb-3">
              Nutritional Info (per 100g):
            </p>
            <div className="flex justify-between items-center text-center divide-x divide-gray-200">
              {productData.nutrition.map((item, idx) => (
                <div key={idx} className="flex-1 px-2">
                  <p className="text-sm font-bold">{item.value}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <p className="text-md font-bold">Quantity:</p>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-12 w-full sm:w-auto">
              <button
                onClick={() => handleQuantity("dec")}
                className="px-4 text-md py-2 hover:bg-gray-100 text-gray-600 transition"
              >
                <FaMinus />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantity("inc")}
                className="px-4 text-md py-2 hover:bg-gray-100 text-gray-600 transition"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full sm:flex-row items-center gap-4">
            <Link href="/user/cart">
              <button className="bg-primary_color hover:bg-primary_dark w-full text-white px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                Add to Cart
              </button>
            </Link>
            <button className="border-2 border-primary_color  text-yellow-600 hover:bg-primary_light px-8 py-3 rounded-full font-semibold transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* --- TABS SECTION --- */}
      <div className="mt-16 border-t border-gray-200">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {productData.tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap transition-all duration-300 relative ${activeTab === tab ? "text-red-500" : "text-gray-500 hover:text-gray-800"}`}
            >
              {tab}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transition-transform duration-300 ${activeTab === tab ? "scale-x-100" : "scale-x-0"}`}
              ></span>
            </button>
          ))}
        </div>
        <div className="py-8 min-h-50 animate-fade-in-up">
          {activeTab === "Product Description" && (
            <div className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Product Description
              </h3>
              <p>{productData.description}</p>
            </div>
          )}
          {activeTab === "Specifications" && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {Object.entries(productData.specifications).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col sm:flex-row py-2 border-b border-gray-100"
                    >
                      <span className="font-semibold text-gray-700 sm:w-1/3">
                        {key}
                      </span>
                      <span className="text-gray-600 sm:w-2/3">{value}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
          {activeTab === "Return Policy" && (
            <div className="text-gray-600 leading-relaxed max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Return Policy
              </h3>
              <p className="whitespace-pre-line">{productData.returnPolicy}</p>
            </div>
          )}
          {activeTab === "Reviews" && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <span className="font-bold text-red-500">
                  Overall Reviews ({productData.rating})
                </span>
              </div>
              <div className="space-y-6">
                {productData.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      {/* Optimized Avatar */}
                      <Image
                        src={review.avatar.src}
                        alt={review.name}
                        width={review.avatar.width} // 64
                        height={review.avatar.height} // 64
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="flex">
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- RELATED PRODUCTS SECTION --- */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">
          You May Also <span className="text-red-500">Like</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productData.relatedProducts.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300"
            >
              {/* Parent container needs `relative` for next/image with full width to work inside grid */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50">
                {/* Optimized Related Product Image */}
                <Image
                  src={item.image.src}
                  alt={item.title}
                  width={item.image.width} // 400
                  height={item.image.height} // 400
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 mb-2">
                Wheat, Edible Vegetable Oil, Spices
              </p>
              <div className="flex items-center gap-1 mb-3">
                <StarIcon />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-red-500 font-bold">
                    ₹{item.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 text-sm line-through">
                    ₹{item.original.toFixed(2)}
                  </span>
                </div>
                <button className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center hover:bg-yellow-600 transition-colors shadow-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailspage;
