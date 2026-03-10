import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../utils/api-client";
import { useEffect } from "react";

const useInfiniteProducts = ({
  category,
  searchQuery,
  perPage = 10
}) => {

  const fetchProducts = async ({ pageParam = 1 }) => {
    const res = await apiClient.get("/products", {
      params: {
        category,
        search: searchQuery,
        perPage,
        page: pageParam
      }
    });

    return res.data;
  };

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ["products", { category, searchQuery }],
    queryFn: fetchProducts,
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    }
  });

  // hydration logic for refresh
  // useEffect(() => {
  //   const hydrate = async () => {
  //     if (!data) return;

  //     const loadedPages = data.pages.length;

  //     if (page > loadedPages) {
  //       for (let i = loadedPages; i < page; i++) {
  //         await fetchNextPage();
  //       }
  //     }
  //   };

  //   hydrate();
  // }, [page]);

  const products =
    data?.pages?.flatMap(p => p.products) || [];

  return {
    products,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage
  };
};

export default useInfiniteProducts;