import React, { useEffect } from "react";
import { GrPrevious } from "react-icons/gr";
import { formatVND } from "../../utils";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../../utils/LocalStorage";
import { getAllOrdersByCustomer, updateOrderStatus } from "../../services";
import { Notification } from "../../helpers/notify";
import { useLoading } from "../../context/useLoading";
import useRefresh from "../../hooks/useRefresh";
import { Popconfirm } from "antd";
export default () => {
  const userId = LocalStorage.getUser()._id;
  const [cart, setCart] = React.useState([]);
  const [page, setPage] = React.useState({
    page: 0,
    size: 100,
  });
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [refresh, refecth] = useRefresh();
  const [activeTab, setActiveTab] = React.useState("");

  const handleBuyNow = (item) => {
    navigate("/pay", {
      state: {
        // product: item.key,
        // images: item.images,
        // name: item.name,
        // // totalPrice: item.totalPrice,
        // quantity: item.quantity,
        // price: item.price,
        // commission: item.commission,
        // // code: item.code ? item.code : item.key,
        orderId: item._id,
        images: item.orderItems[0].product.images,
        name: item.orderItems[0].name,
        totalPrice: item.totalPrice,
        quantity: item.orderItems[0].quantity,
        price: item.orderItems[0].price,
        commission: item.orderItems[0].commission,
        code: item?.code,
      },
    });
  };
  const handeCancel = (item) => {
    updateOrderStatus(item._id, { status: "Hủy" })
      .then((res) => {
        if (res.status) {
          Notification(res.message, "success");
        } else {
          Notification(res.message, "error");
        }
      })
      .catch((error) => {
        Notification(error.message, "error");
      })
      .finally(() => {
        setLoading(false);
        refecth();
      });
  };
  useEffect(() => {
    // if (!userId) return;
    setLoading(true);
    getAllOrdersByCustomer({
      ...page,
      customerId: userId,
      orderStatus: activeTab,
    })
      .then((res) => {
        if (res.status) {
          setCart(res.result.orders);
        } else {
          Notification(res.message, "error");
        }
      })
      .catch((err) => Notification(err.message, "error"))
      .finally(() => setLoading(false));
  }, [userId, refresh, activeTab]);
  return (
    <div className="history_container">
      <div className="_header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Lịch sử đặt hàng</h3>
        <div></div>
      </div>
      <div className="tab_wrap">
        <div
          className={`${activeTab === "" && "active_tab"}`}
          onClick={() => setActiveTab("")}
        >
          Tất cả
        </div>
        <div
          className={`${activeTab === "Đang kiểm duyệt" && "active_tab"}`}
          onClick={() => setActiveTab("Đang kiểm duyệt")}
        >
          Kiểm duyệt
        </div>
        <div
          className={`${activeTab === "Hoàn thành" && "active_tab"}`}
          onClick={() => setActiveTab("Hoàn thành")}
        >
          Thành công
        </div>
        <div
          className={`${activeTab === "Hủy" && "active_tab"}`}
          onClick={() => setActiveTab("Hủy")}
        >
          Đã hủy
        </div>
      </div>
      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (
            <div key={index} className="order_item">
              <div className="code_status">
                <p>
                  Mã đơn hàng: <span>{item.code}</span>
                </p>
                <p>{item.orderStatus}</p>
              </div>
              <div className="infor_order">
                <img src={item.orderItems[0]?.product?.images[0].url} alt="" />
                <div>
                  <p>{item.orderItems[0].name}</p>
                  <p>
                    {formatVND(item.orderItems[0].price)}
                    <span> x {item.orderItems[0].quantity}</span>
                  </p>
                </div>
              </div>
              <div className="total_price">
                <p>
                  Tổng cộng:
                  <span> {formatVND(item.totalPrice)}</span>
                </p>
                <div className="group_btn">
                  {item.orderStatus === "Chờ thanh toán" && (
                    <div>
                      <Popconfirm
                        placement="top"
                        title={"Hủy đơn hàng"}
                        description={"Bạn chắc chắn muốn hủy đơn hàng này?"}
                        okText="Đồng ý"
                        cancelText="Từ chối"
                        onConfirm={() => handeCancel(item)}
                      >
                        <div className="item_btn">Hủy</div>
                      </Popconfirm>
                      <div
                        className="item_btn"
                        onClick={() => handleBuyNow(item)}
                      >
                        Thanh toán
                      </div>
                    </div>
                  )}
                  <div
                    className="item_btn"
                    onClick={() =>
                      navigate("/order-detail", {
                        state: { histories: item },
                      })
                    }
                  >
                    Xem chi tiết
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="not_found">
          <div></div>
        </div>
      )}
    </div>
  );
};
