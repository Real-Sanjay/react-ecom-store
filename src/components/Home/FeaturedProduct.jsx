import React from "react";
import "./FeaturedProduct.css";
import ProductCard from "./ProductCard";

const FeaturedProduct = () => {
  return (
    <div className="align-items featured_products">
      <h2 className="featured_products_title">Featured Products</h2>
      <div className="align-items product_cards">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default FeaturedProduct;
