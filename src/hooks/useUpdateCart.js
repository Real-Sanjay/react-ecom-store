import { apiClient } from "../utils/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUpdateCart = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: ({action, id}) => apiClient.patch(`/cart/${action}/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["cart"])
})
}

export default useUpdateCart