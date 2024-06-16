export const API = import.meta.env.VITE_API_BASE_URL;

export const SOCKET_URL = import.meta.env.VITE_API_BASE_SOCKET;

export const endpoints = {
  auth: {
    login: `login`,
    register: `register`,
  },
  product: {
    list: `products/all`,
    create: `products`,
    delete: `product`,
    getDetail: `product`,
  },
  user: {
    all: `admin/users`,
    detail: `me`,
    // update: `user/update`,
    updatePassword: `password/update`,
    update: `me/update`,
  },
  agency: {
    get: `agency/homeAgent`,
    getNotSuccess: `agency/orders`,
    updatePrice: `agency/product/update`,
    createOrder: `agency/order/create`,
    getListOrder: `agency/order/all`,
    changeStatus: `agency/order/status`,
    getSuccess: `agency/order/success`,
  },
  banner: {
    all: `banners`,
    bannerFooter: `logo/footer`,
    logoHeader: `admin/logo/header`

  },
  wallet: {
    withdraw: `customer/wallet/withdraw-money`,
    deposit: `customer/wallet/deposit-money`,
    getWithdrawHistoryByCustomer: `user/wallet/withdraw-history`,
    getDepositHistoryByCustomer: `user/wallet/deposit-history`,
  },
  bank: {
    bankByUser: `bank-account/getAllByUser`,
    bankDefault: `bank-account/getBankDefault`,
    createBankAccount:`admin/bank-account/create`
  },
  address: {
    createAddress: "user/address",
    updateAddress: "user/address",
    getAllAddresses: "user/address",
    setDefaultAddress: "user/address/default",
  },
  order: {
    createOrder: `user/order/create`,
    getAllOrdersByCustomer: `user/orders`,
    getOrderDetails: `user/orders`,
    updateOrderStatus: `user/order`,
  },
  chat: {
    createChat: "chat/create",
    addMessage: "chat/message",
    getUserChat: "chat/user",
    findUserInChat: "chat/search",
    getMessageUserChat: "chat",
    createMessage: `chat/createMessage`,
  },
  logoHeader: {
    getDetail: `admin/logo/header`,
  },
  setting: {
    detail: `config/website`,
  },
};
