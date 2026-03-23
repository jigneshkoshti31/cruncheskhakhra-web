"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const columns = [
  {
    id: 1,
    width: "w-[480px]",
    layout: [
      { type: "single", height: "h-[250px]", img: "/img/social-img/14.jpg" },
      {
        type: "double",
        height: "h-[250px]",
        imgs: ["/img/social-img/17.jpg", "/img/social-img/19.jpg"],
      },
    ],
  },
  {
    id: 2,
    width: "w-[240px]",
    layout: [
      { type: "single", height: "h-[180px]", img: "/img/social-img/22.jpg" },
      {
        type: "single",
        height: "h-[320px]",
        img: "/img/social-img/25.jpg.jpeg",
      },
    ],
  },
  {
    id: 3,
    width: "w-[240px]",
    layout: [
      { type: "single", height: "h-[280px]", img: "/img/social-img/26.jpg" },
      { type: "single", height: "h-[220px]", img: "/img/social-img/8.jpg" },
    ],
  },
  {
    id: 4,
    width: "w-[480px]",
    layout: [
      {
        type: "single",
        height: "h-[250px]",
        img: "/img/social-img/DPP01130.JPG",
      },
      {
        type: "double",
        height: "h-[250px]",
        imgs: ["/img/social-img/DPP01146.JPG", "/img/social-img/DPP01199.JPG"],
      },
    ],
  },
];

const SocialMedia = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#c0182c] text-white rounded-full mb-4 shadow-lg">
          <i className="fa-brands fa-instagram text-2xl"></i>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-wide">
          Follow <span className="text-[#c0182c]">@Cruncheskhakhra</span>
        </h2>

        <p className="text-gray-600 font-medium">
          Discover Crispy Khakhra Moments Shared By Our Community.
        </p>
      </div>
      <Marquee
        speed={40}
        pauseOnHover={true}
        gradient={false}
        className="w-full"
      >
        <div className="flex gap-4">
          {columns.map((col) => (
            <div key={col.id} className={`flex flex-col gap-4 ${col.width}`}>
              
              {col.layout.map((item, index) =>
                item.type === "single" ? (
                  <div
                    key={index}
                    className={`${item.height} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition`}
                  >
                    <Image
                      src={item.img}
                      alt="social"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover hover:scale-110 transition duration-500"
                    />
                  </div>
                ) : (
                  <div key={index} className={`flex gap-4 ${item.height}`}>
                    {item.imgs.map((img, i) => (
                      <div
                        key={i}
                        className="w-1/2 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                      >
                        <Image
                          src={img}
                          alt="social"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover hover:scale-110 transition duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )
              )}

            </div>
          ))}
        </div>
      </Marquee>

    </section>
  );
};

export default SocialMedia;