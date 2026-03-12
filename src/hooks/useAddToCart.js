import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../utils/api-client";



const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, quantity }) => apiClient.post(`/cart/${id}`, {quantity}),
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"])
        }
    })

}

export default useAddToCart;