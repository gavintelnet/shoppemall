import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";
export const loginUser = (body) =>
  request("post", `${API}/${endpoints.auth.login}`, body);

export const registerUser = (body) =>
  request("post", `${API}/${endpoints.auth.register}`, body);
