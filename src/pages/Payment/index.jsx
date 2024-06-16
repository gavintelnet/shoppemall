import React, { useEffect } from "react";
import { GrPrevious } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { formatVND, getTimeNow } from "../../utils";
import LocalStorage from "../../utils/LocalStorage";
import { createOrder, updateOrderStatus } from "../../services";
import { Notification } from "../../helpers/notify";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { useLoading } from "../../context/useLoading";
import { getUserDetail } from "../../services/user";

export default () => {
  const userId = LocalStorage.getUser()._id;
  const [user, setUser] = React.useState();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const address = location.state.address;
  const timeNow = getTimeNow();
  console.log(data);
  const handlePay = async () => {
    if (user.wallet.surplus < data.totalPrice) {
      return Notification(
        "Số dư tài khoản không đủ để thanh toán đơn hàng này",
        "error"
      );
    }
    if (!data.code) {
      const orderItems = [
        {
          product: data.productId,
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          commission: data.commission,
        },
      ];
      const newOrder = {
        orderItems,
        // totalPrice: data.totalPrice,
        // homeAgentId: user._id,
        customer: userId,
        address: {
          name: address.name,
          phone: address.phone,
          location: address.location,
        },
        commission: data.commission,
        code: data.code,
        orderStatus: "Đang kiểm duyệt",
      };
      setLoading(true);
      await createOrder(newOrder)
        .then((res) => {
          if (res.status) {
            Notification(res.message, "success");
            // LocalStorage.setHistory({
            //   ...newOrder,
            //   timeOrder: timeNow,
            //   status: "Kiểm duyệt",
            // });
            // LocalStorage.removeItemPaid(data._id);
            navigate("/categories");
          } else {
            Notification(res.message, "error");
          }
        })
        .catch((error) => {
          Notification(error.message, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      await updateOrderStatus(data.orderId, { status: "Đang kiểm duyệt" })
        .then((res) => {
          if (res.status) {
            Notification(res.message, "success");
            navigate("/categories");
          } else {
            Notification(res.message, "error");
          }
        })
        .catch((error) => {
          Notification(error.message, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    getUserDetail()
      .then((res) => {
        setUser(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="payment_container">
      <div className="payment_header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Thanh toán</h3>
        <div></div>
      </div>
      <div className="detail">
        <div>
          <p>Loại hàng hóa</p>
          <p>Đơn đặt hàng</p>
        </div>
        {data.code ? (
          <div>
            <p>Mã đơn hàng</p>
            <p>{data.code}</p>
          </div>
        ) : null}

        <div>
          <p>Số tiền thanh toán</p>
          <p style={{ color: "red", fontWeight: "600" }}>
            {formatVND(data.totalPrice)}
          </p>
        </div>
      </div>
      <div className="submit_pay" onClick={handlePay}>
        <FcMoneyTransfer />
        <div className="infor_pay">
          <div>
            <p>Xác nhận thanh toán</p>
            <p>Thanh toán số dư tài khoản</p>
          </div>
          <MdOutlineNavigateNext />
        </div>
      </div>
    </div>
  );
};
