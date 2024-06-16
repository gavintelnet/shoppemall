import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";
export const getAllAddresses = (userId) =>
  request("get", `${API}/${endpoints.address.getAllAddresses}/${userId}`);
export const createAddress = (body) =>
  request("post", `${API}/${endpoints.address.createAddress}`, body);
export const updateAddress = (addressId, body) =>
    request("put", `${API}/${endpoints.address.updateAddress}/${addressId}`, body);
export const  setDefaultAddress= (addressId, body) =>
    request("put", `${API}/${endpoints.address.setDefaultAddress}/${addressId}`, body);
  