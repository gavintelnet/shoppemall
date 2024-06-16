import { Drawer, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useLoading } from "../../../context/useLoading";
import { Notification } from "../../../helpers/notify";
import { createAddress, updateAddress } from "../../../services/address";
import LocalStorage from "../../../utils/LocalStorage";
import { banks } from "../../../constants/banks";
import { createBankAccount } from "../../../services/banks";
export const AddBank = ({ open, onClose, refecth, form }) => {
  const user = LocalStorage.getUser();
  const { setLoading } = useLoading();
  const handleSubmit = (values) => {
    const body = { ...values, user: user?._id };
    setLoading(true);
    createBankAccount(body)
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
        refecth();
        onClose();
        form.resetFields();
      });
  };
  // useEffect(() => {
  //   if (!detail) return;
  //   if (Object.keys(detail).length < 1) return;
  //   form.setFieldsValue(detail);
  // }, [detail]);
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
          <h3>Thêm mới tài khoản ngân hàng</h3>
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
              label="Ngân hàng"
              name="bankName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngân hàng!",
                },
              ]}
            >
              <Select placeholder="Ngân hàng" options={banks} />
            </Form.Item>
            <Form.Item
              label="Số tài khoản"
              name="bankNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tài khoản!",
                },
              ]}
            >
              <Input placeholder="Số tài khoản" />
            </Form.Item>
            <Form.Item
              label="Tên chủ tài khoản"
              name="bankOwner"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên chủ tài khoản!",
                },
              ]}
            >
              <Input placeholder="Chủ tài khoản" />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #a0a0a0, #3a3a3a)",
                  borderRadius: "10px",
                  width: "400px",
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
