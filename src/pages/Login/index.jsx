import { Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BannerFooter } from "../../components/banner";
import { useLoading } from "../../context/useLoading";
import { Notification } from "../../helpers/notify";
import { loginUser } from "../../services/auth";
import LocalStorage from "../../utils/LocalStorage";
import { WebsiteConfigContext } from "../../context/ConfigWebsite";
import { TopBar } from "../../components/topbar";
import { useIsLaptopOrDesktop } from "../../utils/responsive";

export default () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { bannerFooter } = BannerFooter();
  const { logoHeader } = React.useContext(WebsiteConfigContext);
  const isLogin = LocalStorage.get("isLogin");
  const isDesktop = useIsLaptopOrDesktop();

  const hadleSubmit = async (values) => {
    setLoading(true);
    await loginUser(values)
      .then((res) => {
        if (res.status) {
          LocalStorage.setTokenUser(res.result.token);
          LocalStorage.set("isLogin", true);
          LocalStorage.set("user", res.result.user);
          navigate("/");
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
    <div
      className="login_container"
      style={
        !isLogin && isDesktop
          ? {
              position: "fixed",
              right: "5%",
              top: "15%",
              width: "430px",
            }
          : {}
      }
    >
      <TopBar />
      <div className="header">
        <span
          style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "5px" }}
        >
          Đăng nhập
        </span>
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

          <Form.Item>
            <button
              type="submit"
              style={{
                marginTop: "20px",
                backgroundColor: "#f2826c",
                borderRadius: "5px",
                padding: "15px 0px",
                width: "100%",
              }}
            >
              Đăng nhập
            </button>
          </Form.Item>
        </Form>
      </div>
      <div className="button_register">
        <p>
          Bạn mới biết đến Shopee?
          <span onClick={() => navigate("/register")}> Đăng ký</span>
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
