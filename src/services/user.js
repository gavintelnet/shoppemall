import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";
export const getUserDetail = () =>
  request("get", `${API}/${endpoints.user.detail}`);

export const updateUser = (body) =>
  request("put", `${API}/${endpoints.user.update}`, body);
export const updatePassword = (body) =>
    request("put", `${API}/${endpoints.user.updatePassword}`, body);
