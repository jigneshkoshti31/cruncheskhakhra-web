"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const LoginSignup = () => {
  // Tabs State: true = Login, false = Sign Up
  const [isLogin, setIsLogin] = useState(true);

  // Form Fields State
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Password Visibility State
  const [showPassword, setShowPassword] = useState(false);

  // Errors State (Pure JavaScript, No TypeScript)
  const [errors, setErrors] = useState({});

  // Form Validation Logic
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    // Mobile validation
    if (!mobileNumber.trim()) {
      tempErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (mobileNumber.length < 7) {
      tempErrors.mobile = "Please enter a valid mobile number";
      isValid = false;
    }

    // Password validation
    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    // Terms & Conditions validation for Sign Up
    if (!isLogin && !agreeTerms) {
      tempErrors.terms = "You must agree to the Terms & Conditions";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      if (isLogin) {
        console.log("Logging in with:", { mobileNumber, password });
        alert("Login Successful!");
      } else {
        console.log("Signing up with:", { mobileNumber, password });
        alert("Sign Up Successful!");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-[#fafafa] overflow-hidden">
      {/* LEFT SIDE: Smooth Image Section */}
      <div className="hidden lg:block relative w-full min-h-screen overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login-img" : "signup-img"}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full"
          >
            <Image
              src={isLogin ? "/img/loginBG.svg" : "/img/signupBG.svg"}
              alt="Crunchy Khakhra Brand Banner"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT SIDE: Authentication Form Card */}
      <div className="flex flex-col mx-auto items-center justify-center p-4 sm:p-8 md:p-8 lg:p-10 w-full">
        <Link
          href="/"
          className="shrink-0 flex items-center transform hover:scale-105 transition duration-300"
        >
          <Image
            src="/img/cruncheslogo.png"
            alt="cruncheslogo"
            width={176}
            height={60}
            className="object-contain transition-all duration-300 pb-4"
            priority
          />
        </Link>
        <div className="w-full md:max-w-2/3 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-5 flex flex-col justify-center">
          {/* Header */}
          <div className="flex items-center justify-center"></div>
          <div className="text-center mb-6">
            <h2 className="text-[24px] font-semibold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-[13px] text-gray-400 mt-1">
              Sign in to your account or create a new one
            </p>
          </div>

          {/* Super Smooth Toggle Tabs (Framer Motion) */}
          <div className="bg-[#f0f2f5] p-1 rounded-lg flex relative w-full mb-6">
            {["Login", "Sign Up"].map((tab) => {
              const isActive =
                (tab === "Login" && isLogin) || (tab === "Sign Up" && !isLogin);
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setIsLogin(tab === "Login");
                    setErrors({});
                  }}
                  className={`relative flex-1 py-2.5 text-[14px] font-medium rounded-lg transition-colors duration-200 z-10 ${
                    isActive
                      ? "text-gray-900 font-semibold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Mobile Number Field */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Mobile Number
              </label>
              <div
                className={`flex items-center border rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-[#f2b822]/20 focus-within:border-[#f2b822] transition-all ${
                  errors.mobile ? "border-red-500" : "border-gray-200"
                }`}
              >
                {/* Country Code Picker Selector */}
                <div className="flex items-center gap-1 pr-2 border-r border-gray-200 text-gray-700 text-[14px] cursor-pointer select-none">
                  <span className="text-[16px]">🇺🇸</span>
                  <span className="font-medium">+1</span>
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  placeholder="Type here"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full pl-3 py-3 text-[14px] text-gray-800 placeholder-gray-300 bg-transparent outline-none"
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-[12px] mt-1">{errors.mobile}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div
                className={`flex items-center border rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-[#f2b822]/20 focus-within:border-[#f2b822] transition-all ${
                  errors.password ? "border-red-500" : "border-gray-200"
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    isLogin ? "Enter your password" : "Create a strong password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 text-[14px] text-gray-800 placeholder-gray-300 bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none ml-2"
                >
                  {showPassword ? (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.025 10.025 0 014.132-5.4M9.62 9.62a3 3 0 004.141 4.141M12 5c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.375 3.29M3 3l18 18"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[12px] mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Conditional: Forgot Password OR Terms & Conditions */}
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="forgot-password"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-end"
                >
                  <Link
                    href="/user/forgot-password"
                    className="text-[12px] font-medium text-gray-900 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="flex items-center gap-2.5 cursor-pointer select-none mt-2">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#f2b822] focus:ring-[#f2b822] cursor-pointer"
                    />
                    <span className="text-[12px] text-gray-500 leading-tight">
                      I agree to the{" "}
                      <span className="font-semibold text-gray-900 hover:underline">
                        Terms & Conditions
                      </span>{" "}
                      and{" "}
                      <span className="font-semibold text-gray-900 hover:underline">
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-red-500 text-[12px] mt-1">
                      {errors.terms}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Primary Button */}
            <button
              type="submit"
              className="w-full bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 rounded-full transition-all duration-200 shadow-sm mt-2 active:scale-[0.98]"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="relative flex py-5 items-center my-1">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-3 text-gray-400 text-[11px] uppercase tracking-wider">
              OR continue with
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div> */}

          {/* Social login buttons */}
          {/* <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition-all text-[13px] font-medium text-gray-700 active:scale-[0.98]">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.247-3.135C18.305 2.15 15.538 1 12.24 1 6.133 1 1.18 5.925 1.18 12s4.953 11 11.06 11c6.376 0 10.607-4.48 10.607-10.79 0-.726-.077-1.282-.174-1.925H12.24z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 hover:bg-gray-50 transition-all text-[13px] font-medium text-gray-700 active:scale-[0.98]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.63.73-1.19 1.87-1.04 2.98 1.12.09 2.26-.59 2.98-1.41z" />
              </svg>
              <span>Apple</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
