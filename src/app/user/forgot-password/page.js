"use client";

import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { forgotPassword, resetPassword } from "@/services/api"; // Apne hisaab se adjust karein
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import "react-phone-input-2/lib/style.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordForm = ({ switchToLogin }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    mobile: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ================= STEP 1: Mobile Validation =================
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

  // STEP 1: Send OTP for Forgot Password
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    try {
      const response = await forgotPassword(formData.mobile);

      const incomingOtp = response?.data?.otp || response?.otp;
      if (incomingOtp) {
        setReceivedOtp(incomingOtp);
      }

      toast.success("OTP sent successfully to your mobile number! 📱");
      setStep(2);
    } catch (err) {
      const errorMsg =
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        err.message ||
        "Failed to send OTP.";
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

    toast.success("OTP entered! Now set your new password. ✅");
    setStep(3);
  };

  // ================= STEP 3: Reset Password Validation =================
  const validateStep3 = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.newPassword) {
      tempErrors.newPassword = "Password is required";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      tempErrors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // STEP 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    try {
      const cleanMobile = formData.mobile.slice(-10);
      await resetPassword(cleanMobile, formData.newPassword);

      toast.success("Password reset successfully! 🎉");
      setStep(4);
    } catch (err) {
      const errorMsg =
        err.message || "Invalid OTP or failed to reset password.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-[#fafafa] overflow-hidden">
      {/* LEFT SIDE: Smooth Image Section */}
      <div className="hidden lg:block relative w-full min-h-screen overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            // key={activeTab === "login" ? "login-img" : "signup-img"}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full"
          >
            <Image
              src="/img/signupBG.svg"
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
        <div className="w-full md:max-w-2/3 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.04)] p-5 flex flex-col justify-center min-w-[350px]">
          {/* STEP 1: Enter Mobile */}
          {step === 1 && (
            <form
              onSubmit={handleSendCode}
              className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Forgot Password?
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Enter your registered mobile number to reset it.
                </p>
              </div>

              {/* Mobile Field */}
              <div className="mb-2">
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                  Mobile Number
                </label>
                <div
                  className={`rounded-lg transition-all duration-200 ${
                    errors.mobile
                      ? "border border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
                      : ""
                  }`}
                >
                  <div
                    className={`flex items-center border rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-[#f2b822]/20 focus-within:border-[#f2b822] transition-all ${
                      errors.mobile ? "border-red-500" : "border-gray-200"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
              <Link href="/user/login">
                <button
                  type="button"
                  className="w-full text-sm text-gray-500 hover:text-gray-900 mt-4 transition-colors"
                >
                  Back to Login
                </button>
              </Link>
            </form>
          )}

          {/* STEP 2: Verify OTP */}
          {step === 2 && (
            <form
              onSubmit={handleVerifyCode}
              className="animate-[fadeIn_0.3s_ease-out]"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Verify OTP</h2>
                <p className="text-[13px] text-gray-500 mt-1">
                  We sent a verification code to **{formData.mobile.slice(-4)}**
                </p>
              </div>

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
                        className={`w-12 h-12 text-xl font-semibold border rounded-md transition-all ${
                          errors.otp
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

          {/* STEP 3: Reset Password */}
          {step === 3 && (
            <form
              onSubmit={handleResetPassword}
              className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Create New Password
                </h2>
                <p className="text-[13px] text-gray-500 mt-1">
                  Please enter your new password below.
                </p>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                  New Password
                </label>
                <div
                  className={`flex items-center border rounded-lg overflow-hidden bg-white transition-all ${
                    errors.newPassword
                      ? "border-red-500 ring-1 ring-red-500/20"
                      : "border-gray-200 focus-within:border-[#f2b822] focus-within:ring-1 focus-within:ring-[#f2b822]/20"
                  }`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-[14px] text-gray-900 outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                  Confirm Password
                </label>
                <div
                  className={`flex items-center border rounded-lg overflow-hidden bg-white transition-all ${
                    errors.confirmPassword
                      ? "border-red-500 ring-1 ring-red-500/20"
                      : "border-gray-200 focus-within:border-[#f2b822] focus-within:ring-1 focus-within:ring-[#f2b822]/20"
                  }`}
                >
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-[14px] text-gray-900 outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="px-4 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </form>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="animate-[scaleIn_0.4s_ease-out] flex flex-col items-center justify-center py-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Password Reset Successful!
              </h2>
              <p className="text-sm text-gray-500 mb-4 text-center">
                You can now log in with your new password.
              </p>
              <Link href="/user/login" className="w-full">
                <button className="w-full bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm">
                  Go to Login
                </button>
              </Link>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
