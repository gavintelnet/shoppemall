import React from "react";
import { IoHome } from "react-icons/io5";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
export const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer_home_container">
      <div onClick={() => navigate("/")}>
        <IoHome />
        <p>Trang đầu</p>
      </div>
      <div onClick={() => navigate(`/categories`)}>
        <TbCategoryFilled />
        <p>Phân loại</p>
      </div>
      <div onClick={() => navigate(`/histories`)}>
        <FaCartShopping />
        <p>Đơn hàng</p>
      </div>
      <div onClick={() => navigate(`/account`)}>
        <FaUser />
        <p>Của Tôi</p>
      </div>
    </div>
  );
};
