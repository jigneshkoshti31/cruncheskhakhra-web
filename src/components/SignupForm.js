"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginSignup, verifyOtp } from "@/services/api"; // Updated imports
import { toast } from "sonner";
import { motion } from "framer-motion";
import "react-phone-input-2/lib/style.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "./context/AuthContext";

const SignupForm = ({ switchToLogin }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  // Sirf mobile number chahiye ab
  const [formData, setFormData] = useState({
    mobile: "",
  });

  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState(""); // Testing ke liye

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
    if (!agreeTerms) {
      tempErrors.terms = "You must agree to the Terms & Conditions";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // ================= STEP 1: Send OTP (Signup) =================
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    try {
      const cleanMobile = formData.mobile.slice(-10);
      const response = await loginSignup(cleanMobile);

      const isNewUser = response?.data?.isNewUser;
      const incomingOtp = response?.data?.otp;

      // 👇 Yahan naya logic add kiya hai 👇
      if (isNewUser === false) {
        // Agar user pehle se registered hai, toh error dikhao aur rok do
        toast.error("Number already registered please Login");

        // Agar aap chahte ho ki error aane ke baad automatically Login tab open ho jaye, 
        // toh niche wali line ka use kar sakte ho (optional):
        if (switchToLogin) switchToLogin();

        setLoading(false);
        return; // Process yahi rok do, OTP screen (Step 2) par mat jao
      }

      // Agar naya user hai tabhi aage badho
      if (incomingOtp) {
        setReceivedOtp(incomingOtp); // Screen par dikhane ke liye (testing mode)
      }

      toast.success("OTP sent successfully to your mobile number! 📱");
      setStep(2); // Direct OTP screen par jao
    } catch (err) {
      const errorMsg = err.message || "Failed to send OTP.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ================= STEP 2: Verify OTP =================
  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (otp.length < 6) {
      setErrors({ otp: "Please enter the complete 6-digit OTP" });
      return;
    }

    setLoading(true);
    try {
      const cleanMobile = formData.mobile.slice(-10);
      const response = await verifyOtp(cleanMobile, otp);

      // Token aur user data context/storage me save karo
      const userPayload = {
        mobile: cleanMobile,
        ...response?.data?.user,
        token: response?.data?.token,
      };

      login(userPayload);

      toast.success("Logged in successfully! 🎉");
      setStep(3); // Success Screen
    } catch (err) {
      setErrors({ otp: "Invalid OTP" });
      const errorMsg = err.message || "Oops! Incorrect OTP. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* STEP 1: Mobile Number */}
      {step === 1 && (
        <form
          onSubmit={handleSendCode}
          className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
        >
          {/* Mobile Field */}
          <div className="mb-2">
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Mobile Number
            </label>
            <div
              className={`rounded-lg transition-all duration-200 ${errors.mobile
                ? "border border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
                : ""
                }`}
            >
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
                  value={formData.mobile}
                  maxLength={10}
                  onChange={(e) => {
                    const cleaned = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    setFormData({ ...formData, mobile: cleaned });
                    setErrors({ ...errors, mobile: "" });
                  }}
                  className="w-full pl-3 py-3 text-[14px] text-gray-800 placeholder-gray-300 bg-transparent outline-none"
                />
              </div>
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div>
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <label className="flex items-center gap-2.5 cursor-pointer select-none mt-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    setErrors({ ...errors, terms: "" });
                  }}
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
                <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
              )}
            </motion.div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Sending OTP..." : "Get OTP"}
          </button>
        </form>
      )}

      {/* STEP 2: Verify OTP */}
      {step === 2 && (
        <form
          onSubmit={handleVerifyCode}
          className="animate-[fadeIn_0.3s_ease-out]"
        >
          <p className="text-[13px] text-gray-500 text-center mb-6">
            We sent a verification code to **{formData.mobile.slice(-4)}**
          </p>

          {receivedOtp && (
            <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
              <p className="text-xs text-amber-700 font-medium uppercase tracking-wider mb-1">
                Your OTP Code (Testing)
              </p>
              <p className="text-2xl font-bold text-amber-900 tracking-widest">
                {receivedOtp}
              </p>
            </div>
          )}

          {/* Shadcn OTP Input */}
          <div className="flex flex-col items-center justify-center mb-6">
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
                    className={`w-12 h-12 text-xl font-semibold border rounded-md transition-all ${errors.otp
                      ? "border-red-500 ring-1 ring-red-500/20"
                      : "border-gray-300 focus:border-[#f2b822]"
                      }`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {errors.otp && (
              <p className="text-red-500 text-xs mt-2">{errors.otp}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 rounded-full transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* STEP 3: Success */}
      {step === 3 && (
        <div className="animate-[scaleIn_0.4s_ease-out] flex flex-col items-center justify-center py-4">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Success!</h2>
          <p className="text-sm text-gray-500 mb-4 text-center">
            You are successfully logged in.
          </p>
          <button
            onClick={() => router.push("/")} // Yahan aap apna dashboard path set kar sakte ho
            className="w-full bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupForm;