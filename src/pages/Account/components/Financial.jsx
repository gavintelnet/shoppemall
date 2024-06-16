import React from "react";
import { Drawer, Form, Input } from "antd";
import { formatVND } from "../../../utils";
const bank = {
  name: "nguyen van nguyen",
  bank: "Ngân hàng TMCP Á Châu (ACB)",
  bank_number: "09223232323",
};
export const Financial = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = React.useState("1");
  const [form] = Form.useForm();
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
          <div
            className={`${activeTab === "1" && "active_tab"}`}
            onClick={() => setActiveTab("1")}
          >
            Tất cả
          </div>
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
        <div className="no_resourse">
          <div></div>
          <h2>Không có dữ liệu</h2>
        </div>
      </Drawer>
    </>
  );
};
