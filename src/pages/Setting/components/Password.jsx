import { Drawer, Form, Input } from "antd";
import React from "react";
import { useLoading } from "../../../context/useLoading";
import { Notification } from "../../../helpers/notify";
import { updatePassword } from "../../../services/user";

export const Password = ({ open, onClose, user }) => {
  const { loading, setLoading } = useLoading();
  const handleSubmit = (value) => {
    setLoading(true);
    const body = { ...value };
    updatePassword(body)
      .then((res) => {
        if (res.status) {
          Notification(res.message, "success");
        } else {
          Notification(res.message, "error");
        }
      })
      .catch((err) => Notification(err.message, "error"))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Drawer onClose={onClose} open={open} placement="bottom" height={500}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 style={{ margin: 0 }}>Cài đặt mật khẩu</h3>
        </div>
        <div className="profile">
          <Form
            initialValues={{}}
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Mật khẩu đăng nhập cũ"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu đăng nhập cũ!",
                },
              ]}
            >
              <Input.Password placeholder="Vui lòng nhập mật khẩu đăng nhập cũ" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu đăng nhập tài khoản mới"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu đăng nhập mới!",
                },
              ]}
            >
              <Input.Password placeholder="Vui lòng nhập mật khẩu đăng nhập mới" />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu đăng nhập tài khoản mới"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu đăng nhập mới!",
                },
              ]}
            >
              <Input.Password placeholder="Vui lòng xác nhận mật khẩu đăng nhập mới" />
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
                  width: "100%",
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
