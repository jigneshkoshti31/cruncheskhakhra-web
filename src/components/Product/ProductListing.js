"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { MOCK_PRODUCTS, FLAVORS, Variants, REGULAR } from "./MockData";

const ProductListing = () => {
  const [activeFlavor, setActiveFlavor] = useState("All");
  const [activeTypeVariant, setActiveTypeVariant] = useState("All");
  const [activeregular, setActiveregular] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  const [showAllRegular, setShowAllRegular] = useState(false);
const [showAllFlavors, setShowAllFlavors] = useState(false);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    setCurrentPage(1); // Filter change hote hi page 1 par reset karein

    const timer = setTimeout(() => {
      let filtered = [...MOCK_PRODUCTS];

      if (activeTypeVariant !== "All") {
        filtered = filtered.filter((p) => p.Variants === activeTypeVariant);
      }
      if (activeFlavor !== "All") {
        filtered = filtered.filter((p) => p.flavor === activeFlavor);
      }
      if (activeregular !== "All") {
        filtered = filtered.filter((p) => p.Regular === activeregular);
      }
      

      setProducts(filtered);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [activeFlavor, activeTypeVariant, sortBy, activeregular]);

  // --- CALCULATE PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Yeh hai woh main line jo sirf 12 items dikhayegi
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  console.log("Products are:", currentProducts);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- FILTER HANDLERS ---
  const handleRegularClick = (regularValue) => {
    setActiveregular(regularValue);
    if (regularValue !== "All") {
      setActiveFlavor("All");
      setActiveTypeVariant("All");
    }
  };

  const handleFlavorClick = (flavorValue) => {
    setActiveFlavor(flavorValue);
    if (flavorValue !== "All") {
      setActiveregular("All");
    }
  };

  const handleVariantClick = (variantValue) => {
    setActiveTypeVariant(variantValue);
    // Optional: If variant is clicked, reset Regular? 
    // Based on requirement: "regular me flavours and variants ko check nai kar sakta"
    if (variantValue !== "All") {
       setActiveregular("All");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8 py-4 md:py-12 bg-[#FDFBF7]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col lg:flex-row gap-3 md:gap-8">
       
<aside className="w-full lg:w-1/4 shrink-0">
  <div className="bg-white p-3 md:p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 sticky top-24">
    <h2 className="text-xl font-bold text-gray-800 mb-3 md:mb-6">
      Filters
    </h2>

    {/* Regular Filter */}
    <div className="mb-4 md:mb-8">
      <h3 className="font-semibold text-gray-700 mb-4">Regular</h3>
      <div className="flex flex-wrap gap-2">
        {/* Shuru ke 8 Regular dikhayein */}
        {REGULAR.slice(0, showAllRegular ? REGULAR.length : 8).map(
          (Regular) => (
            <button
              key={Regular}
              onClick={() => handleRegularClick(Regular)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeregular === Regular
                  ? "bg-[#C8102E] text-white shadow-md shadow-red-200 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {Regular}
            </button>
          )
        )}
        {/* Show More / Show Less Button for Regular */}
        {REGULAR.length > 8 && (
          <button
            onClick={() => setShowAllRegular(!showAllRegular)}
            className="px-4 py-2 text-sm font-medium text-[#C8102E] hover:underline"
          >
            {showAllRegular ? "Show Less" : `+${REGULAR.length - 8} More`}
          </button>
        )}
      </div>
    </div>

    {/* Flavors Filter */}
    <div className="mb-4 md:mb-8">
      <h3 className="font-semibold text-gray-700 mb-4">Flavours</h3>
      <div className="flex flex-wrap gap-2">
        {/* Shuru ke 8 Flavors dikhayein */}
        {FLAVORS.slice(0, showAllFlavors ? FLAVORS.length : 8).map(
          (flavor) => (
            <button
              key={flavor}
              onClick={() => handleFlavorClick(flavor)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFlavor === flavor
                  ? "bg-[#C8102E] text-white shadow-md shadow-red-200 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {flavor}
            </button>
          )
        )}
        {/* Show More / Show Less Button for Flavors */}
        {FLAVORS.length > 8 && (
          <button
            onClick={() => setShowAllFlavors(!showAllFlavors)}
            className="px-4 py-2 text-sm font-medium text-[#C8102E] hover:underline"
          >
            {showAllFlavors ? "Show Less" : `+${FLAVORS.length - 8} More`}
          </button>
        )}
      </div>
    </div>

    {/* Type Filter */}
    <div className="mb-4 md:mb-8">
      <h3 className="font-semibold text-gray-700 mb-4">Variants</h3>
      <div className="flex flex-wrap gap-2">
        {Variants.map((Variants) => (
          <button
            key={Variants}
            onClick={() => handleVariantClick(Variants)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTypeVariant === Variants
                ? "bg-[#C8102E] text-white shadow-md shadow-red-200 scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {Variants}
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
                    setActiveTypeVariant("All");
                    setActiveregular("All");
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
                className="w-10 h-10 rounded-full border border-gray-200 disabled:cursor-not-allowed disabled:opacity-30 hover:bg-gray-50 flex items-center justify-center transition-all"
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
const ProductCard = ({ product }) => {
  return (
    <Link href={`/user/product-details/${product.id}`}>
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
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {product.desc}
          </p>
        </div>
        <div className="flex justify-between items-center mt-auto md:pt-4 pt-2 border-t border-gray-50">
          <div>
            <a href="tel:+918511962244">
                <button className="shrink-0 mt-1 bg-[#f2b822] w-32 h-10 flex items-center justify-center rounded-full text-gray-900 font-semibold hover:bg-[#e0aa1f] transition hover:scale-105 relative shadow-sm cursor-pointer">
                  Enquiry now
                </button>
              </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

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