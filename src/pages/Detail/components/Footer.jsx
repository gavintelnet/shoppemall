import React from "react";
import { IoChatbox } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Footer = ({ setOpenCart, setOpenBuy }) => {
  const navigate = useNavigate();
  return (
    <div className="footer_detail">
      <div className="green_background" onClick={() => navigate("/cskh")}>
        <IoChatbox />
        <p>Chat ngay</p>
      </div>
      <div className="green_background" onClick={() => setOpenCart(true)}>
        <FaCartPlus />
        <p>Thêm vào giỏ hàng</p>
      </div>
      <div className="orange_background" onClick={() => setOpenBuy(true)}>
        <p>Mua ngay</p>
      </div>
    </div>
  );
};
