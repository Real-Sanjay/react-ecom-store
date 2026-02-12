import { useState, useEffect, useRef } from "react";
import { apiClient } from "../utils/api-client";

const useData = (url, params, deps) => {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true)

  // Remebers previous category untill it changed by diff category selection
  const prevCategoryRef = useRef(params?.params?.category);

  useEffect(() => {
    const currentCategory = params?.params?.category;
    const currentPage = params?.params?.page;

    if(prevCategoryRef.current !== currentCategory) {
        setData(null);
        prevCategoryRef.current = currentCategory; 
     }
      setisLoading(true);
      apiClient.get(url, params).then((res) => {
        
        if(url === '/products') { 
              const newProducts = res?.data?.products || [];
              
              if(newProducts.length === 0 || res?.data?.currentPage >= res?.data?.totalPages)  
              {
                setHasMore(false);
              }
              if(currentPage > 1 && data === null){
                  const reHydrate = async() => {
                      let allProducts = []; // To Hold all the products fetched 
                      let lastRes; // to store latest  data from products
                      setisLoading(true);
                      try{
                        for(let i = 1; i <= currentPage; i ++) {
                          const res = await apiClient.get(url,{ ...params, params: {...params.params, page: i}});
                          allProducts = [...allProducts, ...res.data?.products];
                          lastRes = res;
                        }

                        setData({...lastRes.data, products:[ ...allProducts]});
                        setisLoading(false);

                        if(lastRes.data.currentPage >= lastRes.data.totalPages) {
                          setHasMore(false);
                        }
                      } catch(error) {
                        setisLoading(false);
                        setHasMore(false);
                        setError(error);
                      }
                  }
                  reHydrate();
                  return;
              } else if( currentPage > 1 && data?.products ) {
                  setData((prev) => ({
                    ...res?.data,
                    products: [...prev.products, ...newProducts]
                  }))
              }else {
                setData(res?.data);
              }

            } else {
              setData(res?.data);
            }
            setisLoading(false);
      }).catch((error) => 
        {
          setError(error)
          setisLoading(false);
          setHasMore(false);
        })
  }, deps ? deps : [])
 return {data, hasMore, error, isLoading}
}

export default useData;



//  const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setisLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true)

  // one fucntion 
  // handle reload case
  // other flow for normal data fetching

  // useEffect(
  //   () => {
  //      setisLoading(true);
  //     apiClient
  //       .get(url, params)
  //       .then((res) => {
  //         if (
  //           url === "/products" &&
  //           data &&
  //           data?.products &&
  //           params.params.page !== 1
  //         ) {
  //           if(res?.data?.products?.length === 0) {
  //             setHasMore(false);
  //             setisLoading(false);
  //             return; 
  //           }

  //           setData((prev) => ({
  //             ...prev,
  //             products: [...prev.products, ...res?.data?.products],
  //           }));
  //           setisLoading(false);
  //         } else {
  //           setData(res?.data);
  //         }
  //         setisLoading(false);
  //       })
  //       .catch((error) => {
  //         setError(error);
  //         setisLoading(false);
  //         setHasMore(false);
  //       });
  //   },
  //   deps ? deps : [],
  // );
  // return { data, error, isLoading, hasMore };