"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// Agar aap tabs use kar rahe hain, toh optionally yahan 'switchToSignup' prop pass kar sakte hain
const LoginForm = ({ switchToSignup }) => {
  const [step, setStep] = useState(1); // Step 1: Mobile, Step 2: OTP
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState(""); // Testing ke liye OTP dikhane ke liye
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessLoader, setShowSuccessLoader] = useState(false);

  const [formData, setFormData] = useState({
    mobile: "",
  });

  const { login } = useAuth();
  const router = useRouter();

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://crunchesweb-api.onrender.com/api/v1";

  // ================= STEP 1: Validation =================
  const validateStep1 = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.mobile) {
      tempErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (formData.mobile.length < 10) {
      tempErrors.mobile = "Please enter a valid mobile number";
      isValid = false;
    }


    setErrors(tempErrors);
    return isValid;
  };

  // ================= STEP 1: Validate & Send OTP =================
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;
    let tempErrors = {};
    let isValid = true;

    if (!mobileNumber.trim()) {
      tempErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (mobileNumber.length < 10) {
      tempErrors.mobile = "Please enter a valid 10-digit mobile number";
      isValid = false;
    }

    setErrors(tempErrors);
    if (!isValid) return;

    setLoading(true);
    try {
      // POST /auth/login-signup API call
      const response = await axios.post(`${BASE_URL}/auth/login-signup`, {
        mobileNumber: mobileNumber,
      });

      const isNewUser = response.data?.data?.isNewUser;
      const incomingOtp = response.data?.data?.otp;

      // Agar user naya hai (database me nahi hai), toh login mat karne do
      if (isNewUser === true) {
        toast.error("Number not registered. Please Sign up first! 🛑");
        if (switchToSignup) switchToSignup(); // Optionally switch to signup tab
        setLoading(false);
        return;
      }

      // Agar old user hai, toh OTP screen par jao
      if (incomingOtp) {
        setReceivedOtp(incomingOtp); // Testing UI ke liye
      }

      toast.success("OTP sent successfully to your mobile! 📱");
      setStep(2);
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Failed to send OTP.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ================= STEP 2: Verify OTP & Login =================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.length < 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    try {
      // POST /auth/verify-otp API call
      const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        mobileNumber: mobileNumber,
        otp: otp,
      });

      console.log("Login Success Data:", response.data);

      const token =
        response.data?.data?.token || response.data?.token || "";

      const userData = {
        name:
          response.data?.data?.user?.name ||
          response.data?.user?.name ||
          "User",
        email:
          response.data?.data?.user?.email ||
          response.data?.user?.email ||
          "",
        mobile: mobileNumber,
        token: token,
      };

      login(userData);
      setShowSuccessLoader(true);
      setTimeout(() => {
        router.push("/");
      }, 1000);
      toast.success("Logged in successfully! 🎉");
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "Invalid OTP.";
      toast.error(`Login Failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
        className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
        noValidate
      >
        {/* ================= STEP 1: MOBILE NUMBER INPUT ================= */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Mobile Number
            </label>
            <div
              className={`flex items-center border rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-[#f2b822]/20 focus-within:border-[#f2b822] transition-all ${errors.mobile ? "border-red-500" : "border-gray-200"
                }`}
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
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setMobileNumber(cleaned);
                  setFormData({ ...formData, mobile: cleaned });
                  setErrors({ ...errors, mobile: "" });
                }}
                className="w-full pl-3 py-3 text-[14px] text-gray-800 placeholder-gray-300 bg-transparent outline-none"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-[12px] mt-1">{errors.mobile}</p>
            )}

            <button
              type="submit"
              disabled={loading || mobileNumber.length !== 10}
              className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 rounded-lg transition-all duration-200 shadow-sm mt-6 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          </motion.div>
        )}

        {/* ================= STEP 2: OTP INPUT ================= */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Testing OTP Banner (Jaise Signup me tha) */}
            {receivedOtp && (
              <div className="bg-[#fcf8ef] border border-[#f2b822]/30 p-3 rounded-lg text-center mb-4">
                <p className="text-xs text-[#b8860b] font-medium uppercase tracking-wider mb-1">
                  Your OTP Code (Testing)
                </p>
                <p className="text-2xl font-bold text-gray-900 tracking-[0.2em]">
                  {receivedOtp}
                </p>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[13px] font-medium text-gray-700">
                  Enter 6-Digit OTP
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                    setReceivedOtp("");
                  }}
                  className="text-[12px] text-[#f2b822] hover:underline font-medium"
                >
                  Change Number
                </button>
              </div>
              <div className="flex justify-center py-2">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    setErrors({ ...errors, otp: "" });
                  }}
                >
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={`w-12 h-12 text-xl font-semibold border rounded-md transition-all text-center ${errors.otp
                            ? "border-red-500 ring-1 ring-red-500/20"
                            : "border-gray-300 focus:border-[#f2b822] focus:ring-2 focus:ring-[#f2b822]/20"
                          }`}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {errors.otp && (
                <p className="text-red-500 text-[12px] mt-1">{errors.otp}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 rounded-lg transition-all duration-200 shadow-sm mt-4 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Verifying..." : "Secure Login"}
            </button>
          </motion.div>
        )}
      </form>

      {/* ================= PREMIUM KHAKHRA LOADER ================= */}
      <AnimatePresence>
        {showSuccessLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="flex flex-col items-center text-center max-w-md"
            >
              <h2 className="text-2xl font-extrabold text-primary_color tracking-tight mb-1">
                Welcome back to Crunches
              </h2>
              <div className="relative w-52 h-52 mb-6 flex items-center justify-center">
                <div className="absolute w-40 h-40 bg-[#f2b822]/30 rounded-full blur-xl animate-pulse"></div>
                <motion.img
                  src="/img/cruncheslogo.png"
                  alt="Khakhra Loading"
                  className="w-40 h-40 object-contain relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]"
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="absolute w-44 h-44 border-[3px] border-transparent border-t-[#f2b822] border-b-[#f2b822]/40 rounded-full animate-spin [animation-duration:3s]"></div>
              </div>
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