// import Image from "next/image";
// import { Playfair_Display } from "next/font/google";

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["600", "700"],
// });

// const OurPopularSection = () => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-16">
//           <h2
//             className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-800 mb-2`}
//           >
//             Our Popular Khakhra{" "}
//             <span className="text-primary_color">Flavours</span>
//           </h2>
//           <p className="text-gray-500">
//             Taste the Tradition with our Bestselling Snacks
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Card 1 */}
//           <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-2xl transition duration-300 group relative">
//             <div className="overflow-hidden rounded-xl bg-gray-100 mb-4 aspect-square">
//               <Image
//                 src="/img/achari.jpeg"
//                 alt="Achari Khakhra"
//                 width={400}
//                 height={400}
//                 className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//               />
//             </div>

//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary_color transition">
//                   Achari Khakhra (Jain)
//                 </h3>

//                 <div className="text-yellow-400 text-sm my-1">
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star-half-stroke"></i>
//                 </div>

//                 <div className="mt-2 flex items-center gap-2">
//                   <span className="text-xl font-bold text-primary_color">
//                     ₹120.00
//                   </span>
//                   <span className="text-sm text-gray-400 line-through">
//                     ₹150.00
//                   </span>
//                 </div>
//               </div>

//               <button className="bg-orange-100 text-primary_color text-xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-primary_color hover:text-white transition transform hover:-translate-y-1">
//                 <i className="fa-solid fa-cart-plus"></i>
//               </button>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-2xl transition duration-300 group relative">
//             <div className="absolute top-6 right-6 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
//               Bestseller
//             </div>

//             <div className="overflow-hidden rounded-xl bg-gray-100 mb-4 aspect-square">
//               <Image
//                 src="/img/periperi.jpg"
//                 alt="Peri Peri Khakhra"
//                 width={400}
//                 height={400}
//                 className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//               />
//             </div>

//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary_color transition">
//                   Peri Peri Khakhra (Jain)
//                 </h3>

//                 <div className="text-yellow-400 text-sm my-1">
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                 </div>

//                 <div className="mt-2 flex items-center gap-2">
//                   <span className="text-xl font-bold text-primary_color">
//                     ₹130.00
//                   </span>
//                 </div>
//               </div>

//               <button className="bg-orange-100 text-primary_color text-xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-primary_color hover:text-white transition transform hover:-translate-y-1">
//                 <i className="fa-solid fa-cart-plus"></i>
//               </button>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-2xl transition duration-300 group relative">
//             <div className="overflow-hidden rounded-xl bg-gray-100 mb-4 aspect-square">
//               <Image
//                 src="/img/Methi.JPG"
//                 alt="Manchurian Khakhra"
//                 width={400}
//                 height={400}
//                 className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//               />
//             </div>

//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary_color transition">
//                   Manchurian Khakhra
//                 </h3>

//                 <div className="text-yellow-400 text-sm my-1">
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-regular fa-star"></i>
//                 </div>

//                 <div className="mt-2 flex items-center gap-2">
//                   <span className="text-xl font-bold text-primary_color">
//                     ₹125.00
//                   </span>
//                 </div>
//               </div>

//               <button className="bg-orange-100 text-primary_color text-xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-primary_color hover:text-white transition transform hover:-translate-y-1">
//                 <i className="fa-solid fa-cart-plus"></i>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Button */}
//         <div className="text-center mt-12">
//           <a
//             href="#"
//             className="inline-block border-2 border-primary_color text-primary_color font-semibold px-8 py-3 rounded-full hover:bg-primary_color hover:text-white transition duration-300"
//           >
//             View All Flavours
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurPopularSection;

import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const products = [
  {
    id: 1,
    name: "Achari Khakhra (Jain)",
    image: "/img/achari.jpeg",
    price: 120,
    oldPrice: 150,
    rating: 4.5,
    bestseller: false,
  },
  {
    id: 2,
    name: "Peri Peri Khakhra (Jain)",
    image: "/img/periperi.jpg",
    price: 130,
    oldPrice: null,
    rating: 5,
    bestseller: true,
  },
  {
    id: 3,
    name: "Manchurian Khakhra",
    image: "/img/Methi.JPG",
    price: 125,
    oldPrice: null,
    rating: 4,
    bestseller: true,
  },
];

const PopularKhakhraSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-800 mb-2`}
          >
            Our Popular Khakhra{" "}
            <span className="text-primary_color">Flavours</span>
          </h2>
          <p className="text-gray-500">
            Taste the Tradition with our Bestselling Snacks
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-2xl transition duration-300 group relative"
            >
              {/* Bestseller Tag */}
              {item.bestseller && (
                <div className="absolute top-6 right-6 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Bestseller
                </div>
              )}

              {/* Image */}
              <div className="overflow-hidden rounded-xl bg-gray-100 mb-4 aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary_color transition">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="text-yellow-400 text-sm my-1">
                    {"★".repeat(Math.floor(item.rating))}
                    {item.rating % 1 !== 0 && "☆"}
                  </div>

                  {/* Price */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xl font-bold text-primary_color">
                      ₹{item.price}
                    </span>

                    {item.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{item.oldPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Button */}
                <button className="bg-orange-100 text-primary_color text-xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-primary_color hover:text-white transition transform hover:-translate-y-1">
                  <i className="fa-solid fa-cart-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block border-2 border-primary_color text-primary_color font-semibold px-8 py-3 rounded-full hover:bg-primary_color hover:text-white transition duration-300"
          >
            View All Flavours
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularKhakhraSection;
