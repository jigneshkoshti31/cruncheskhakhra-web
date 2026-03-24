"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// --- MOCK DATA ---
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Methi Khakhra (Jain)",
    desc: "Classic & wholesome traditional khakhra",
    rating: 4.8,
    reviews: 284,
    price: 200,
    oldPrice: 250,
    flavor: "Methi",
    type: "Regular",
    image: "/img/social-img/17.jpg",
  },
  {
    id: 2,
    name: "Masala Khakhra",
    desc: "Spicy and crispy daily snack",
    rating: 4.5,
    reviews: 150,
    price: 210,
    oldPrice: 260,
    flavor: "Masala",
    type: "Coin",
    image: "/img/social-img/19.jpg",
  },
  {
    id: 3,
    name: "Jeera Khakhra",
    desc: "Roasted cumin flavored light snack",
    rating: 4.9,
    reviews: 310,
    price: 190,
    oldPrice: 240,
    flavor: "Jeera",
    type: "Mobile",
    image: "/img/social-img/25.jpg.jpeg",
  },
  {
    id: 4,
    name: "Plain Khakhra (Jain)",
    desc: "Simple, diet-friendly classic khakhra",
    rating: 4.2,
    reviews: 95,
    price: 180,
    oldPrice: 220,
    flavor: "Plain",
    type: "Regular",
    image: "/img/social-img/26.jpg",
  },
  {
    id: 5,
    name: "Manchurian Khakhra",
    desc: "Indo-Chinese fusion crispy treat",
    rating: 4.6,
    reviews: 420,
    price: 230,
    oldPrice: 280,
    flavor: "Manchurian",
    type: "Coin",
    image: "/img/social-img/26.jpg",
  },
  {
    id: 6,
    name: "Maggi Khakhra",
    desc: "Kids favorite noodle masala flavor",
    rating: 4.7,
    reviews: 500,
    price: 220,
    oldPrice: 270,
    flavor: "Maggi",
    type: "Regular",
    image: "/img/social-img/19.jpg",
  },
  {
    id: 7,
    name: "Methi Khakhra (Jain)",
    desc: "Classic & wholesome traditional khakhra",
    rating: 4.8,
    reviews: 284,
    price: 200,
    oldPrice: 250,
    flavor: "Methi",
    type: "Regular",
    image: "/img/social-img/17.jpg",
  },
  {
    id: 8,
    name: "Masala Khakhra",
    desc: "Spicy and crispy daily snack",
    rating: 4.5,
    reviews: 150,
    price: 210,
    oldPrice: 260,
    flavor: "Masala",
    type: "Coin",
    image: "/img/social-img/19.jpg",
  },
  {
    id: 9,
    name: "Jeera Khakhra",
    desc: "Roasted cumin flavored light snack",
    rating: 4.9,
    reviews: 310,
    price: 190,
    oldPrice: 240,
    flavor: "Jeera",
    type: "Mobile",
    image: "/img/social-img/25.jpg.jpeg",
  },
  {
    id: 10,
    name: "Plain Khakhra (Jain)",
    desc: "Simple, diet-friendly classic khakhra",
    rating: 4.2,
    reviews: 95,
    price: 180,
    oldPrice: 220,
    flavor: "Plain",
    type: "Regular",
    image: "/img/social-img/26.jpg",
  },
  {
    id: 11,
    name: "Manchurian Khakhra",
    desc: "Indo-Chinese fusion crispy treat",
    rating: 4.6,
    reviews: 420,
    price: 230,
    oldPrice: 280,
    flavor: "Manchurian",
    type: "Coin",
    image: "/img/social-img/17.jpg",
  },
  {
    id: 12,
    name: "Maggi Khakhra",
    desc: "Kids favorite noodle masala flavor",
    rating: 4.7,
    reviews: 500,
    price: 220,
    oldPrice: 270,
    flavor: "Maggi",
    type: "Regular",
    image: "/img/social-img/19.jpg",
  },
  {
    id: 13,
    name: "Masala Khakhra 13",
    desc: "Spicy and crispy daily snack",
    rating: 4.5,
    reviews: 150,
    price: 210,
    oldPrice: 260,
    flavor: "Masala",
    type: "Coin",
    image: "/img/social-img/19.jpg",
  },
  {
    id: 14,
    name: "Jeera Khakhra 14",
    desc: "Roasted cumin flavored light snack",
    rating: 4.9,
    reviews: 310,
    price: 190,
    oldPrice: 240,
    flavor: "Jeera",
    type: "Mobile",
    image: "/img/social-img/25.jpg.jpeg",
  },
  {
    id: 15,
    name: "Plain Khakhra 15",
    desc: "Simple, diet-friendly classic khakhra",
    rating: 4.2,
    reviews: 95,
    price: 180,
    oldPrice: 220,
    flavor: "Plain",
    type: "Regular",
    image: "/img/social-img/26.jpg",
  },
  {
    id: 16,
    name: "Plain Khakhra 16",
    desc: "Simple, diet-friendly classic khakhra",
    rating: 4.2,
    reviews: 95,
    price: 180,
    oldPrice: 220,
    flavor: "Plain",
    type: "Regular",
    image: "/img/social-img/26.jpg",
  },
];

const FLAVORS = [
  "All",
  "Masala",
  "Plain",
  "Methi",
  "Jeera",
  "Maggi",
  "Manchurian",
];
const TYPES = ["All", "Regular", "Coin", "Mobile"];

const ProductListing = () => {
  const [activeFlavor, setActiveFlavor] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    setCurrentPage(1); // Filter change hote hi page 1 par reset karein

    const timer = setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS];

      if (activeFlavor !== "All") {
        filtered = filtered.filter((p) => p.flavor === activeFlavor);
      }
      if (activeType !== "All") {
        filtered = filtered.filter((p) => p.type === activeType);
      }

      setProducts(filtered);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [activeFlavor, activeType, sortBy]);

  // --- CALCULATE PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Yeh hai woh main line jo sirf 12 items dikhayegi
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8 py-4 md:py-12 bg-[#FDFBF7]">
      <div className="flex flex-col lg:flex-row gap-3 md:gap-8">
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="w-full lg:w-1/4 shrink-0">
          <div className="bg-white p-3 md:p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-3 md:mb-6">Filters</h2>

            {/* Flavors Filter */}
            <div className="mb-4 md:mb-8">
              <h3 className="font-semibold text-gray-700 mb-4">Flavors</h3>
              <div className="flex flex-wrap gap-2">
                {FLAVORS.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setActiveFlavor(flavor)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFlavor === flavor
                        ? "bg-[#C8102E] text-white shadow-md shadow-red-200 scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="mb-4 md:mb-8">
              <h3 className="font-semibold text-gray-700 mb-4">Variants</h3>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeType === type
                        ? "bg-[#C8102E] text-white shadow-md shadow-red-200 scale-105"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <div className="w-full lg:w-3/4">
          <div className="md:mb-6 mb-3 flex justify-between items-center text-sm text-gray-500 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all duration-300">
            <p className="font-semibold">
              Showing {currentProducts.length} of {products.length} results
            </p>
            {/* --- PAGINATION LOGIC: SHOW ONLY IF > 12 PRODUCTS --- */}
            {!isLoading && products.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2">
                {/* Prev Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-10 h-10 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-50 flex items-center justify-center transition-all"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-full font-bold transition-all ${
                      currentPage === i + 1
                        ? "bg-[#C8102E] text-white shadow-lg"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-10 h-10 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-50 flex items-center justify-center transition-all"
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-3">
            {isLoading ? (
              [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            ) : currentProducts.length > 0 ? (
              // MAP ONLY CURRENT PAGE PRODUCTS
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="text-gray-400 mb-4 text-5xl">🥺</div>
                <h3 className="text-xl font-bold text-gray-700">
                  No Khakhra Found!
                </h3>
                <button
                  onClick={() => {
                    setActiveFlavor("All");
                    setActiveType("All");
                  }}
                  className="mt-6 px-6 py-2 bg-[#C8102E] text-white rounded-full"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* --- PAGINATION LOGIC: SHOW ONLY IF > 12 PRODUCTS --- */}
          {!isLoading && products.length > itemsPerPage && (
            <div className="mt-12 flex justify-end items-center gap-2">
              {/* Prev Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-10 h-10 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-50 flex items-center justify-center transition-all"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold transition-all ${
                    currentPage === i + 1
                      ? "bg-[#C8102E] text-white shadow-lg"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-10 h-10 rounded-full border border-gray-200 disabled:opacity-30 hover:bg-gray-50 flex items-center justify-center transition-all"
              >
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS (Card & Skeleton) ---
const ProductCard = ({ product }) => (
  <div className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
    <div className="relative w-full aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <div className="flex-1">
      <h3 className="md:text-lg text-base font-bold text-gray-800 line-clamp-1">
        {product.name}
      </h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-1">{product.desc}</p>
      <div className="flex items-center gap-1 mt-2 mb-4 text-sm font-medium text-gray-700">
        <svg
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {product.rating}{" "}
        <span className="text-gray-400 text-xs">({product.reviews})</span>
      </div>
    </div>
    <div className="flex justify-between items-center mt-auto md:pt-4 pt-2 border-t border-gray-50">
      <div>
        <span className="text-xl font-bold text-[#C8102E]">
          ₹{product.price}
        </span>
        <span className="ml-2 text-sm text-gray-400 line-through">
          ₹{product.oldPrice}
        </span>
      </div>
      <button className="w-10 h-10 rounded-full bg-[#FBC02D] text-white flex items-center justify-center hover:bg-[#f9a825] transition-colors shadow-md">
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </button>
    </div>
  </div>
);

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm overflow-hidden">
      {/* Image Skeleton with Wave */}
      <div className="w-full aspect-square rounded-xl mb-4 shimmer-wrapper"></div>

      {/* Title Skeleton */}
      <div className="h-5 rounded-md w-3/4 mb-3 shimmer-wrapper"></div>

      {/* Description Skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 rounded-md w-full shimmer-wrapper"></div>
        <div className="h-3 rounded-md w-5/6 shimmer-wrapper"></div>
      </div>

      {/* Rating Skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-4 rounded-full shimmer-wrapper"></div>
        <div className="h-4 rounded-md w-12 shimmer-wrapper"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="h-6 rounded-md w-full shimmer-wrapper"></div>
          <div className="h-3 rounded-md w-3/4 shimmer-wrapper"></div>
        </div>
        <div className="h-10 w-10 rounded-full shimmer-wrapper"></div>
      </div>
    </div>
  );
};

export default ProductListing;
