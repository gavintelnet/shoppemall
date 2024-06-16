import React, { useEffect } from "react";
import { GrPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Profile } from "./components/Profile";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../../utils/LocalStorage";
import { Password } from "./components/Password";
import { getUserDetail } from "../../services/user";
import { useLoading } from "../../context/useLoading";
import useRefresh from "../../hooks/useRefresh";
import { Notification } from "../../helpers/notify";

export default () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [user, setUser] = React.useState();
  const [activeDraw, setActiveDraw] = React.useState("");
  const [refresh, refecth] = useRefresh();
  const handleLogout = () => {
    LocalStorage.clear();
    navigate("/login");
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
      .finally(() => setLoading(false));
  }, [refresh]);
  return (
    <div className="setting_container">
      <div className="header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Cài đặt</h3>
        <div></div>
      </div>
      <div className="setting_option" onClick={() => setActiveDraw("1")}>
        <p>Thông tin cá nhân</p>
        <MdNavigateNext />
      </div>
      <div className="setting_option" onClick={() => setActiveDraw("2")}>
        <p>Mật khẩu</p>
        <MdNavigateNext />
      </div>
      <div className="setting_option">
        <p>Mật khẩu rút tiền</p>
        <MdNavigateNext />
      </div>
      <div
        className="setting_option"
        onClick={() => {
          Notification("Xóa bộ nhớ thành công", "success");
        }}
      >
        <p>Xóa bộ nhớ</p>
        <MdNavigateNext />
      </div>
      <div className="setting_option">
        <p>Trợ giúp</p>
        <MdNavigateNext />
      </div>
      <div className="setting_option">
        <p>Về chúng tôi</p>
        <MdNavigateNext />
      </div>
      <div className="button_logout" onClick={handleLogout}>
        Đăng xuất
      </div>
      <Profile
        open={activeDraw === "1"}
        onClose={() => setActiveDraw("")}
        refecth={refecth}
        user={user}
      />
      <Password
        open={activeDraw === "2"}
        onClose={() => setActiveDraw("")}
        user={user}
      />
    </div>
  );
};
