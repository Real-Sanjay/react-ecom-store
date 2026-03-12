import { apiClient } from "../utils/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const useDeleteCart = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => apiClient.patch(`/cart/remove/${id}`),
        onSuccess: () => queryClient.invalidateQueries(["cart"]),
    })
}

export default useDeleteCart