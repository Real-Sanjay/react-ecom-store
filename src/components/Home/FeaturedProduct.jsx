import React from "react";
import "./FeaturedProduct.css";
import ProductCard from "../ProductsPage/ProductCard";
import useData from "./../../hooks/useData";
import ProductCardSkeleton from "./../Shared/ProductCardSkeleton";
import { motion } from "motion/react";

const FeaturedProduct = () => {
  const { data, error, isLoading } = useData(
    "/products/featured",
    "featuredProducts",
  );
  const skeletons = [1, 2, 3];

  return (
    <div className="align-items featured_products">
      <motion.h2
        className="featured_products_title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInout" }}
      >
        Featured Products
      </motion.h2>
      <div className="align-items product_cards">
        {error && <em className="form_error">{error}</em>}
        {data &&
          data?.map((product, i) => (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInout", delay: i * 0.25 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <ProductCard product={product} key={product?._id} />
            </motion.div>
          ))}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
    </div>
  );
};

export default FeaturedProduct;
