"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

const LoginSignup = () => {
  // Tabs State: 'login' | 'signup'
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-[#fafafa] overflow-hidden">
      {/* LEFT SIDE: Smooth Image Section */}
      <div className="hidden lg:block relative w-full min-h-screen overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab === "login" ? "login-img" : "signup-img"}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full"
          >
            <Image
              src={
                activeTab === "login" ? "/img/loginBG.svg" : "/img/signupBG.svg"
              }
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
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-[24px] font-semibold text-gray-900 tracking-tight">
              {activeTab === "login" ? "Welcome Back" : "Create an Account"}
            </h2>
            <p className="text-[13px] text-gray-400 mt-1">
              {activeTab === "login"
                ? "Sign in to your account"
                : "Enter your details to register"}
            </p>
          </div>

          {/* Super Smooth Toggle Tabs (Framer Motion) */}
          <div className="bg-[#f0f2f5] p-1 rounded-lg flex relative w-full mb-6">
            {["Login", "Sign Up"].map((tab) => {
              const tabValue = tab === "Login" ? "login" : "signup";
              const isActive = activeTab === tabValue;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tabValue)}
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

          {/* Conditionally Render the Forms */}
          {/* {activeTab === "login" ? <LoginForm /> : <SignupForm />} */}
          {activeTab === "login" ? (
            <LoginForm />
          ) : (
            <SignupForm switchToLogin={() => setActiveTab("login")} />
          )}
        </div>
      </div>

      {/* Custom Keyframes for Animations inside Forms */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `,
        }}
      />
    </div>
  );
};

export default LoginSignup;
