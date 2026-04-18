import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const features = [
  {
    id: 1,
    title: "Fresh & Premium Ingredients",
    desc: "Carefully selected wheat and natural spices create our crispy khakhra with pure homemade taste.",
    image: "/img/special-img/Black (1).svg",
  },
  {
    id: 2,
    title: "Handmade Traditional Recipe",
    desc: "Our khakhra is prepared using traditional Gujarati techniques that preserve the authentic flavor and crispiness in every bite.",
    image: "/img/special-img/Black (2).svg",
  },
  {
    id: 3,
    title: "Healthy & Light Snack",
    desc: "Low oil, high fiber, and perfectly roasted — our khakhra is a healthy snack option for breakfast or evening tea.",
    image: "/img/special-img/Black (3).svg",
  },
  {
    id: 4,
    title: "Freshly Roasted for Maximum Crunch",
    desc: "Every batch is freshly roasted to maintain its signature crisp texture and delicious taste that keeps you coming back for more.",
    image: "/img/special-img/Black (4).svg",
  },
];

const OurKhakhraSpecial = () => {
  return (
    <section className="py-20 bg-[#F2F2F6CC] relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-[45%] pointer-events-none z-0 hidden sm:block">
        <Image
          src="/img/Background.png" /* <-- Yahan apni right wali background image ka path daal dein */
          alt="Background Pattern"
          fill
          className="object-contain object-right"
          quality={80}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 md:gap-0 gap-12 items-center relative z-10">
        {/* Image */}
        <div className="relative group">
          <Image
            src="/img/Brochure_2026.png"
            alt="Khakhra Platter"
            width={600}
            height={600}
            className="relative z-10 rounded-3xl hover:rotate-6 hover:scale-110 transition duration-700"
          />
        </div>

        {/* Content */}
        <div className="px-7">
          <h2
            className={`${playfair.className} text-3xl md:text-3xl font-bold text-gray-800 mb-8`}
          >
            What Makes Our Khakhra{" "}
            <span className="text-primary_red">Special?</span>
          </h2>

          <div className="space-y-6 px-6">
            {features.map((item) => (
              <div key={item.id} className="flex items-start">
                {/* Icon */}
                {/* <div className="shrink-0 mt-1 bg-orange-100 w-12 h-12 flex items-center justify-center rounded-full hover:bg-primary_color transition"> */}
                  
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />

                {/* </div> */}

                {/* Text */}
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-primary_red">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurKhakhraSpecial;
