"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
// Agar aapne shadcn ka InputOTP install kiya hai, toh aap usko yaha import karke
// niche Step 2 wale div mein replace kar sakte hain. Filhal maine Tailwind se same design bana diya hai.

const ForgotPassword = () => {
  // Step 1: Forgot, Step 2: OTP, Step 3: Reset, Step 4: Success
  const [step, setStep] = useState(1);
  
  // Form States
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Handlers for step transitions
  const handleSendCode = (e) => {
    e.preventDefault();
    if(mobile.length >= 10) setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if(otpValue.length === 4) setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setStep(4);
  };

  // OTP Input Handler (Simulating shadcn behavior)
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    // Focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="h-screen overflow-hidden flex w-full bg-gray-50 font-sans">
      
      {/* Left Side - Image Background */}
      <div 
        className="hidden lg:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/img/loginBG.svg')" }} 
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
        
        <div className="bg-white w-full max-w-[450px] p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden relative">
          
          {/* STEP 1: FORGOT PASSWORD */}
          {step === 1 && (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
                <p className="text-sm text-gray-500 px-4">Enter your registered mobile number. We will send you a verification code.</p>
              </div>

              <form onSubmit={handleSendCode}>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden transition-all duration-200 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500">
                    <div className="flex items-center gap-1 px-3 bg-gray-50 border-r border-gray-300 cursor-pointer">
                      <span className="text-lg">🇺🇸</span>
                      <span className="text-sm text-gray-700 font-medium">+1</span>
                      <ChevronDown size={14} className="text-gray-500" />
                    </div>
                    <input 
                      type="tel" 
                      required
                      placeholder="Type here"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-4 py-3 text-sm text-gray-900 outline-none bg-transparent"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#f6b426] hover:bg-[#e5a51f] text-black font-semibold text-sm py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] mb-6">
                  Send
                </button>
                
                <div className="text-center">
                  <span className="text-sm text-gray-500">Remember password? </span>
                  <Link href="/user/login" className="text-sm font-semibold text-gray-900 hover:underline">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: VERIFY IDENTITY (OTP) */}
          {step === 2 && (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h2>
                <p className="text-sm text-gray-500 px-4">We have sent a verification code to your mobile number ending in **{mobile.slice(-4)}</p>
              </div>

              <form onSubmit={handleVerifyCode}>
                {/* Shadcn style OTP Inputs */}
                <div className="flex justify-center gap-3 mb-8">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      className="w-14 h-14 text-center text-2xl font-semibold text-gray-900 border border-gray-300 rounded-lg outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all bg-white shadow-sm"
                    />
                  ))}
                </div>

                <button type="submit" className="w-full bg-[#f6b426] hover:bg-[#e5a51f] text-black font-semibold text-sm py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] mb-6">
                  Verify Code
                </button>
                
                <div className="text-center">
                  <span className="text-sm text-gray-500">Didn&apos;t receive the code? </span>
                  <button type="button" className="text-sm font-semibold text-gray-900 hover:underline">
                    Resend
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: RESET PASSWORD */}
          {step === 3 && (
            <div className="animate-[fadeIn_0.4s_ease-out]">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-sm text-gray-500 px-4">Create a new password for your account</p>
              </div>

              <form onSubmit={handleResetPassword}>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden transition-all duration-200 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500 bg-white">
                    <input 
                      type={showNewPassword ? "text" : "password"} 
                      required
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 text-sm text-gray-900 outline-none bg-transparent"
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="px-4 text-gray-400 hover:text-gray-600">
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden transition-all duration-200 focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500 bg-white">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      required
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3 text-sm text-gray-900 outline-none bg-transparent"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="px-4 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#f6b426] hover:bg-[#e5a51f] text-black font-semibold text-sm py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]">
                  Reset Password
                </button>
              </form>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="animate-[scaleIn_0.4s_ease-out] flex flex-col items-center justify-center py-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Password Reset Successfully</h2>
              <p className="text-sm text-gray-500 text-center mb-8 px-4">
                Your password has been successfully updated. You can now login with your new password.
              </p>
              
              <Link href="/user/login" className="w-full">
                <button className="w-full bg-[#f6b426] hover:bg-[#e5a51f] text-black font-semibold text-sm py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98]">
                  Go to Login
                </button>
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Custom Keyframes for smooth UI transitions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
};

export default ForgotPassword;