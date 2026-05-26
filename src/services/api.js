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