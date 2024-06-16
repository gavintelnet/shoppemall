import { Drawer, Form, Input, InputNumber } from "antd";
import React, { useContext, useEffect } from "react";
import { useLoading } from "../../../context/useLoading";
import { Notification } from "../../../helpers/notify";
import { getBankDefault } from "../../../services/banks";
import {
  getWithdrawHistoryByCustomer,
  withdrawMoney,
} from "../../../services/wallet";
import { formatVND } from "../../../utils";
import useRefresh from "../../../hooks/useRefresh";
import { WebsiteConfigContext } from "../../../context/ConfigWebsite";

export const WithDraw = ({ open, onClose, user, refecth, refresh }) => {
  const { setLoading } = useLoading();
  const [form] = Form.useForm();
  const [bank, setBank] = React.useState();
  const [history, setHistory] = React.useState([]);
  // const [refresh, refecth] = useRefresh();
  const { configWebsite } = useContext(WebsiteConfigContext);
  const handleWithdraw = async (value) => {

    setLoading(true);
    const body = { ...value, customer: user?._id, note: "" };
    await withdrawMoney(body)
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
    getBankDefault({ userId: user?._id }).then((res) => {
      if (res.status) {
        setBank(res.result[0]);
      } else {
        setBank([]);
      }
    });
  }, []);
  useEffect(() => {
    if (!user._id) return;
    getWithdrawHistoryByCustomer(user._id).then((res) => {
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
          <h3>Rút tiền</h3>
          <div className="balance">
            <p>
              Số dư tài khoản: <span>{formatVND(user.wallet.surplus)}</span>
            </p>
          </div>
        </div>
        <div className="withdraw_detail">
          <div className="item">
            <p>
              Tên chủ thẻ: <span> {bank?.bankOwner}</span>
            </p>
          </div>
          <div className="item">
            <p>
              Ngân hàng: <span> {bank?.bankName}</span>
            </p>
          </div>
          <div className="item">
            <p>
              Số tài khoản: <span> {bank?.bankNumber}</span>
            </p>
          </div>
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={handleWithdraw}
            autoComplete="off"
            layout="vertical"
            form={form}
            style={{ marginTop: "10px" }}
          >
            {/* <Form.Item
              label={<h3 style={{ margin: "0px" }}>Số tiền rút</h3>}
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Nhập số tiền rút",
                },
                () => ({
                  validator(_, value) {
                    if (value && parseInt(value) >= configWebsite?.minRut) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(`Nhập số tiền lớn hơn ${formatVND(configWebsite?.minRut)} `)
                    );
                  },
                }),
              ]}
            > */}
            <Form.Item
              label={<h3 style={{ margin: "0px" }}>Số tiền rút</h3>}
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Nhập số tiền rút",
                },
                {
                  validator(_, value) {
                    if (value && parseInt(value) >= configWebsite?.minRut && parseInt(value) <= configWebsite?.maxRut) {
                      return Promise.resolve();
                    }
                    if (value < configWebsite?.minRut) {
                      return Promise.reject(new Error(`Nhập số tiền lớn hơn hoặc bằng ${formatVND(configWebsite?.minRut)}`));
                    }
                    if (value > configWebsite?.maxRut) {
                      return Promise.reject(new Error(`Nhập số tiền nhỏ hơn hoặc bằng ${formatVND(configWebsite?.maxRut)}`));
                    }
                    return Promise.reject(new Error(`Nhập số tiền trong khoảng từ ${formatVND(configWebsite?.minRut)} đến ${formatVND(configWebsite?.maxRut)}`));
                  },
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} placeholder={`Vui lòng nhập số tiền từ ${formatVND(configWebsite?.minRut)} đến ${formatVND(configWebsite?.maxRut)}`} />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #a0a0a0, #3a3a3a)",
                  borderRadius: "10px",
                  width: "400px",
                  padding: "12px 0px",
                  border: "none",
                  color: "#fff",
                }}
              >
                Xác nhận
              </button>
            </Form.Item>
          </Form>
        </div>
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
                margin: "0px 5px 10px",
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
      </Drawer>
    </>
  );
};
