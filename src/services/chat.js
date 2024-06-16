import { API, endpoints } from "../constants/endpoint";
import { request } from "./request";

export const createChat = (body) =>
  request("post", `${API}/${endpoints.chat.createChat}`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const addMessageToChat = (body) =>
  request("post", `${API}/${endpoints.chat.addMessage}`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getUserChat = (userId) =>
  request("get", `${API}/${endpoints.chat.getUserChat}/${userId}`);

export const findUserInChat = (chatId, userId) =>
  request("get", `${API}/${endpoints.chat.findUserInChat}`, {
    params: { chatId, userId },
  });

export const createUserChat = (body) =>
  request("post", `${API}/${endpoints.chat.createChat}`, body);
export const getMessageUserChat = (idChat) =>
  request("get", `${API}/${endpoints.chat.getMessageUserChat}/${idChat}`);

export const createMessageUserChat = (body) =>
  request("post", `${API}/${endpoints.chat.createMessage}`, body);
