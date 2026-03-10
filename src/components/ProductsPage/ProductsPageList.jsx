import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import "./ProductsPageList.css";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardSkeleton from "../Shared/ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useInfiniteProducts from "../../hooks/useInfiniteProducts";

const ProductsPageList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  // const page = parseInt(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search");
  const [sortBy, setsortBy] = useState("")
const {  products, error, isLoading, hasNextPage: hasMore, fetchNextPage } =
  useInfiniteProducts({
    category,
    searchQuery,
    perPage: 10,
  });

  console.log("products", products)

  // Initialize page param if missing
  // useEffect(() => {
  //   if (!searchParams.get("page")) {
  //     setSearchParams((prev) => ({
  //       ...Object.fromEntries(prev),
  //       page: 1,
  //     }));
  //   }
  // }, [searchQuery, category]);

const sortedProducts = useMemo(() => {
  if (!products) return [];

  const sortedData = [...products];

  switch (sortBy) {
    case "price desc":
      return sortedData.sort((a, b) => b.price - a.price);

    case "price asc":
      return sortedData.sort((a, b) => a.price - b.price);

    case "rate desc":
      return sortedData.sort((a, b) => b.reviews.rate - a.reviews.rate);

    case "rate asc":
      return sortedData.sort((a, b) => a.reviews.rate - b.reviews.rate);

    default:
      return sortedData;
  }
}, [products, sortBy]);


  // When user reaches end of the page increase page count to fetch more data
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    fetchNextPage();
  }, [isLoading, hasMore, fetchNextPage]);

  const loadMoreRef = useInfiniteScroll(loadMore, {
    threshold: 0.5,
    rootMargin: "100px",
    enabled: hasMore && !isLoading,
  });

  return (
    <section className="product_page_list">
      <header className="align-items product_list_header">
        <h2>Products</h2>
        <select name="" id="" className="sort" onChange={(e) => setsortBy(e.target.value)}>
          <option value="">Relevance</option>
          <option value="price desc">PRICE High to Low</option>
          <option value="price asc">PRICE Low to High</option>
          <option value="rate desc">RATE High to Low</option>
          <option value="rate asc">RATE Low to High</option>
        </select>
      </header>

      <div className="product_list">
        {error && (
          <p>There was an error loading the products: {error.message}</p>
        )}

        {sortedProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}

        {/* Show loading skeletons when fetching MORE data */}
        {isLoading &&
          Array.from({ length:  10  }).map((_, i) => (
            <ProductCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {!!products?.length && hasMore && !isLoading && (
        <div ref={loadMoreRef}></div>
      )}

      {/* End message */}
      {!hasMore && products?.length > 0 && (
        <p style={{ color: "#000", textAlign: "center", padding: "20px" }}>
          You've reached the end 🎉
        </p>
      )}

      {/* No products found */}
      {!isLoading && products?.length === 0 && (
        <p style={{ textAlign: "center", padding: "20px" }}>
          No products found
        </p>
      )}
    </section>
  );
};

export default ProductsPageList;
