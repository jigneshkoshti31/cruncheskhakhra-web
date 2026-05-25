"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  return (
    <div>
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
          <p className="text-red-500 text-[12px] mt-1">{errors.terms}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
