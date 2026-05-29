import axios from "axios";

const BASE_URL = "https://crunchesweb-api.onrender.com/api/v1";

export const sendOtp = async (mobileNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/send-otp`, {
      mobile: mobileNumber,
    });
    return response.data;
  } catch (error) {
    // Backend se aayi exact message throw karo
    const errorMsg =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      "Failed to send OTP";
    throw new Error(errorMsg);
  }
};

export const verifyOtp = async (mobile, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      mobile,
      otp,
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Invalid or expired OTP";
    throw new Error(errorMsg);
  }
};

export const registerUser = async (userData) => {
  console.log("🚀, Data:", userData); // 1. Ye check karo console me aata hai?

  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData);
    console.log("✅ API Success Response:", response.data); // 2. Success hone par data
    return response.data;
  } catch (error) {
    // 3. Sabse zaroori: Error ko puri tarah se print karo
    if (error.response) {
      // Server se error aaya hai (400, 404, 500 etc)
      console.error("❌ Server Error Response:", error.response.data);
    } else if (error.request) {
      // Request bheji par response nahi mila
      console.error("❌ Request Error (No response):", error.request);
    } else {
      // Setup me kuch gadbad hai
      console.error("❌ Error Setup:", error.message);
    }
    
    // Error ko throw karo taaki SignupForm handle kar sake
    throw error; 
  }
};

// 1. Send OTP for Forgot Password
export const forgotPassword = async (mobileNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      mobile: mobileNumber,
    });
    return response.data; 
  } catch (error) {
    let errorMsg =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      "Failed to request password reset";

    // Agar user database me nahi hai, ya backend isActive wala error fek raha hai
    if (
      error.response?.status === 404 || 
      errorMsg.includes("isActive") || 
      errorMsg.includes("properties of null")
    ) {
      // User-friendly custom message
      errorMsg = "This mobile number is not registered. Please sign up first.";
    }

    throw new Error(errorMsg);
  }
};

// 2. Reset Password with OTP
export const resetPassword = async (mobile, password, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
      mobile,
      password,
      otp, // Swagger ke mutabik OTP aur password dono body me jayenge
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      "Invalid OTP or failed to reset password";
    throw new Error(errorMsg);
  }
};