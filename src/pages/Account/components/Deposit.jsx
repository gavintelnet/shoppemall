import { Drawer, Form, Input } from "antd";
import React, { useEffect } from "react";
import {
  depositMoney,
  getDepositHistoryByCustomer,
} from "../../../services/wallet";
import { formatVND } from "../../../utils";
import { useLoading } from "./../../../context/useLoading";
import { Notification } from "./../../../helpers/notify";
import useRefresh from "../../../hooks/useRefresh";

const style = {
  border: "1px solid red",
};

export const Deposit = ({ open, onClose, user }) => {
  const { setLoading } = useLoading();
  const amoutDeposit = [10000, 50000, 100000, 500000, 1000000, 2000000];
  const [form] = Form.useForm();
  const [priceSelect, setSelectPrice] = React.useState();
  const [history, setHistory] = React.useState([]);
  const [refresh, refecth] = useRefresh();

  const handleDeposit = async (value) => {
    setLoading(true);
    const body = { ...value, customer: user._id };
    await depositMoney(body)
      .then((res) => {
        if (res.status) {
          Notification(res.message, "success");
          refecth();
        } else {
          Notification(res.message, "error");
        }
      })
      .catch((err) => {
        Notification(err.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!user._id) return;
    getDepositHistoryByCustomer(user._id).then((res) => {
      if (res.status) {
        setHistory(res.result);
      } else {
        setHistory([]);
      }
    });
  }, [refresh]);
  return (
    <>
      <Drawer
        onClose={onClose}
        open={open}
        placement="bottom"
        // closeIcon={null}
        height={600}
      >
        <div className="deposit">
          <h3>Nạp tiền</h3>
          <div className="balance">
            <p>
              Số dư của tôi: <span>{formatVND(user.wallet.surplus)}</span>
            </p>
          </div>
          <div className="grid_deposit">
            {amoutDeposit.map((item, index) => (
              <div
                key={index}
                className="item"
                onClick={() => {
                  form.setFieldValue("amount", item);
                  setSelectPrice(item);
                }}
                style={priceSelect === item ? style : {}}
              >
                {item}
              </div>
            ))}
          </div>
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={handleDeposit}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item
              label="Số tiền nạp"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Nhập số tiền nạp",
                },
                () => ({
                  validator(_, value) {
                    if (value && parseInt(value) >= 10000) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Nhập số tiền lớn hơn 10.000 đ ")
                    );
                  },
                }),
              ]}
            >
              <Input placeholder="Vui lòng nhập số tiền từ 10.000 đ đến 1.000.000.000 đ" />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #a0a0a0, #3a3a3a)",
                  borderRadius: "10px",
                  width: "100%",
                  padding: "12px 0px",
                  border: "none",
                  color: "#fff",
                }}
              >
                Xác nhận
              </button>
            </Form.Item>
          </Form>
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <p style={{ fontWeight: 600 }}>
                    Mã yêu cầu: <span>{item.code}</span>
                  </p>
                  <p>
                    Số tiền: <span>{formatVND(item.amount)}</span>
                  </p>
                </div>
                <div>
                  Tình trạng:{" "}
                  {item.status === "Đã hoàn thành" ? (
                    <span style={{ color: "green" }}>{item.status}</span>
                  ) : item.status === "Đang chờ xử lý" ? (
                    <span style={{ color: "red" }}>{item.status}</span>
                  ) : (
                    <span style={{ color: "#ccc" }}>{item.status}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no_resourse">
              <div></div>
              <h2>Không có dữ liệu</h2>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};
