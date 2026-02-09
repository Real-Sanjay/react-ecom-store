import React, { useEffect, useRef, useCallback } from "react";
import "./ProductsPageList.css";
import ProductCard from "./ProductCard";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardSkeleton from "../Shared/ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import useData from "../../hooks/useData";

const ProductsPageList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page")) || 1;

  const { data, error, isLoading, hasMore } = useData(
    "/products",
    { params: { category, page, perPage: 10 } },
    [category, page]
  );

  console.log("data", data)

  // Initialize page param if missing
  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        page: 1,
      }));
    }
  }, [searchParams, setSearchParams]);

  // Scroll handler with useCallback to maintain reference
  const handleScroll = useCallback(() => {
    // Don't fetch if already loading or no more data
    if (isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Trigger when user is 200px from bottom
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        page: page + 1,
      }));
    }
  }, [isLoading, hasMore, page, setSearchParams]);

  // Debounce helper
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [handleScroll]);

  return (
    <section className="product_page_list">
      <header className="align-items product_list_header">
        <h2>Products</h2>
        <select name="" id="" className="sort">
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
        
        {data?.products?.map((product) => (
          <ProductCard
            images={product.images}
            price={product.price}
            reviews={product.reviews}
            stock={product.stock}
            title={product.title}
            key={product._id}
          />
        ))}

        {/* Show loading skeletons when fetching MORE data */}
        {isLoading &&
          Array.from({ length: page === 1 ? 10 : 4 }).map((_, i) => (
            <ProductCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {hasMore && !isLoading && (
        <div
          ref={loadMoreRef}
          style={{
            height: '20px',
            margin: '20px 0',
            background: 'rgba(255, 0, 0, 0.1)',
            border: '1px dashed red',
            textAlign: 'center',
            fontSize: '12px',
            color: 'red'
          }}
        >
          Load More Trigger
        </div>
      )}

      {/* End message */}
      {!hasMore && data?.products?.length > 0 && (
        <p style={{ color: "#000", textAlign: "center", padding: "20px" }}>
          You've reached the end 🎉
        </p>
      )}

      {/* No products found */}
      {!isLoading && data?.products?.length === 0 && (
        <p style={{ textAlign: "center", padding: "20px" }}>
          No products found
        </p>
      )}
    </section>
  );
};

export default ProductsPageList;