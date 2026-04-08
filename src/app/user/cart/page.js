"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CommonBannerPage from "@/components/global/CommonBanner";

const ShoppingCartPage = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Plain Khakhra",
      variant: "Regular",
      price: 200,
      quantity: 1,
      image: "/img/social-img/22.jpg",
    },
    {
      id: 2,
      name: "Masala Khakhra",
      variant: "Mobile",
      price: 125,
      quantity: 1,
      image: "/img/social-img/26.jpg",
    },
    {
      id: 3,
      name: "Methi Khakhra",
      variant: "Coin",
      price: 310,
      quantity: 3,
      image: "/img/social-img/17.jpg",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);

  // 1. Skeleton Loader Timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Scroll Lock Logic
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPopup]);

  // Handlers
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shippingCharges = subTotal > 500 || subTotal === 0 ? 0 : 49;
  const tax = 0;
  const totalAmount = subTotal > 0 ? subTotal + shippingCharges + tax : 0;

  const handleOrderWhatsapp = () => {
    if (cartItems.length === 0) return;
    setShowPopup(true);
    setCartItems([]);
  };

  // Skeleton UI Component
  const SkeletonRow = () => (
    <div className="py-6 grid grid-cols-12 gap-4 items-center animate-pulse">
      <div className="col-span-5 flex gap-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 w-3/4"></div>
          <div className="h-3 bg-gray-200 w-1/2"></div>
        </div>
      </div>
      <div className="col-span-2 bg-gray-200 h-4 mx-4"></div>
      <div className="col-span-3 bg-gray-200 h-10 mx-4 rounded-lg"></div>
      <div className="col-span-2 bg-gray-200 h-4 ml-4"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <CommonBannerPage
        image="/img/our_story_Section_bg.png"
        title="Shopping Cart"
        decs="Review your crispy snacks before checkout."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 text-gray-800">
          {/* Left Side - Items */}
          <div className="w-full lg:w-2/3 bg-white shadow-sm border border-gray-100 rounded-xl p-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 font-semibold text-gray-800 uppercase text-xs tracking-wider">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <div className="divide-y divide-gray-100">
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <SkeletonRow key={i} />)
              ) : cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center group transition-all duration-300"
                  >
                    <div className="col-span-5 flex items-center gap-4 w-full">
                      <div className="w-20 h-20 relative shrink-0 border border-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-xs text-gray-400">{item.variant}</p>
                      </div>
                    </div>

                    <div className="col-span-2 text-center font-medium">
                      ₹{item.price.toFixed(2)}
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200 rounded-lg h-9 w-28 overflow-hidden">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-full hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="w-full text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-full hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-right font-bold text-[#C0392B]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>

                    <div className="col-span-1 text-right">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-2 "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-gray-400">Oops! Your cart is empty.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 lg:sticky top-8">
              <h2 className="font-bold text-gray-800 mb-6 uppercase text-sm tracking-widest">
                Order Summary
              </h2>
              <div className="space-y-4 text-sm text-gray-600 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Sub-Total</span>
                  <span className="font-bold">₹{subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>
                    Shipping Charges <br />{" "}
                    <span className="text-xs text-green-600">
                      (Free over ₹500)
                    </span>
                  </span>
                  <span
                    className={
                      shippingCharges === 0
                        ? "text-green-600 font-bold"
                        : "font-bold"
                    }
                  >
                    {shippingCharges === 0 ? "FREE" : `₹${shippingCharges}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium text-gray-800">
                    ₹{tax.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-black mb-8">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              {/* <button
                onClick={handleOrderWhatsapp}
                disabled={cartItems.length === 0}
                className="w-full py-4 rounded-lg font-bold bg-[#FFC107] hover:bg-[#FFB300] disabled:bg-gray-200 transition-all uppercase text-xs"
              >
                Confirm Order on Whatsapp
              </button> */}
              <button
                onClick={handleOrderWhatsapp}
                disabled={cartItems.length === 0}
                className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition duration-300 ${
                  cartItems.length > 0
                    ? "bg-[#FFC107] hover:bg-[#FFB300] text-black shadow-md hover:shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {/* WhatsApp SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                Order on Whatsapp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-black text-gray-800 mb-2">
              Order Booked!
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed mb-8">
              Thank you for choosing{" "}
              <span className="font-semibold text-orange-600">
                Crunches Khakhra!
              </span>{" "}
              Your order request has been successfully booked. Our team will
              contact you shortly on WhatsApp to confirm the details. Have a
              crispy day!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-gray-800 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ShoppingCartPage;
