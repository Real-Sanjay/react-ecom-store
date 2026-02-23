import React from "react";
import HeroSection from "./HeroSection";
import Iphone from "../../assets/iphone-14-pro.webp";
import Mac from "../../assets/mac-system-cut.jfif";
import FeaturedProduct from "./FeaturedProduct";

const Home = () => {
  return (
    <>
      {" "}
      <HeroSection
        title={"Buy iPhone 14pro"}
        desc={"One of the best phone in the market is available to buy"}
        img={Iphone}
        link={"http://localhost:5173/products/6976417d7c511dfec7ebf326"}
      />
      <FeaturedProduct />
      <HeroSection
        title={"Buy Macbook pro"}
        desc={"One of the best laptop in the market is available to buy"}
        img={Mac}
        link={"http://localhost:5173/products/6976417d7c511dfec7ebf32e"}
      />
    </>
  );
};

export default Home;
