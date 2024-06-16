import { Collapse, Drawer, Form } from "antd";
import React, { useEffect } from "react";
import { BsBank } from "react-icons/bs";
import useRefresh from "../../../hooks/useRefresh";
import { getBankUser } from "../../../services/banks";
import { maskBankAccount } from "../../../utils";
import LocalStorage from "../../../utils/LocalStorage";
import { AddBank } from "./AddBank";

export const Bank = ({ open, onClose }) => {
  const user = LocalStorage.getUser();
  const [bank, setBank] = React.useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [refresh, refecth] = useRefresh();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!user._id) return;
    getBankUser({ user: user._id }).then((res) => {
      if (res.status) {
        setBank(res.result.banks);
      } else {
        setBank([]);
      }
    });
  }, [refresh]);
  const lableCollapse = (user) => {
    return (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <BsBank style={{ fontSize: "25px", color: "#ccc" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <p>{user.bankName}</p>
            <p>
              {user.status ? "Đã xác thực" : "Chưa xác thực"}
              {user.isDefault ? (
                <span style={{ color: "red" }}> [MẶC ĐỊNH]</span>
              ) : null}
            </p>
          </div>
          <div>
            <span>{maskBankAccount(user.bankNumber)}</span>
          </div>
        </div>
      </div>
    );
  };
  const child = (user) => {
    return (
      <div>
        <div>
          <p style={{ fontWeight: "bold" }}>Tên chủ tài khoản</p>
          <p>{user.bankOwner}</p>
        </div>
        <div>
          <p style={{ fontWeight: "bold" }}>Số tài khoản</p>
          <p>{user.bankNumber}</p>
        </div>
        <div>
          <p style={{ fontWeight: "bold" }}>Tên ngân hàng</p>
          <p>{user.bankName}</p>
        </div>
      </div>
    );
  };
  const items = bank.map((item) => ({
    key: item.bankNumber,
    label: lableCollapse(item),
    children: child(item),
  }));
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
          <h3>Tài khoản ngân hàng của tôi</h3>
        </div>
        <div className="withdraw_detail">
          <div className="item">
            <p>Tài khoản ngân hàng ({bank.length})</p>
          </div>
        </div>
        <div>
          <Collapse items={items} />
        </div>
        <div style={{ padding: "10px" }}>
          {bank.length === 0 && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px 0px",
                borderRadius: "5px",
                backgroundColor: "#e44420",
                cursor: "pointer",
                color: "#fff",
              }}
              onClick={() => {
                setOpenAdd(true);
              }}
            >
              Thêm ngân hàng
            </div>
          )}
        </div>
        <AddBank
          open={openAdd}
          onClose={() => {
            setOpenAdd(false);
          }}
          form={form}
          refecth={refecth}
        />
      </Drawer>
    </>
  );
};
