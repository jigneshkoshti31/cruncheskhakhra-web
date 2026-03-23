"use client"
import Banner from "@/components/Home/Banner";
import IngredientSection from "@/components/Home/IngredientSection";
import OurKhakhraSpecial from "@/components/Home/OurKhakhraSpecial";
import OurPopularSection from "@/components/Home/OurPopularSection";
import OurStory from "@/components/Home/OurStory";
import SocialMedia from "@/components/Home/SocialMedia";
import React from "react";


export default function Home() {
  return (
    <>
      <Banner/>
      <IngredientSection/>
      <OurStory/>
      <OurPopularSection/>
      <OurKhakhraSpecial/>
      <SocialMedia/>
    </>
  );
}
