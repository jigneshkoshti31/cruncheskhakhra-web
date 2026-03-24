import CommonBannerPage from "@/components/global/CommonBanner";
import ProductListing from "@/components/Product/ProductListing";
import React from "react";

const ShopKhakhra = () => {
  return (
    <div>
      <CommonBannerPage
        image="/img/our_story_Section_bg.png"
        title="Shop Khakhra"
        decs="Browse our collection of fresh, crispy khakhra"
      />
      <ProductListing/>
    </div>
  );
};

export default ShopKhakhra;
