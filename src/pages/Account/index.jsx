import React, { useContext, useEffect } from "react";
import { BsBox2, BsWallet } from "react-icons/bs";
import {
  CiCirclePlus,
  CiCreditCard1,
  CiDeliveryTruck,
  CiDollar,
  CiHeadphones,
  CiInboxOut,
  CiMoneyBill,
  CiSettings,
  CiViewList,
} from "react-icons/ci";
import { FaReact } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { PiChatCircleDotsLight, PiMapPinAreaLight } from "react-icons/pi";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../../utils/LocalStorage";
import { Footer } from "../Home/components/Footer";
import { formatVND } from "./../../utils/index";
import { Deposit } from "./components/Deposit";
import { WithDraw } from "./components/WithDraw";
import { Financial } from "./components/Financial";
import { Bank } from "./components/Bank";
import { getUserDetail } from "../../services/user";
import { useLoading } from "../../context/useLoading";
import useRefresh from "../../hooks/useRefresh";
import { ChatContext } from "../../context/ChatContext";
import avt from "../../assets/images/user-image.png";

export default () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const [user, setUser] = React.useState();
  const [activeDraw, setActiveDraw] = React.useState("");
  const [refresh, refecth] = useRefresh();
  const { userChats, updateCurrentChat, createChat } = useContext(ChatContext);
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

  const navigateChat = async () => {
    if (userChats && userChats.length < 1) {
      await createChat();
      navigate("/cskh");
    } else {
      await updateCurrentChat(userChats[0]);
      navigate("/cskh");
    }
  };

  return (
    <div className="account_container">
      {user ? (
        <>
          <div className="account_infor">
            <img src={avt} alt="" />
            <div className="infor">
              <p>
                {user?.name} ({user?.username})
              </p>
              <p>
                ID: <span>{user?.idCode}</span>
              </p>
              <p>
                Số dư: <span>{formatVND(user?.wallet?.surplus)}</span>
                {/* <span> / Đóng băng: {formatVND(user.wallet.freeze)}</span> */}
              </p>
            </div>
          </div>
          <div className="order">
            <div className="account_header">
              <p>
                <FiFileText />
                <span>Đơn hàng của tôi</span>
              </p>
              <MdNavigateNext />
            </div>
            <div className="item_feature">
              <div onClick={() => navigate("/histories")}>
                <BsWallet />
                <p>Chờ xác nhận</p>
              </div>
              <div onClick={() => navigate("/histories")}>
                <BsBox2 />
                <p>Chờ lấy hàng</p>
              </div>
              <div onClick={() => navigate("/histories")}>
                <CiDeliveryTruck style={{ fontSize: "40px" }} />
                <p>Đang giao</p>
              </div>
              <div onClick={() => navigate("/histories")}>
                <PiChatCircleDotsLight />
                <p>Đánh giá</p>
              </div>
            </div>
          </div>
          <div className="service">
            <div className="account_header">
              <p>
                <FaReact />
                <span>Dịch vụ của tôi</span>
              </p>
              <MdNavigateNext />
            </div>
            <div className="item_feature">
              {/* <div onClick={() => navigate("/create-order")}>
                <CiCirclePlus />
                <p>Tạo đơn hàng</p>
              </div> */}
              <div onClick={() => navigate("/address")}>
                <PiMapPinAreaLight />
                <p>Địa chỉ</p>
              </div>
              <div onClick={() => navigate("/collections")}>
                <IoMdHeartEmpty />
                <p>Bộ sưu tập</p>
              </div>
              <div>
                <GoHistory />
                <p>Lịch sử</p>
              </div>
            </div>
          </div>
          <div className="service">
            <div className="account_header">
              <p>
                <VscWorkspaceUnknown />
                <span>Khác</span>
              </p>
              <MdNavigateNext />
            </div>
            <div className="item_feature">
              <div onClick={() => navigate("/setting")}>
                <CiSettings />
                <p>Cặt đặt hệ thống</p>
              </div>
              <div onClick={() => navigateChat()}>
                <CiHeadphones />
                <p>Liên hệ CSKH</p>
              </div>
            </div>
          </div>
          <div className="more_option">
            <div onClick={() => setActiveDraw("1")}>
              <p>
                <CiDollar /> <span>Nạp tiền</span>
              </p>
              <MdNavigateNext />
            </div>
            <div onClick={() => setActiveDraw("2")}>
              <p>
                <CiInboxOut /> <span>Rút tiền</span>
              </p>
              <MdNavigateNext />
            </div>
            <div onClick={() => setActiveDraw("3")}>
              <p>
                <CiMoneyBill /> <span>Số tiền</span>
              </p>
              <MdNavigateNext />
            </div>
            {/* <div >
              <p>
                <CiViewList /> <span>Thống kê số tiền</span>
              </p>
              <MdNavigateNext />
            </div> */}
            <div onClick={() => setActiveDraw("5")}>
              <p>
                <CiCreditCard1 /> <span>Tài khoản ngân hàng</span>
              </p>
              <MdNavigateNext />
            </div>
          </div>
          <Deposit
            open={activeDraw === "1"}
            onClose={() => setActiveDraw("")}
            user={user}
          />
          <WithDraw
            open={activeDraw === "2"}
            onClose={() => setActiveDraw("")}
            user={user}
            refecth={refecth}
            refresh={refresh}
          />
          <Financial
            open={activeDraw === "3"}
            user={user}
            onClose={() => setActiveDraw("")}
          />
          <Bank open={activeDraw === "5"} onClose={() => setActiveDraw("")} />
          <Footer />
        </>
      ) : null}
    </div>
  );
};
