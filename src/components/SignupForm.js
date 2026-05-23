"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ChevronDown, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { sendOtp, verifyOtp, registerUser } from "@/services/api";
import toast from "react-hot-toast";

const SignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (formData.mobile.length < 10) {
      toast.error("Please enter a valid mobile number.");
      return;
    }
    setLoading(true);
   
    try {
      await sendOtp(formData.mobile);
      toast.success("OTP sent successfully!");
      setStep(2);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(formData.mobile, otpValue);
      toast.success("OTP Verified!");
      setStep(3);
    } catch (err) {
      toast.error(err.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        mobile: formData.mobile,
        password: formData.password,
        name: formData.name,
        email: formData.email,
        deviceType: "Web",
        deviceInfo: "Browser",
        deviceIp: "127.0.0.1",
      };
      await registerUser(payload);
      toast.success("Account created successfully!");
      setStep(4);
    } catch (err) {
        console.log("Error caught in Component:", err.message);
     const msg = err.message || "Registration failed.";
      if (msg.toLowerCase().includes("already")) {
        toast.error("User already exists with this mobile number");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 text-sm text-red-500 text-center font-medium">
          {error}
        </div>
      )}

      {/* STEP 1: Details */}
      {step === 1 && (
        <form
          onSubmit={handleSendCode}
          className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
        >
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-[14px] text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#f2b822] focus:ring-1 focus:ring-[#f2b822]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-[14px] text-gray-900 border border-gray-200 rounded-lg outline-none focus:border-[#f2b822] focus:ring-1 focus:ring-[#f2b822]/20 transition-all"
            />
          </div>
          <div className="mb-2">
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Mobile Number
            </label>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 focus-within:border-[#f2b822] focus-within:ring-1 focus-within:ring-[#f2b822]/20">
              <div className="flex items-center gap-1 px-3 bg-gray-50 border-r border-gray-200">
                <span className="text-lg">🇮🇳</span>
                <span className="text-[14px] text-gray-700 font-medium">
                  +91
                </span>
              </div>
              <input
                type="tel"
                name="mobile"
                required
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-3 text-[14px] text-gray-900 outline-none bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />} Send OTP
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
            We sent a verification code to **{formData.mobile.slice(-4)}
          </p>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 text-center text-xl font-semibold text-gray-900 border border-gray-300 rounded-lg outline-none focus:border-[#f2b822] focus:ring-2 focus:ring-[#f2b822]/20 transition-all bg-white"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 rounded-full transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />} Verify
            OTP
          </button>
        </form>
      )}

      {/* STEP 3: Passwords */}
      {step === 3 && (
        <form
          onSubmit={handleRegister}
          className="space-y-4 animate-[fadeIn_0.3s_ease-out]"
        >
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-[#f2b822] focus-within:ring-1 focus-within:ring-[#f2b822]/20">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
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
          </div>
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white focus-within:border-[#f2b822] focus-within:ring-1 focus-within:ring-[#f2b822]/20">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
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
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70"
          >
            {loading && <Loader2 size={16} className="animate-spin" />} Complete
            Registration
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
          <button
            onClick={() => router.push("/user/login")}
            className="w-full bg-[#f2b822] hover:bg-[#e0aa1f] text-gray-900 font-semibold text-[14px] py-3 mt-4 rounded-full transition-all duration-200 shadow-sm"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
