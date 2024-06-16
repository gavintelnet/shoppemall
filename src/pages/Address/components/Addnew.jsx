import { Drawer, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useLoading } from "../../../context/useLoading";
import { Notification } from "../../../helpers/notify";
import { createAddress, updateAddress } from "../../../services/address";
import LocalStorage from "../../../utils/LocalStorage";
export const Addnew = ({ nameDraw, open, onClose, refecth, detail, form }) => {
  const user = LocalStorage.getUser();
  const { setLoading } = useLoading();
  const handleSubmit = (values) => {
    const body = { ...values, userId: user?._id };
    setLoading(true);
    if (nameDraw === "add") {
      createAddress(body)
        .then((res) => {
          if (res.status) {
            Notification(res.message, "success");
          } else {
            Notification(res.message, "error");
          }
        })
        .catch((err) => Notification(err.message, "error"))
        .finally(() => {
          setLoading(false);
          onClose();
          refecth();
        });
    } else {
      updateAddress(detail._id, body)
        .then((res) => {
          if (res.status) {
            Notification(res.message, "success");
          } else {
            Notification(res.message, "error");
          }
        })
        .catch((err) => Notification(err.message, "error"))
        .finally(() => {
          setLoading(false);
          onClose();
          refecth();
        });
    }
  };
  useEffect(() => {
    if (!detail) return;
    if (Object.keys(detail).length < 1) return;
    form.setFieldsValue(detail);
  }, [detail]);
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
          {nameDraw === "add" ? (
            <h3>Thêm mới địa chỉ</h3>
          ) : (
            <h3>Cập nhật địa chỉ</h3>
          )}
        </div>
        <div className="withdraw_detail">
          <Form
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
            form={form}
            style={{ marginTop: "10px" }}
          >
            <Form.Item
              label="Tên người nhận"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên người nhận!",
                },
              ]}
            >
              <Input placeholder="Tên người nhận" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ!",
                },
              ]}
            >
              <Input placeholder="Địa chỉ" />
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
        </div>
        {/* <div className="no_resourse">
              <div></div>
              <h2>Không có dữ liệu</h2>
            </div> */}
      </Drawer>
    </>
  );
};
