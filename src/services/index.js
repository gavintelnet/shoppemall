import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";
export const createOrder = (body) =>
    request("post", `${API}/${endpoints.order.createOrder}`, body);
export const updateOrderStatus = (orderId,body) =>
    request("put", `${API}/${endpoints.order.updateOrderStatus}/${orderId}`, body);
export const getAllOrdersByCustomer = (body) =>
    request("post", `${API}/${endpoints.order.getAllOrdersByCustomer}`,body);
export const getOrderDetails = (orderId) =>
    request("get", `${API}/${endpoints.order.getOrderDetails}/${orderId}`);