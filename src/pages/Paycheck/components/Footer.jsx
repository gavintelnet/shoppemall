import React from "react";
import { useNavigate } from "react-router-dom";

export const Footer = ({ product, totalPrice, address }) => {
  const navigate = useNavigate();
  return (
    <div className="footer_paycheck">
      <p>Tổng cộng {product.quantity} sản phẩm</p>
      <div className="pay_amount">
        <div>
          <p>Tổng cộng</p>
          <p>{totalPrice}</p>
        </div>
        <div
          className="button_pay"
          onClick={() =>
            navigate("/payment", {
              state: { data: product, address: address },
            })
          }
        >
          Thanh toán
        </div>
      </div>
    </div>
  );
};
