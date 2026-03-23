import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});


const OurStory = () => {
  return (
    <section className="relative py-24 bg-fixed bg-center bg-cover bg-no-repeat" style={{backgroundImage: "url('/img/our_story_Section_bg.png')"}}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-left text-white">
        
        <span className="text-primary_light font-medium tracking-widest uppercase text-2xl mb-2 block">
          Our Story
        </span>

        <h2 className={`${playfair.className} text-2xl md:text-4xl font-bold mb-6`}>
          From a Gujarati Kitchen to Your Table
        </h2>

        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          Crunches Khakhra was born from a simple love for the traditional
          Gujarati snack that has been a staple in homes across Gujarat for
          generations. What started in our family kitchen in Ahmedabad has grown
          into a mission to share authentic khakhra with people across India.
        </p>

        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          Every khakhra we make is hand-rolled and roasted on a traditional
          tawa, using recipes passed down through three generations. We use only
          the finest whole wheat flour, cold-pressed oils, and natural spices —
          no preservatives, no artificial colors, no shortcuts.
        </p>

        <p className="text-gray-300 leading-relaxed text-lg">
          Our commitment is simple: deliver the same crispy, fresh, and
          wholesome khakhra that you&apos;d get from a loving Gujarati home, right to
          your doorstep.
        </p>

      </div>
    </section>
  );
};

export default OurStory;
