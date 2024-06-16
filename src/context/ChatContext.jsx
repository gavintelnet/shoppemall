import { createContext, useCallback, useEffect, useState } from "react";
import audio from "../assets/sound-bet.mp3";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../constants/endpoint";
import {
  createMessageUserChat,
  createUserChat,
  getMessageUserChat,
  getUserChat,
} from "../services/chat";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [isChatId, setIsChatId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const notificationSound = new Audio(audio);

  useEffect(() => {
    if (user && user) {
      const newSocket = io(SOCKET_URL);
      setSocket(newSocket);

      newSocket.emit("addNewUser", { userId: user?._id, role: user?.role });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  ///add onlien
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null || !newMessage) return;
    const recipient = currentChat?.members?.find(
      (member) => member._id !== user?._id
    );
    const recipientId = recipient?._id;
    socket.emit("sendMessage", {
      ...newMessage,
      recipientId,
      role: user?.role,
    });
  }, [newMessage, currentChat, socket, user?._id, user?.role]);

  // receive message and notification

  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });
    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members?.some(
        (member) => member._id === res.senderId
      );

      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [res, ...prev]);
        notificationSound.play();
      }
      notificationSound.play();
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        try {
          const response = await getUserChat(user?._id);

          if (response.status) {
            setUserChats(response.result);
            if (response.result?.length < 1) {
              createChat();
            }
          } else {
            setUserChatsError(response.message);
          }
        } catch (e) {
          setUserChatsError(response.message);
        } finally {
          setIsUserChatsLoading(false);
        }
      }
    };
    getUserChats();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      if (user?._id) {
        setIsMessagesLoading(true);
        try {
          const response = await getMessageUserChat(currentChat?._id);
          if (response.status) {
            setMessages(response.result);
          } else {
            setMessageError(response.message);
          }
        } catch (e) {
          // setMessageError(e.message);
        } finally {
          setIsMessagesLoading(false);
        }
      }
    };
    getMessages();
  }, [currentChat, user?._id]);

  const sendTextMessage = useCallback(
    async (
      textMessage,
      senderId,
      currentChatId,
      setTextMessage,
      setKey,
      image,
      setImage,
      setPreview,
      setSelectedFile,
      setLoading
    ) => {
      let payload = {
        chatId: currentChatId,
        senderId: senderId,
      };
      if (textMessage && textMessage !== "") {
        payload.text = textMessage;
      }

      if (image) {
        payload.image = image;
      }
      try {
        setKey(true);
        setLoading(true)
        const response = await createMessageUserChat(payload);
        if (response.status) {
          setNewMessage(response.result);
          setMessages((prev) => [...prev, response.result]);
          setTextMessage("");
          setKey(false);
          setImage(null);
          setPreview(null);
          setSelectedFile(null);
        } else {
          setSendTextMessageError(response.message);
        }
      } catch (e) {
      } finally {
        setKey(false);
        setLoading(false)
      }
    },
    []
  );
  const updateCurrentChat = useCallback(async (chat) => {
    setCurrentChat(chat);
  }, []);

  // Tạo cuộc trò chuyện mới
  const createChat = useCallback(async () => {
    if (user._id) {
      let payload = {
        firstId: user._id,
        secondId: "666bbbbe3e77ff36ae8f7f68",
      };
      try {
        const response = await createUserChat(payload);
        if (response.status) {
          setIsChatId(response.result);
          setUserChats((prev) => [...prev, response.result]);
        }
      } catch (e) {
      } finally {
      }
    }
  }, [user?._id]);

  const markNotificationsAsRead = useCallback(
    (n, userChats, user, notifications) => {
      // FIND CHAT TO OPEN
      const desiredChat = userChats.find((chat) => {
        const chatMembers = [user._id, n.senderId];
        const isDesiredChat = chat?.members.every((member) => {
          return chatMembers.includes(member);
        });
        return isDesiredChat;
      });
      //mark notification add read
      const mNotifications = notifications.map((el) => {
        if (n.senderId === el.senderId) {
          return { ...n, isRead: true };
        } else {
          return el;
        }
      });
      updateCurrentChat(desiredChat);
      setNotifications(mNotifications);
    },
    []
  );
  const markThisUserNotificationsAsRead = useCallback(
    (thisUserNotifications, notifications) => {
      const mNotifications = notifications.map((el) => {
        let notification;
        thisUserNotifications.forEach((n) => {
          if (n.senderId === el.senderId) {
            notification = { ...n, isRead: true };
          } else {
            notification = el;
          }
        });

        return notification;
      });

      setNotifications(mNotifications);
    },
    []
  );

  //   const openChatWithMessage = () => {
  //     setIsChatOpen(true);
  //   };
  const openChatWithMessage = useCallback(() => {
    setIsChatOpen(true);
  });
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messageError,
        sendTextMessageError,
        newMessage,
        sendTextMessage,
        onlineUsers,
        isChatId,
        notifications,
        markNotificationsAsRead,
        markThisUserNotificationsAsRead,
        isChatOpen,
        openChatWithMessage,
        setIsChatOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
