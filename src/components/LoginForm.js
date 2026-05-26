"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import { toast } from "sonner";
// import toast from "react-hot-toast";
const LoginForm = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!mobileNumber.trim()) {
      tempErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (mobileNumber.length < 10) {
      tempErrors.mobile = "Please enter a valid 10-digit mobile number";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      try {
        // Replace BASE_URL with your actual Render API URL environment variable
        const BASE_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://crunchesweb-api.onrender.com/api/v1";

        const response = await axios.post(`${BASE_URL}/auth/login`, {
          mobile: mobileNumber,
          password: password,
          deviceType: "Web",
          deviceInfo: "Browser",
          deviceIp: "127.0.0.1",
        });

        const token = response.data?.data?.accessToken || response.data?.accessToken || "";

        // API success hone par data Context aur Local Storage me jayega
        const userData = {
          name: response.data?.name || "User",
          email: response.data?.email || "",
          mobile: mobileNumber,
          token: token,
        };

        login(userData);
        toast.success("User logged in successfully! 🎉");
        router.push("/"); // Login ke baad home page par redirect
      } catch (error) {
       // Backend se aane wale error ko pakadna
        const status = error.response?.status;
        const errorMsg = error.response?.data?.msg || error.response?.data?.message || "Something went wrong.";

        // Agar user database me nahi hai (usually backend 404 ya specific message bhejta hai)
        if (status === 404 || errorMsg.toLowerCase().includes("not found") || errorMsg.toLowerCase().includes("not registered")) {
          toast.error("Invalid credentials! 🛑");
        } 
        // Invalid password ya koi aur error
        else {
          toast.error(`Login Failed: ${errorMsg}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
      noValidate
    >
      {/* Show API Error if any */}
      {errors.api && (
        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
          {errors.api}
        </div>
      )}
      {/* Mobile Number Field */}
      <div>
        <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
          Mobile Number
        </label>
        <div
          className={`flex items-center border rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-[#f2b822]/20 focus-within:border-[#f2b822] transition-all ${errors.mobile ? "border-red-500" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-1 pr-2 border-r border-gray-200 text-gray-700 text-[14px] cursor-pointer select-none">
            <span className="text-[16px]">🇮🇳</span>
            <span className="font-medium">+91</span>
          </div>
          <input
            type="tel"
            placeholder="Type here"
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value.replace(/\D/g, ""));
              setErrors({ ...errors, mobile: "" });
            }}
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
          className={`flex items-center border rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-[#f2b822]/20 focus-within:border-[#f2b822] transition-all ${errors.password ? "border-red-500" : "border-gray-200"}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
            className="w-full py-3 text-[14px] text-gray-800 placeholder-gray-300 bg-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none ml-2"
          >
            {/* Eye Icon SVG */}
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
          <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>
        )}
      </div>

      {/* Forgot Password */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <Link
          href="/user/forgot-password"
          className="text-[12px] font-medium text-gray-900 hover:underline"
        >
          Forgot Password?
        </Link>
      </motion.div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 rounded-full transition-all duration-200 shadow-sm mt-2 active:scale-[0.98]"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
