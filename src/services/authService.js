import { saveItem } from "../util/StorageUtil";
import { apiClient } from "./../utils/api-client";

export const registerUser = async (formData) => {
  const res = await apiClient.post("/user/signup", formData);

  if (!res.status) {
    throw res;
  }
  const {token} = res.data;
  saveItem("token", token);
  return res;
};

export const authenticateUser = async (formData) => {
  const res = await apiClient.post("/user/login", formData);
  if (!res.status) {
    throw res;
  }
  const {token} = res.data;
  saveItem("token", token);
  return res;
};

