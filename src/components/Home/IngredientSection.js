import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

// ✅ Dynamic Data
const leftItems = [
  {
    id: 1,
    title: "Fresh Fenugreek (Methi)",
    desc: "Fresh fenugreek leaves add a unique aroma and a healthy touch to our methi khakhra.",
    icon: "fa-leaf",
  },
  {
    id: 2,
    title: "Traditional Masala Blend",
    desc: "A special mix of handpicked spices that brings bold and authentic Gujarati flavor.",
    icon: "fa-mortar-pestle",
  },
  {
    id: 3,
    title: "Low Oil Roasting",
    desc: "Slow roasted with minimal oil to keep the khakhra light, crispy, and healthy.",
    icon: "fa-fire-burner",
  },
];

const rightItems = [
  {
    id: 1,
    title: "Premium Wheat Flour",
    desc: "Made from selected wheat to give our khakhra its signature crispiness & wholesome texture.",
    icon: "fa-wheat-awn",
  },
  {
    id: 2,
    title: "Natural Spices",
    desc: "Authentic Indian spices blended perfectly to create rich aroma and flavorful taste in every bite.",
    icon: "fa-seedling",
  },
  {
    id: 3,
    title: "Rock Salt",
    desc: "Natural salt that enhances the taste while keeping the flavor balanced and delicious.",
    icon: "fa-cubes",
  },
];

// ✅ Clean Reusable Component
const FeatureItem = ({ item, reverse = false }) => {
  return (
    <div
      className={`group flex items-start gap-4 cursor-pointer ${
        reverse ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      {/* Icon */}
      <div className="bg-gray-50 w-14 h-14 flex items-center justify-center rounded-full text-gray-700 group-hover:scale-110 group-hover:bg-red-50 group-hover:text-red-600 transition duration-300 shrink-0 shadow-sm">
        <i className={`fa-solid ${item.icon} text-2xl`}></i>
      </div>

      {/* Text */}
      <div>
        <h4 className="font-bold text-xl text-red-600 group-hover:text-red-500 transition duration-300">
          {item.title}
        </h4>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
};

const IngredientSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden font-sans">
      {/* Background Images */}
      <Image
        src="/img/spoon.png"
        alt="Spices"
        width={400}
        height={400}
        className="absolute -top-10 -right-36 w-48 md:w-96 opacity-90 hover:scale-110 hover:-rotate-3 transition duration-700 z-0"
      />

      <Image
        src="/img/mirchi.png"
        alt="Chilies"
        width={400}
        height={400}
        className="absolute -bottom-10 -left-44 w-40 md:w-96 opacity-90 hover:scale-110 hover:rotate-6 transition duration-700 z-0"
      />

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        {/* Heading */}
        <h2
          className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-900 mb-3`}
        >
          Made With Pure & Natural{" "}
          <span className="text-red-600">Ingredients</span>
        </h2>

        <p className="text-gray-600 mb-16 text-lg max-w-2xl mx-auto">
          Carefully Selected Grains And Authentic Spices Create Our Crispy,
          Healthy Khakhra.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-12">
            {leftItems.map((item) => (
              <FeatureItem key={item.id} item={item} reverse={true} />
            ))}
          </div>

          {/* CENTER IMAGE */}
          <div className="flex justify-center items-center">
            <Image
              src="/img/bb.png"
              alt="Ingredients"
              width={400}
              height={400}
              className="relative z-10 hover:rotate-6 hover:scale-125 transition duration-1000"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-12">
            {rightItems.map((item) => (
              <FeatureItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientSection;
