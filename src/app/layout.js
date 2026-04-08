import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/global/header/Header";
import Footer from "@/components/global/footer/Footer";
import { CartProvider } from "@/components/context/CartContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata = {
  title: "Crunches Khakhra",
  description: "Best Crunches Khakhra in India 🔥",
  openGraph: {
    title: "Crunches Khakhra",
    description: "Healthy aur tasty khakhra – Crunches Khakhra",
    url: "https://cruncheskhakhra.vercel.app/",
    siteName: "Crunches Khakhra",
    images: [
      {
        url: "/img/cruncheslogo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${poppins.className} ${playfair.className} font-sans bg-gray-50 text-gray-800 antialiased selection:bg-primary_color selection:text-white`}> */}
      <body
        className={`${poppins.className} font-sans bg-gray-50 text-gray-800 antialiased selection:bg-primary_color selection:text-white`}
      >
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
