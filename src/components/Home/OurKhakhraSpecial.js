import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const features = [
  {
    id: 1,
    title: "100% Premium Ingredients",
    desc: "We strictly source the finest wheat and spices to ensure consistent top quality.",
    icon: "fa-check",
  },
  {
    id: 2,
    title: "Authentic Traditional Recipe",
    desc: "Carefully hand-roasted over precise temperatures to get that perfect crunch.",
    icon: "fa-fire-burner",
  },
  {
    id: 3,
    title: "Low Fat & Light Snack",
    desc: "A completely guilt-free snack that you can enjoy anytime, anywhere without worries.",
    icon: "fa-leaf",
  },
  {
    id: 4,
    title: "Vacuum Sealed for Freshness",
    desc: "Our advanced packaging locks in the aroma and crispiness, delivering it fresh to you.",
    icon: "fa-box-open",
  },
];

const OurKhakhraSpecial = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <div className="relative group">
          <Image
            src="/img/Brochure_2026.png"
            alt="Khakhra Platter"
            width={500}
            height={500}
            className="relative z-10 rounded-3xl hover:rotate-6 hover:scale-110 transition duration-700"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-gray-800 mb-8`}>
            What Makes Our Khakhra <span className="text-primary_color">Special?</span>
          </h2>

          <div className="space-y-6">
            
            {features.map((item) => (
              <div key={item.id} className="flex items-start">
                
                {/* Icon */}
                <div className="shrink-0 mt-1 bg-orange-100 w-12 h-12 flex items-center justify-center rounded-full text-primary_color hover:bg-primary_color hover:text-white transition">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>

                {/* Text */}
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 mt-1">
                    {item.desc}
                  </p>
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
