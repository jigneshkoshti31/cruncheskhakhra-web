"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
const LoginForm = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessLoader, setShowSuccessLoader] = useState(false);

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

        console.log("Ki backend se kya data aa raha hai:", response.data);

        const token =
          response.data?.data?.accessToken || response.data?.accessToken || "";

        // const userData = {
        //   name: response.data?.name || "User",
        //   email: response.data?.email || "",
        //   mobile: mobileNumber,
        //   token: token,
        // };
        const userData = {
        name: response.data?.data?.user?.name || 
              response.data?.data?.name || 
              response.data?.user?.name || 
              response.data?.name || 
              "User",
        email: response.data?.data?.user?.email || 
               response.data?.data?.email || 
               response.data?.email || 
               "",
        mobile: mobileNumber,
        token: token,
      };

        login(userData);
        setShowSuccessLoader(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
        toast.success("User logged in successfully! 🎉");
      } catch (error) {
        const status = error.response?.status;
        const errorMsg =
          error.response?.data?.msg ||
          error.response?.data?.message ||
          "Something went wrong.";

        if (
          status === 404 ||
          errorMsg.toLowerCase().includes("not found") ||
          errorMsg.toLowerCase().includes("not registered")
        ) {
          toast.error("Invalid credentials! 🛑");
        } else {
          toast.error(`Login Failed: ${errorMsg}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
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
              placeholder="Enter Your Phone Number"
              value={mobileNumber}
              maxLength={10}
              // onChange={(e) => {
              //   setMobileNumber(e.target.value.replace(/\D/g, ""));
              //   setErrors({ ...errors, mobile: "" });
              // }}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
                setMobileNumber(cleaned);
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
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 rounded-full transition-all duration-200 shadow-sm mt-2 active:scale-[0.98] disabled:opacity-70"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {/* Premium Khakhra Loader Overlay */}
      <AnimatePresence>
        {showSuccessLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-xl" // Darker premium blur
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="flex flex-col items-center text-center max-w-md"
            >
              <h2 className="text-2xl font-extrabold text-primary_color tracking-tight mb-1">
                Welcome to Crunches Khakhra
              </h2>
              {/* === KHAKHRA LIVE ANIMATION ZONE === */}
              <div className="relative w-52 h-52 mb-6 flex items-center justify-center">
                {/* Peeche ki Glow Light Effect */}
                <div className="absolute w-40 h-40 bg-[#f2b822]/30 rounded-full blur-xl animate-pulse"></div>

                {/* Aapka Khakhra Image - Jo Infinite Float aur Rotate karega */}
                <motion.img
                  src="/img/cruncheslogo.png" // Yahan aap apni khakhra ki image ka path daalna
                  alt="Khakhra Loading"
                  className="w-40 h-40 object-contain relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]"
                  animate={{
                    y: [0, -12, 0], // Upar niche float hoga (1.5s me)
                    rotate: [0, 15, -15, 0], // Halka sa swing/rotate karega premium feel ke liye
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Bahar ka Ultra-Smooth Spinner Ring */}
                <div className="absolute w-44 h-44 border-[3px] border-transparent border-t-[#f2b822] border-b-[#f2b822]/40 rounded-full animate-spin [animation-duration:3s]"></div>
              </div>
              {/* =================================== */}

              
              <p className="text-xs text-primary_color tracking-widest uppercase font-medium px-4">
                freshness in every bite!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoginForm;
