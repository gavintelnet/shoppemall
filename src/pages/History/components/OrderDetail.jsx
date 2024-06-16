import React from "react";
import { GrPrevious } from "react-icons/gr";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { formatVND } from "../../../utils/index";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  const location = useLocation();
  const histories = location.state.histories;

  return (
    <div className="detail_order_his">
      <div className="header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Chi tiết đơn hàng</h3>
        <div></div>
      </div>
      <div className="detail_order">
        <p>{histories.status}</p>
        <p>
          Mã đơn hàng: <span>{histories.code}</span>
          <span>
            <HiOutlineClipboardDocument />
          </span>
        </p>
        <p>
          Thời gian đặt hàng:{" "}
          <span>
            {histories.createdAt ? histories.createdAt : "Chưa đặt hàng"}
          </span>
        </p>
      </div>
      <div className="address">
        <p style={{ fontWeight: 600 }}>Địa chỉ giao hàng</p>
        <p>
          <span>Tên người nhận: </span>
          {histories.address.name}
        </p>
        <p>
          <span>Số điện thoại: </span>
          {histories.address.phone}
        </p>
        <p>
          <span>Địa chỉ: </span>
          {histories.address.location}
        </p>
      </div>
      {/* {histories.orderItems.map((item) => ( */}
      <div className="infor_order">
        <img src={histories.orderItems[0].product.images[0].url} alt="" />
        <div>
          <p>{histories.orderItems[0].name}</p>
          <p>
            {formatVND(histories.orderItems[0].price)}{" "}
            <span> x {histories.orderItems[0].quantity}</span>
          </p>
        </div>
      </div>
      {/* ))} */}
      <div className="total_price">
        <div>
          <p>Tổng giá</p>
          <span>{formatVND(histories.totalPrice)}</span>
        </div>
        <div>
          <p>Phí vận chuyển</p>
          <span>{0}</span>
        </div>
        <div>
          <p>Tổng đơn hàng</p>
          <span>{formatVND(histories.totalPrice + 0)}</span>
        </div>
      </div>
    </div>
  );
};
