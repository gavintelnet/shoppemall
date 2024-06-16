import React, { useEffect } from "react";
import { Drawer } from "antd";
import { splitText } from "../../../utils";
import { formatVND } from "../../../utils/index";
import LocalStorage from "../../../utils/LocalStorage";
import { Notification } from "../../../helpers/notify";
import { createOrder } from "../../../services";
import { getAllAddresses } from "../../../services/address";
import { getUserDetail } from "../../../services/user";
import { useLoading } from "../../../context/useLoading";

export const AddToCart = ({ open, onClose, data }) => {
  const userId = LocalStorage.getUser()._id;
  const [user, setUser] = React.useState();
  const [total, setTotal] = React.useState(1);
  const [addressDef, setAddressDef] = React.useState({});
  const { setLoading } = useLoading();
  let totalPrice = data.price * total;
  // const handleAdd = () => {
  //   LocalStorage.setCartUser({
  //     key: data._id,
  //     name: data.name,
  //     price: data.price,
  //     images: data.images,
  //     quantity: total,
  //     totalPrice: totalPrice,
  //     status: "Chờ thanh toán",
  //   });
  //   Notification("Thêm vào giỏ hàng thành công", "success");
  //   onClose();
  // };
  const handleAdd = async () => {
    if (!addressDef) {
      return Notification(
        "Bạn chưa có địa chỉ, vui lòng thêm địa chỉ!",
        "warning"
      );
    }
    const orderItems = [
      {
        // images: data.images,
        product: data._id,
        name: data.name,
        quantity: total,
        price: data.price,
        commission: data.commission,
      },
    ];
    const newOrder = {
      orderItems,
      // totalPrice: data.totalPrice,
      // homeAgentId: user._id,
      customer: user._id,
      address: {
        name: addressDef.name,
        phone: addressDef.phone,
        location: addressDef.location,
      },
      commission: data.commission,
      orderStatus: "Chờ thanh toán",
    };
    setLoading(true);
    await createOrder(newOrder)
      .then((res) => {
        if (res.status) {
          Notification("Thêm vào giỏ hàng thành công", "success");
          // LocalStorage.setHistory({
          //   ...newOrder,
          //   timeOrder: timeNow,
          //   status: "Kiểm duyệt",
          // });
          // LocalStorage.removeItemPaid(data._id);
        } else {
          Notification(res.message, "error");
        }
      })
      .catch((error) => {
        Notification(error.message, "error");
      })
      .finally(() => {
        onClose();
        setLoading(false);
      });
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
  useEffect(() => {
    getAllAddresses(userId)
      .then((res) => {
        if (res.status) {
          const filterDefault = res.result.find(
            (item) => item.isDefault === true
          );
          setAddressDef(filterDefault);
        }
      })
      .catch((err) => Notification(err.message, "error"))
      .finally(() => {});
  }, []);
  return (
    <Drawer onClose={onClose} open={open} placement="bottom" closeIcon={null}>
      <div className="cart_container">
        <div className="header_cart">
          <div className="infor_pro">
            <img src={data.images[0]?.url} alt="" />
            <div>
              <p>{splitText(data.name, 30)}</p>
              <span>{formatVND(data.price)}</span>
            </div>
          </div>
          <div className="close_button" onClick={onClose}>
            X
          </div>
        </div>
        <div className="quantity_price">
          <div className="quantity">
            <p>Số lượng</p>
            <div className="quantity_cacular">
              <div
                className="except_plus"
                onClick={() => setTotal((curr) => (curr > 1 ? curr - 1 : 1))}
              >
                -
              </div>
              <div>{total}</div>
              <div
                className="except_plus"
                onClick={() => setTotal((curr) => curr + 1)}
              >
                +
              </div>
            </div>
          </div>
          <div className="total_price">
            <p>
              Thành tiền: <span>{formatVND(totalPrice)}</span>
            </p>
            <p>
              Số dư của tôi:{" "}
              <span>{formatVND(user ? user.wallet.surplus : 0)}</span>
            </p>
          </div>
        </div>
        <div className="button_add" onClick={handleAdd}>
          <div>Thêm vào giỏ hàng</div>
        </div>
      </div>
    </Drawer>
  );
};
