import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="bg-green_color py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-award text-3xl mb-3 text-primary_color"></i>
            <h5 className="font-semibold text-sm">Premium Quality</h5>
          </div>
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-leaf text-3xl mb-3 text-primary_color"></i>
            <h5 className="font-semibold text-sm">100% Natural</h5>
          </div>
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-truck-fast text-3xl mb-3 text-primary_color"></i>
            <h5 className="font-semibold text-sm">Fast Delivery</h5>
          </div>
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-shield-halved text-3xl mb-3 text-primary_color"></i>
            <h5 className="font-semibold text-sm">Secure Payment</h5>
          </div>
        </div>
      </div>
      <footer className="bg-green_color text-gray-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Image
              src="/img/cruncheslogo.png"
              alt="cruncheslogo"
              width={176}
              height={60}
              className="object-contain mb-6"
            />
            <p className="text-sm mb-6 leading-relaxed">
              Bringing the authentic taste of Gujarat to your home with our
              premium, hand-roasted, and healthy khakhras. A perfect companion
              for your tea!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  Shop Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Popular Flavours
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  Plain Sada Khakhra
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  Methi Khakhra
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  Jeera Khakhra
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  Masala Khakhra
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary_color transition">
                  Diet Khakhra
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <i className="fa-solid fa-location-dot mt-1 mr-3 text-primary_color"></i>
                <span>
                  Shade No-2, Kothari Estate, Santej, Ahmedabad - 382722
                </span>
              </li>
              {/* <li className="flex items-center">
                <i className="fa-solid fa-phone mr-3 text-primary_color"></i>
                <span>+91 85119 62244</span>
                <span>+91 76001 67002</span>
              </li> */}
              {/* <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-primary_color"></i>

                <a
                  href="tel:+918511962244"
                  className="hover:text-primary_color"
                >
                  +91 85119 62244
                </a>

                <a
                  href="tel:+917600167002"
                  className="hover:text-primary_color"
                >
                  +91 76001 67002
                </a>
              </li> */}
              <li className="flex flex-col gap-2">
                {/* Number 1 */}
                <div className="flex gap-3 items-center">
                  <a href="tel:+918511962244">
                    <i className="fa-solid fa-phone text-primary_color"></i>
                  </a>
                  <a href="https://wa.me/918511962244" target="_blank">
                    <i className="fa-brands fa-whatsapp text-green-500"></i>
                  </a>
                  <span>+91 85119 62244</span>
                </div>

                {/* Number 2 */}
                <div className="flex gap-3 items-center">
                  <a href="tel:+917600167002">
                    <i className="fa-solid fa-phone text-primary_color"></i>
                  </a>
                  <a href="https://wa.me/917600167002" target="_blank">
                    <i className="fa-brands fa-whatsapp text-green-500"></i>
                  </a>
                  <span>+91 76001 67002</span>
                </div>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-envelope mr-3 text-primary_color"></i>
                <span>info.cruncheskhakhra@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; 2026 Crunchy Khakhra. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
