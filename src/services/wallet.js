import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";

export const depositMoney = (body) =>
  request("post", `${API}/${endpoints.wallet.deposit}`, body);
export const withdrawMoney = (body) =>
  request("post", `${API}/${endpoints.wallet.withdraw}`, body);
export const getWithdrawHistoryByCustomer = (customerId) =>
  request(
    "get",
    `${API}/${endpoints.wallet.getWithdrawHistoryByCustomer}/${customerId}`
  );
export const getDepositHistoryByCustomer = (customerId) =>
  request(
    "get",
    `${API}/${endpoints.wallet.getDepositHistoryByCustomer}/${customerId}`
  );
export const getWithdrawHistorySuccess = (customerId) =>
  request(
    "get",
    `${API}/${endpoints.wallet.getWithdrawHistoryByCustomer}/${customerId}`,
    { status: "Hoàn thành" }
  );
export const getDepositHistorySuccess = (customerId) =>
  request(
    "get",
    `${API}/${endpoints.wallet.getDepositHistoryByCustomer}/${customerId}`,
    { status: "Hoàn thành" }
  );
