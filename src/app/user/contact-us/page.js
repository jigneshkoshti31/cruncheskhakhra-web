"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, Clock } from "lucide-react";

const CommonBannerPage = ({ title, decs }) => (
  <div className="relative w-full h-[450px] flex flex-col items-center justify-center overflow-hidden bg-green_color">
    {/* Subtle texture/pattern overlay */}
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>

    <div className="relative z-20 text-center px-4 mt-[-60px]">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
        {title}
      </h1>
      <p className="text-xl md:text-2xl text-[#F4B618] font-medium max-w-2xl mx-auto drop-shadow-sm">
        {decs}
      </p>
    </div>
  </div>
);

const Contactpage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // access_key: "2e2bc0ae-0400-4acf-8f3f-814cc979ead9", // ⚠️ YAHAN APNI ACCESS KEY PASTE KAREIN ⚠️
          // access_key: "2c6ef7d1-e7e4-485c-8321-b2836b7c4c22",
          access_key: "6340048e-a3a8-4d57-81af-46f39e25a247",
        }),
      });
      console.log("Submitting form data:", formData);

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        // Form clear kar dega success hone par
        setFormData({ name: "", email: "", phone: "", message: "" });
        // 4 second baad success message hata dega
        setTimeout(() => setIsSubmitted(false), 4000);
      } else {
        console.error("Form submission error:", result);
        alert("Something went wrong! " + result.message);
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to send the message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <CommonBannerPage
        title="Contact Us"
        decs="Browse our collection of fresh, crispy khakhra"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-30">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          <div className="w-full lg:w-5/12 bg-[#01572E] p-10 sm:p-14 text-white relative overflow-hidden flex flex-col justify-center">
            {/* Background Decorative Accent */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-72 h-72 bg-[#F4B618] rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-[#00381d] rounded-full opacity-50 blur-2xl"></div>

            <div className="relative z-10 space-y-12">
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Get in Touch
                </h3>
                <p className="text-green-100/80 text-lg leading-relaxed">
                  We&apos;d love to hear from you. Reach out for bulk orders,
                  distributorship, or any queries regarding our delicious
                  khakhras.
                </p>
              </div>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#F4B618] group-hover:text-[#01572E] transition-all duration-300 shadow-sm text-[#F4B618]">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-semibold text-[#F4B618] uppercase tracking-widest mb-1">
                      Visit Us
                    </p>
                    <p className="text-lg text-white leading-relaxed font-medium">
                      Shade no.2, Kothari estate, Santej, Ahmedabad, Gujarat,
                      India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start group">
                  <div className="shrink-0 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#F4B618] group-hover:text-[#01572E] transition-all duration-300 shadow-sm text-[#F4B618]">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div className="ml-6 flex flex-col justify-center h-14">
                    <p className="text-sm font-semibold text-primary_color uppercase tracking-widest mb-1">
                      Call Us
                    </p>
                    <p className="text-lg text-white font-medium">
                      <a
                        href="tel:+918511962244"
                        className="hover:text-primary_color transition-colors cursor-pointer"
                      >
                        +91 85119 62244
                      </a>
                      {" | "}
                      <a
                        href="tel:+917600167002"
                        className="hover:text-primary_color transition-colors cursor-pointer"
                      >
                        +91 76001 67002
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start group">
                  <div className="shrink-0 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#F4B618] group-hover:text-[#01572E] transition-all duration-300 shadow-sm text-[#F4B618]">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div className="ml-6 flex flex-col justify-center h-14">
                    <p className="text-sm font-semibold text-[#F4B618] uppercase tracking-widest mb-1">
                      Email Us
                    </p>
                    <p className="text-lg text-white hover:text-[#F4B618] transition-colors cursor-pointer font-medium">
                      hello@cruncheskhakhra.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 p-10 sm:p-14 bg-white">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-[#01572E] mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-500">
                Fill out the form below and our team will get back to you
                shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-[#01572E]"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B618] focus:border-[#F4B618] transition-all outline-none text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-[#01572E]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B618] focus:border-[#F4B618] transition-all outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>
                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-bold text-green_color"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 00000 00000"
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B618] focus:border-[#F4B618] transition-all outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-green_color"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you today?"
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary_color focus:border-[#F4B618] transition-all outline-none text-gray-800 placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-4 px-8 rounded-xl font-extrabold text-[#01572E] text-lg transition-all duration-300 transform ${
                  isSubmitted
                    ? "bg-green-400 text-green_color"
                    : "bg-primary_color hover:bg-[#e0a412] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#F4B618]/20 active:scale-[0.98]"
                }`}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Sending Request...</span>
                ) : isSubmitted ? (
                  <span>Message Sent Successfully!</span>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5 ml-1" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-20">
        <div className="mb-6 flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold text-green_color mb-2">
            Find Us on the Map
          </h2>
          <div className="w-20 h-1 bg-primary_color rounded-full"></div>
        </div>

        {/* Stylized Border Radius Layout for Map */}
        <div className="w-full h-112.5 bg-white p-3 rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden group">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
            {/* Map Overlay to prevent pointer events until hovered (optional, good for scrolling) */}
            <div className="absolute inset-0 bg-green_color/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>

            <iframe
              title="Crunches Khakhra Factory Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1834.9384444516165!2d72.47392082291982!3d23.1016021301486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9d832786bbcb%3A0x65993a6640677ae2!2sCrunches%20Khakhra%20%E2%80%93%20Shiv%20Enterprise!5e0!3m2!1sen!2sin!4v1791538329072!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover filter contrast-[1.05] grayscale-[10%]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactpage;
