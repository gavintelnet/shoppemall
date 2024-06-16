import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";

export const getListUserAll = () =>
    request("get", `${API}/${endpoints.user.all}`);