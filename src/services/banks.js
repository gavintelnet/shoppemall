import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";
export const getBankUser = (body) =>
  request("post", `${API}/${endpoints.bank.bankByUser}`, body);

export const getBankDefault = (body) =>
  request("post", `${API}/${endpoints.bank.bankDefault}`, body);
export const createBankAccount = (body) =>
  request("post", `${API}/${endpoints.bank.createBankAccount}`, body);
