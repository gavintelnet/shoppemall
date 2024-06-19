import { Drawer } from "antd";
import React, { useEffect } from "react";
import { useLoading } from "../../../context/useLoading";
import {
  getDepositHistoryByCustomer,
  getDepositHistorySuccess,
  getWithdrawHistoryByCustomer,
  getWithdrawHistorySuccess,
} from "../../../services/wallet";
import { formatVND } from "../../../utils";
export const Financial = ({ open, onClose, user }) => {
  const [activeTab, setActiveTab] = React.useState("2");
  const [history, setHistory] = React.useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!user._id) return;
    setLoading(true);
    if (activeTab === "2") {
      getWithdrawHistoryByCustomer(user._id)
        .then((res) => {
          if (res.status) {
            setHistory(res.result);
          } else {
            setHistory([]);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      getDepositHistoryByCustomer(user._id)
        .then((res) => {
          if (res.status) {
            setHistory(res.result);
          } else {
            setHistory([]);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);
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
          <h3>Chi tiết tài chính</h3>
        </div>
        <div className="tab_wrap">
          {/* <div
            className={`${activeTab === "1" && "active_tab"}`}
            onClick={() => setActiveTab("1")}
          >
            Tất cả
          </div> */}
          <div
            className={`${activeTab === "2" && "active_tab"}`}
            onClick={() => setActiveTab("2")}
          >
            Lịch sử rút tiền
          </div>
          <div
            className={`${activeTab === "3" && "active_tab"}`}
            onClick={() => setActiveTab("3")}
          >
            Lịch sử nạp
          </div>
        </div>
        <div style={{ padding: "5px 5px" }}>
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
                    Mã yêu cầu: <span>{item?.code}</span>
                  </p>
                  <p>
                    Số tiền: <span>{formatVND(item.amount || 0)}</span>
                  </p>
                </div>
                <div>
                  <span style={{ color: "green" }}>{item?.status}</span>
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
