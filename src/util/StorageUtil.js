import { apiClient } from "../utils/api-client";

export const saveItem = (key, value) => {
    localStorage.setItem(key, value);
}

export const getItem = (key) => {
    return localStorage.getItem(key);
}

export const removeItem = (key) => {
    localStorage.removeItem(key);
}

export const setAuthToken = (token) => {
    apiClient.defaults.headers.common['x-auth-token'] = token;
}

export const removeAuthToken = () => {
    delete apiClient.defaults.headers.common['x-auth-token'];
}