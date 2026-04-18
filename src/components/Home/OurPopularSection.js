"use client";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useCart } from "@/components/context/CartContext";
import toast, { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const products = [
  {
    id: 1,
    name: "Achari Khakhra (Jain)",
    des: "Classic & wholesome traditional khakhra",
    image: "/img/achari.jpeg",
    price: 120,
    oldPrice: 150,
    rating: 4.5,
    bestseller: false,
  },
  {
    id: 2,
    name: "Peri Peri Khakhra (Jain)",
    des: "Classic & wholesome traditional khakhra",
    image: "/img/periperi.jpg",
    price: 130,
    oldPrice: null,
    rating: 5,
    bestseller: true,
  },
  {
    id: 3,
    name: "Manchurian Khakhra",
    des: "Classic & wholesome traditional khakhra",
    image: "/img/Methi.JPG",
    price: 125,
    oldPrice: null,
    rating: 4,
    bestseller: true,
  },
  {
    id: 4,
    name: "Achari Khakhra (Jain)",
    des: "Classic & wholesome traditional khakhra",
    image: "/img/achari.jpeg",
    price: 120,
    oldPrice: 150,
    rating: 4.5,
    bestseller: false,
  },
  {
    id: 5,
    name: "Peri Peri Khakhra (Jain)",
    des: "Classic & wholesome traditional khakhra",
    image: "/img/periperi.jpg",
    price: 130,
    oldPrice: null,
    rating: 5,
    bestseller: true,
  },
  {
    id: 6,
    name: "Manchurian Khakhra",
    des: "Classic & wholesome traditional khakhra",
    image: "/img/Methi.JPG",
    price: 125,
    oldPrice: null,
    rating: 4,
    bestseller: true,
  },
];

const PopularKhakhraSection = () => {
  const { addToCart, cartItems } = useCart();
  const handleAddToCart = (item) => {
    // Check karein ki item pehle se cart mein hai ya nahi
    const isInCart = cartItems?.some((cartItem) => cartItem.id === item.id);

    if (isInCart) {
      toast.error(`${item.name} is already in your cart!`, {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    } else {
      // Cart context ke format ke hisab se product bhej rahe hain
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1, // List se hamesha 1 quantity add hogi
        variant: "Standard",
      });
      toast.success(`${item.name} added to cart!`, {
        icon: "🛒",
      });
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-800 mb-2`}
          >
            Our Popular Khakhra{" "}
            <span className="text-primary_red">Flavours</span>
          </h2>
          <p className="text-gray-500">
            Taste the Tradition with our Bestselling Snacks
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-3">
          {products.map((item) => {
            const isItemInCart = cartItems?.some(
              (cartItem) => cartItem.id === item.id,
            );
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl md:p-4 p-2 shadow-sm hover:shadow-2xl transition duration-300 group relative"
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
                  <div className="flex items-center w-full justify-between">
                    <h3 className="font-bold md:text-lg text-base text-gray-800 group-hover:text-primary_color transition">
                      {item.name}
                    </h3>
                    {/* Button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`${
                        isItemInCart
                          ? "bg-primary_color text-white"
                          : "bg-orange-100 text-primary_color"
                      } text-xl md:w-10 md:h-10 w-10 h-8 flex items-center justify-center rounded-full hover:bg-primary_color hover:text-white transition transform hover:-translate-y-1`}
                    >
                      {isItemInCart ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">{item.des}</p>

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
            );
          })}
        </div>

        {/* Button */}
        <div className="text-center mt-12">
          <Link
            href="/user/product"
            className="inline-block border-2 border-primary_color text-primary_color font-semibold px-8 py-3 rounded-full hover:bg-primary_color hover:text-white transition duration-300"
          >
            View All Flavours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularKhakhraSection;
