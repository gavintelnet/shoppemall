import React from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { Notification } from "../../helpers/notify";
import { useLoading } from "../../context/useLoading";
import { BannerFooter } from "../../components/banner";
import { WebsiteConfigContext } from "../../context/ConfigWebsite";
export default () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { bannerFooter } = BannerFooter();
  const { logoHeader } = React.useContext(WebsiteConfigContext);

  const hadleSubmit = async (values) => {
    setLoading(true);
    await registerUser(values)
      .then((res) => {
        if (res.status) {
          Notification(res.message, "success");
          navigate("/login");
        } else {
          Notification(res.message, "error");
        }
      })
      .catch((err) => {
        Notification(err.message, "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="login_container">
      <div className="header">
        <h2>Đăng ký</h2>
        <p>Bạn cần giúp đỡ?</p>
      </div>
      <div className="logo">
        <img src={logoHeader} alt="" />
      </div>
      <div className="form_login">
        <Form
          initialValues={{}}
          onFinish={hadleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên!",
              },
            ]}
          >
            <Input />
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const password = getFieldValue("password");
                  if (value && password === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không đúng")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mã giới thiệu"
            name="importInviteCode"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã giới thiệu!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              style={{
                backgroundColor: "#f2826c",
                borderRadius: "5px",
                padding: "15px 0px",
                width: "100%",
              }}
            >
              Đăng ký
            </button>
          </Form.Item>
        </Form>
      </div>
      <div className="button_register">
        <p>
          Bằng việc đăng kí, bạn đã đồng ý với Shopee về
          <span> Điều khoản dịch vụ</span> & <span>Chính sách bảo mật</span>
        </p>
        <p>
          Bạn đã có tài khoản?
          <span onClick={() => navigate("/login")}> Đăng nhập</span>
        </p>
      </div>
      <div>
        <img
          src={bannerFooter?.images?.url}
          alt=""
          style={{ width: "100%", marginTop: "15px" }}
        />
      </div>
    </div>
  );
};
