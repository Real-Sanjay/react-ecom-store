import React from "react";
import "./FeaturedProduct.css";
import ProductCard from "../ProductsPage/ProductCard";
import useData from "./../../hooks/useData";
import ProductCardSkeleton from './../Shared/ProductCardSkeleton';

const FeaturedProduct = () => {
  const { data, error, isLoading } = useData("/products/featured", "featuredProducts");
  const skeletons = [1, 2, 3];

  return (
    <div className="align-items featured_products">
      <h2 className="featured_products_title">Featured Products</h2>
      <div className="align-items product_cards">
        {error && <em className="form_error">{error}</em>}
        {data &&
          data?.map((product) => (
            <ProductCard product={product} key={product?._id}
            />
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
    </div>
  );
};

export default FeaturedProduct;
