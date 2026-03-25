/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // Ye domains whitelisting zaroori hai external images load karne ke liye
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Product images ke liye
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // Reviewer avatars ke liye
      },
    ],
  },
};

export default nextConfig;
