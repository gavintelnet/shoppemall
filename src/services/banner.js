import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";

export const getBanner = () => request("get", `${API}/${endpoints.banner.all}`);
export const getBannerFooter = () => request("get", `${API}/${endpoints.banner.bannerFooter}/665701da76b8c058a19a4780`);
export const getLogoHeader = () => request("get", `${API}/${endpoints.banner.logoHeader}/665701da76b8c058a19a4780`);


