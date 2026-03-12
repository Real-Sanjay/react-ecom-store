import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../utils/api-client";


const useData = (url, key) => {

    const fetchProduct = async() => {
        return await apiClient.get(url).then(res => res.data);
    }

    const { data, error, isLoading , refetch} = useQuery({
        queryKey: [key],
        queryFn: fetchProduct,
        staleTime: key === "categories" ? 24 * 60 * 60 * 1000 : 3000, // 24 hours for categories, 5 minutes for products
    })

    return { data, error, isLoading, refetch };
}

export default useData;