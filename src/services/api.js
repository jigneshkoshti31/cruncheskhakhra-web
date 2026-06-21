import axios from "axios";

const BASE_URL = "https://crunchesweb-api.onrender.com/api/v1";

// Naya Login/Signup API function
export const loginSignup = async (mobileNumber) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login-signup`, {
      mobileNumber: mobileNumber, // Swagger ke hisaab se key "mobileNumber" hai
    });
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      "Failed to send OTP";
    throw new Error(errorMsg);
  }
};

// Updated Verify OTP function
export const verifyOtp = async (mobileNumber, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      mobileNumber: mobileNumber, // API format match kiya gaya hai
      otp: otp,
    });
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Invalid or expired OTP";
    throw new Error(errorMsg);
  }
};