import React, { useEffect } from "react";
import { Drawer, Modal } from "antd";
import { splitText } from "../../../utils";
import { formatVND } from "../../../utils/index";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../helpers/notify";
import LocalStorage from "../../../utils/LocalStorage";
import { getUserDetail } from "../../../services/user";
import { getAllAddresses } from "../../../services/address";
import { useLoading } from "../../../context/useLoading";
import { createOrder } from "../../../services";

export const BuyNow = ({ open, onClose, data }) => {
  const userId = LocalStorage.getUser()._id;
  const [total, setTotal] = React.useState(1);
  const [user, setUser] = React.useState();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [addressDef, setAddressDef] = React.useState({});
  const { setLoading } = useLoading();

  const navigate = useNavigate();
  let totalPrice = data.price * total;
  const handleBuyNow = () => {
    if (!addressDef) {
      return Notification(
        "Bạn chưa có địa chỉ, vui lòng thêm địa chỉ!",
        "warning"
      );
    }
    if (user.wallet.surplus < totalPrice) {
      setOpenConfirm(true);
    } else {
      navigate("/pay", {
        state: {
          productId: data._id,
          images: data.images,
          name: data.name,
          totalPrice: totalPrice,
          quantity: total,
          price: data.price,
          commission: data.commission,
        },
      });
    }
  };
  const handleAddCart = async () => {
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
          Notification("Chuyển vào giỏ hàng thành công", "success");
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
        setOpenConfirm(false);
        onClose();
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);

    getUserDetail()
      .then((res) => {
        setUser(res.result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
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
    <Drawer
      onClose={onClose}
      open={open}
      placement="bottom"
      closeIcon={null}
      height={360}
    >
      <div className="cart_container">
        <div className="header_cart">
          <div className="infor_pro">
            <img src={data.images[0]?.url} alt="" />
            <div>
              <p>{splitText(data.name, 70)}</p>
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
            {openConfirm && (
              <p
                style={{
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "14px",
                }}
              >
                Số dư của bạn không đủ, chuyển sản phẩm đến giỏ hàng?
                <span
                  style={{
                    textDecoration: "underline",
                    margin: "0px 10px 0px 5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={handleAddCart}
                >
                  Đồng ý
                </span>
                <span
                  style={{
                    color: "#999999",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={() => {
                    setOpenConfirm(false);
                    onClose();
                  }}
                >
                  Hủy
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="button_add">
          <div onClick={handleBuyNow}>Mua ngay</div>
        </div>
      </div>
      {/* <Modal
        open={openConfirm}
        onCancel={() => {
          setOpenConfirm(false);
        }}
        footer={false}
        closeIcon={null}
        width={500}
        className="modal_container"
      >
        <div className="title_confirm" style={{ padding: "0px 5px" }}>
          <p>
            Số dư tài khoản của bạn không đủ để thực hiện thao tác này, chuyển
            đơn hàng đến giỏ hàng?
          </p>
        </div>
        <div className="button_group">
          <button
            onClick={() => {
              setOpenConfirm(false);
            }}
          >
            Hủy bỏ
          </button>
          <button onClick={handleAddCart}>Xác nhận</button>
        </div>
      </Modal> */}
    </Drawer>
  );
};
