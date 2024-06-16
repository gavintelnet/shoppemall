import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";

// export const getAllCategory = () =>
//   request("get", `${API}/${endpoints.category.getAll}`);

// export const getAllBrands = () =>
//   request("get", `${API}/${endpoints.brand.getAll}`);
// export const getAllSizes = () =>
//   request("get", `${API}/${endpoints.size.getAll}`);

export const getAllProductsByBanner = (body) =>
  request("post", `${API}/${endpoints.product.list}`, body);
export const getDetailProduct = (id) =>
  request("get", `${API}/${endpoints.product.getDetail}/${id}`);
