"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Yahan maine har image ke saath 'link' add kar diya hai
const columns = [
  {
    id: 1,
    width: "w-[480px]",
    layout: [
      { 
        type: "single", 
        height: "h-[250px]", 
        img: "/img/social-img/14.jpg",
        link: "https://www.instagram.com/cruncheskhakhra/"
      },
      {
        type: "double",
        height: "h-[250px]",
        // Double image ke liye array of objects banaya hai jisme link aur img dono hain
        items: [
          { img: "/img/social-img/17.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
          { img: "/img/social-img/19.jpg", link: "https://www.instagram.com/cruncheskhakhra/" }
        ],
      },
    ],
  },
  {
    id: 2,
    width: "w-[240px]",
    layout: [
      { type: "single", height: "h-[180px]", img: "/img/social-img/22.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
      {
        type: "single",
        height: "h-[320px]",
        img: "/img/social-img/25.jpg.jpeg",
        link: "https://www.instagram.com/cruncheskhakhra/"
      },
    ],
  },
  {
    id: 3,
    width: "w-[240px]",
    layout: [
      { type: "single", height: "h-[280px]", img: "/img/social-img/26.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
      { type: "single", height: "h-[220px]", img: "/img/social-img/8.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
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
        link: "https://www.instagram.com/cruncheskhakhra/"
      },
      {
        type: "double",
        height: "h-[250px]",
        items: [
          { img: "/img/social-img/DPP01146.JPG", link: "https://www.instagram.com/cruncheskhakhra/" },
          { img: "/img/social-img/DPP01199.JPG", link: "https://www.instagram.com/cruncheskhakhra/" }
        ],
      },
    ],
  },
  {
    id: 5,
    width: "w-[240px]",
    layout: [
      { type: "single", height: "h-[180px]", img: "/img/social-img/22.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
      {
        type: "single",
        height: "h-[320px]",
        img: "/img/social-img/25.jpg.jpeg",
        link: "https://www.instagram.com/cruncheskhakhra/"
      },
    ],
  },
  {
    id: 6,
    width: "w-[240px]",
    layout: [
      { type: "single", height: "h-[280px]", img: "/img/social-img/26.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
      { type: "single", height: "h-[220px]", img: "/img/social-img/8.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
    ],
  },
  {
    id: 7,
    width: "w-[240px]",
    layout: [
      { type: "single", height: "h-[280px]", img: "/img/social-img/8.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
      { type: "single", height: "h-[220px]", img: "/img/social-img/26.jpg", link: "https://www.instagram.com/cruncheskhakhra/" },
    ],
  },
];

const SocialMedia = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <a 
          href="https://www.instagram.com/cruncheskhakhra/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 bg-[#c0182c] text-white rounded-full mb-4 shadow-lg hover:scale-110 transition-transform cursor-pointer"
        >
          <i className="fa-brands fa-instagram text-2xl"></i>
        </a>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-wide">
          Follow <a href="https://www.instagram.com/cruncheskhakhra/" target="_blank" rel="noopener noreferrer" className="text-[#c0182c] hover:underline cursor-pointer">@Cruncheskhakhra</a>
        </h2>

        <p className="text-gray-600 font-medium">
          Discover Crispy Khakhra Moments Shared By Our Community.
        </p>
      </div>
      <Marquee
        speed={40}
        pauseOnHover={true}
        gradient={false}
        className="w-full gap-4"
      >
        <div className="flex gap-4">
          {columns.map((col) => (
            <div key={col.id} className={`flex flex-col gap-4 ${col.width}`}>
              
              {col.layout.map((item, index) =>
                item.type === "single" ? (
                  // Yahan maine a tag use kiya hai
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    className={`block ${item.height} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition relative group cursor-pointer`}
                  >
                    <Image
                      src={item.img}
                      alt="Instagram post"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    {/* Hover karne par chota sa instagram icon dikhega (Optional, premium look ke liye) */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <i className="fa-brands fa-instagram text-white text-3xl"></i>
                    </div>
                  </a>
                ) : (
                  <div key={index} className={`flex gap-4 ${item.height}`}>
                    {item.items.map((subItem, i) => (
                      <a
                        href={subItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={i}
                        className="block w-1/2 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition relative group cursor-pointer"
                      >
                        <Image
                          src={subItem.img}
                          alt="Instagram post"
                          width={500}
                          height={500}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <i className="fa-brands fa-instagram text-white text-3xl"></i>
                        </div>
                      </a>
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