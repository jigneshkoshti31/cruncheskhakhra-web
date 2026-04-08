import Image from "next/image";
import React from "react";
// import Picture from "../ui/picture";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const CommonBannerPage = ({ title, image, decs }) => {
  return (
    // <div className="relative md:h-80 h-60">
    //   <Picture
    //     // src={dynamicImage ? BaseUrl.concat(dynamicImage) : image}
    //     src={image}
    //     alt={title}
    //     width={1900}
    //     // height={400}
    //     className="object-cover h-full w-full"
    //   />
    //   <h1 className="absolute text-2xl font-bold text-center text-white uppercase -translate-x-1/2 -translate-y-1/2 md:text-4xl top-1/2 left-1/2">
    //     {title}
    //   </h1>
    // </div>
    <div className="relative md:h-80 h-60">
      <Image
        src={image}
        //   src="/img/our_story_Section_bg.png"
        alt={title}
        width={1900}
        height={200}
        className="object-cover h-full w-full"
      />
      <div className= "absolute w-full flex flex-col justify-center items-center  -translate-x-1/2 -translate-y-1/2 md:text-4xl top-1/2 left-1/2">
        <h1 className="text-3xl font-bold tracking-wide text-center text-white pb-4 uppercase" >{title}</h1>
        <p className="text-lg text-center text-white">{decs}</p>
      </div>
      {/* <h1 className="absolute text-xl font-bold text-center text-white uppercase -translate-x-1/2 -translate-y-1/2 md:text-4xl top-2/3 left-1/2">
        {decs}
      </h1> */}
    </div>
  );
};

export default CommonBannerPage;
