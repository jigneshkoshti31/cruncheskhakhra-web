"use client";

import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { sendOtp, verifyOtp, registerUser } from "@/services/api";
import { toast } from "sonner";
// import toast from "react-hot-toast";
import { motion } from "framer-motion";
// React Phone Input
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// Shadcn OTP Input (Adjust path if needed)
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  // Changed OTP state to a simple string for Shadcn InputOTP
  const [otp, setOtp] = useState("");

  // Otp show screen
  const [receivedOtp, setReceivedOtp] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobile: value });
    setErrors({ ...errors, mobile: "" });
  };

  // ================= STEP 1: Details Validation =================
  const validateStep1 = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Full Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }
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

  // STEP 1: Send OTP
  // const handleSendCode = async (e) => {
  //   e.preventDefault();
  //   if (!validateStep1()) return;

  //   setLoading(true);
  //   try {
  //     await sendOtp(formData.mobile);
  //     toast.success("OTP sent successfully to your mobile number! 📱");
  //     setStep(2);
  //   } catch (err) {
  //     const errorMsg = err?.response?.data?.msg || err?.response?.data?.message || err.message || "Failed to send OTP.";
  //     toast.error(errorMsg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ================= STEP 2: Verify OTP =================
  // const handleVerifyCode = async (e) => {
  //   e.preventDefault();

  //   if (otp.length < 6) {
  //     setErrors({ otp: "Please enter the complete 6-digit OTP" });
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     await verifyOtp(formData.mobile, otp);
  //     toast.success("OTP Verified Successfully! ✅");
  //     setStep(3);
  //   } catch (err) {
  //     setErrors({ otp: "Invalid OTP" });
  //     const errorMsg = err?.response?.data?.msg || err?.response?.data?.message || "Oops! Incorrect OTP. Please try again.";
  //     toast.error(errorMsg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // otp show screen function
  // STEP 1: Send OTP
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    try {
      // response ko ek variable me liya
      const response = await sendOtp(formData.mobile);

      // NOTE: Agar aapka OTP response.data.otp me hai ya directly response.otp me,
      // uske mutabik niche wali line ko adjust karein.
      const incomingOtp = response?.data?.otp || response?.otp;

      if (incomingOtp) {
        setReceivedOtp(incomingOtp); // OTP state me save kar liya
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

    setLoading(true);
    try {
      await verifyOtp(formData.mobile, otp);
      toast.success("OTP Verified Successfully! ✅");
      setStep(3);
    } catch (err) {
      setErrors({ otp: "Invalid OTP" });
      const errorMsg =
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        "Oops! Incorrect OTP. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ================= STEP 3: Register Details Validation =================
  const validateStep3 = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // STEP 3: Register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    try {
      const cleanMobile = formData.mobile.slice(-10);
      const payload = {
        mobile: cleanMobile,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        deviceType: "Web",
        deviceInfo: "Browser",
        deviceIp: "127.0.0.1",
      };

      const response = await registerUser(payload);

      // Save details to Local Storage
      // localStorage.setItem(
      //   "userDetails",
      //   JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     mobile: cleanMobile,
      //   }),
      // );
      const userPayload = {
        name: formData.name,
        email: formData.email,
        mobile: cleanMobile,
        ...response?.data // Agar backend se token ya id aati hai to vo bhi save ho jaye
      };

      login(userPayload);

      toast.success("Logged in successfully! 🎉");
      setStep(4);
    } catch (err) {
     const errorMsg = err?.response?.data?.msg || "Registration failed.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* STEP 1: Details */}
      {step === 1 && (
        <form
          onSubmit={handleSendCode}
          className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
        >
          {/* Name Field */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 text-[14px] text-gray-900 border rounded-lg outline-none transition-all ${
                errors.name
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-200 focus:border-[#f2b822] focus:ring-[#f2b822]/20"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 text-[14px] text-gray-900 border rounded-lg outline-none transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-gray-200 focus:border-[#f2b822] focus:ring-[#f2b822]/20"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Mobile Field (React Phone Input 2) */}
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
                className={`flex items-center border rounded-lg px-3 bg-white focus-within:ring-2 focus-within:ring-[#f2b822]/20 focus-within:border-[#f2b822] transition-all ${errors.mobile ? "border-red-500" : "border-gray-200"}`}
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
                    // State me formData ke andar mobile number ko save kiya ✨
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
            {loading ? "Sending..." : "Send OTP"}
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

      {/* STEP 3: Passwords */}
      {step === 3 && (
        <form
          onSubmit={handleRegister}
          className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
        >
          {/* Password */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div
              className={`flex items-center border rounded-lg overflow-hidden bg-white transition-all ${
                errors.password
                  ? "border-red-500 ring-1 ring-red-500/20"
                  : "border-gray-200 focus-within:border-[#f2b822] focus-within:ring-1 focus-within:ring-[#f2b822]/20"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
            {loading ? "Processing..." : "Complete Registration"}
          </button>
        </form>
      )}

      {/* STEP 4: Success */}
      {step === 4 && (
        <div className="animate-[scaleIn_0.4s_ease-out] flex flex-col items-center justify-center py-4">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Success!</h2>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Your account has been created successfully.
          </p>
          <button
            onClick={switchToLogin}
            className="w-full bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
