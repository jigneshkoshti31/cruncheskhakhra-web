"use client";
import CommonBannerPage from "@/components/global/CommonBanner";
import IngredientSection from "@/components/Home/IngredientSection";
import OurKhakhraSpecial from "@/components/Home/OurKhakhraSpecial";
import OurStory from "@/components/Home/OurStory";
import SocialMedia from "@/components/Home/SocialMedia";
import React from "react";

const Aboutpage = () => {
  return (
    <div>
      <CommonBannerPage image="/img/our_story_Section_bg.png" title="About Us" decs="Browse our collection of fresh, crispy khakhra" />
      <IngredientSection/>
      <OurStory/>
      <OurKhakhraSpecial/>
      <SocialMedia/>
    </div>
  );
};

export default Aboutpage;
