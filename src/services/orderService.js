import { apiClient } from "../utils/api-client";


export const checkoutCart = () => {
    return apiClient.post("/order/checkout");
}

export const getOrders = () => {
    return apiClient.get("/order");
}