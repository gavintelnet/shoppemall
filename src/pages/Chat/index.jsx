import React, { useContext, useEffect, useRef, useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { FaImage } from "react-icons/fa6";
import { Image, Input } from "antd";
import { IoIosSend } from "react-icons/io";
import { ChatContext } from "../../context/ChatContext";
import DateTimeComponent from "../../utils/DateTimeComponent";
import { useLoading } from "../../context/useLoading";

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default () => {
  const fileInputRef = React.useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [key, setKey] = useState(false);
  const {
    currentChat,
    messages,
    isMessagesLoading,
    sendTextMessage,
    updateCurrentChat,
    userChats,
  } = useContext(ChatContext);
  const messagesEndRef = useRef(null);
  const { setLoading } = useLoading();
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      setImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    const convertFileToBase64 = async () => {
      const base64Image = await fileToBase64(selectedFile);
      setImage(base64Image);
    };

    convertFileToBase64();

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await sendTextMessage(
      message,
      user?._id,
      currentChat?._id,
      setMessage,
      setKey,
      image,
      setImage,
      setPreview,
      setSelectedFile,
      setLoading
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  if (isMessagesLoading) {
    return <p>Loading chat ...</p>;
  }

  return (
    <div className="chat_container">
      <div className="_header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Hỗ trợ trực tuyến</h3>
        <div></div>
      </div>
      <div className="chat-messages">
        {messages &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`message-item ${message.senderId === user._id ? "own" : "recipient"
                }`}
            >
              <div className="message-content-image">
                {message?.images?.url && (
                  <Image src={message?.images.url} alt="Image" />
                )}
              </div>
              {message?.text && (
                <div className="message-content">{message?.text}</div>
              )}
              <div className="message-timestamp">
                <DateTimeComponent dateString={message.createdAt} />
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      {preview && (
        <div className="image-preview">
          <Image src={preview} alt="Preview" />
        </div>
      )}
      <div className="footer_chat">

        <label htmlFor="file-upload" className="upload-button">
          <FaImage
          //  onClick={() => fileInputRef.current.click()}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ display: "none" }}
          // ref={fileInputRef}
          id="file-upload"
        />
        <Input.TextArea
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Nhập nội dung..."
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
        <IoIosSend disabled={key} onClick={(e) => handleSendMessage(e)} />
      </div>
    </div>
  );
};
