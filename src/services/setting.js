import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";

export const detailSetting = (id) =>
  request("get", `${API}/${endpoints.setting.detail}/${id}`);

export const getLogoHeader = (id) =>
  request("get", `${API}/${endpoints.logoHeader.getDetail}/${id}`);
