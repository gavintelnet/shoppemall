import React from "react";
import { Drawer, Form, Input } from "antd";
import LocalStorage from "../../../utils/LocalStorage";
import { updateUser } from "../../../services/user";
import { Notification } from "../../../helpers/notify";

export const Profile = ({ open, onClose, refecth, user }) => {
  const handleSubmit = (value) => {
    const body = { ...value };
    updateUser(body)
      .then((res) => {
        if (res.status) {
          Notification(res.message, "success");
        } else {
          Notification(res.message, "error");
        }
      })
      .catch((err) => Notification(err.message, "error"))
      .finally(() => refecth());
  };
  return (
    <>
      <Drawer onClose={onClose} open={open} placement="bottom" height={450}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 style={{ margin: 0 }}>Thông tin cơ bản</h3>
        </div>
        <div className="profile">
          <Form
            initialValues={{
              name: user?.name,
              phone: user?.phone,
            }}
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Tên thật"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên thật!",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập tên thật" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input />
            </Form.Item>

            <Form.Item
              style={{
                textAlign: "center",
              }}
            >
              <button
                type="submit"
                style={{
                  backgroundColor: "#ff5259",
                  borderRadius: "10px",
                  width: "400px",
                  padding: "10px 0px",
                  border: "none",
                  color: "#fff",
                  //   marginLeft: "7px",
                }}
              >
                Gửi đi
              </button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
