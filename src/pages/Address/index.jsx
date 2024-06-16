import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { GrPrevious } from "react-icons/gr";
import { Notification } from "../../helpers/notify";
import { getAllAddresses, setDefaultAddress } from "../../services/address";
import LocalStorage from "../../utils/LocalStorage";
import { Addnew } from "./components/Addnew";
import useRefresh from "../../hooks/useRefresh";
import { Form } from "antd";
import { useLoading } from "../../context/useLoading";
export default () => {
  const user = LocalStorage.getUser();
  const { setLoading } = useLoading();
  const [address, setAddress] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [refresh, refecth] = useRefresh();
  const [detail, setDetail] = React.useState({});
  const [nameDraw, setNameDraw] = React.useState("");
  const [form] = Form.useForm();
  const handleSetDefault = (addressId) => {
    setLoading(true);
    setDefaultAddress(addressId, { userId: user._id })
      .then((res) => {
        if (res.status) {
          Notification(res.message, "success");
        } else {
          Notification(res.message, "error");
        }
      })
      .catch((err) => Notification(err.message, "error"))
      .finally(() => {
        refecth();
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getAllAddresses(user?._id)
      .then((res) => {
        if (res.status) {
          setAddress(res.result);
        }
      })
      .catch((err) => Notification(err.message, "error"))
      .finally(() => {
        setLoading(false);
      });
  }, [refresh]);
  return (
    <div className="address_container">
      <div className="_header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Địa chỉ</h3>
        <div></div>
      </div>
      <div className="address_wrap">
        {address
          ? address.map((item) => (
              <div key={item._id} className="item">
                <div>
                  <p>
                    Tên người nhận: <span> {item.name}</span>
                  </p>
                  <p>
                    Số điện thoại: <span> {item.phone}</span>
                  </p>
                  <p>
                    Địa chỉ: <span> {item.location}</span>
                  </p>
                  {item.isDefault ? (
                    <p>[MẶC ĐỊNH]</p>
                  ) : (
                    <p
                      style={{
                        color: "#a1a1a1",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSetDefault(item._id)}
                    >
                      Đặt làm mặc định
                    </p>
                  )}
                </div>
                <div className="edit">
                  <CiEdit
                    onClick={() => {
                      setNameDraw("edit");
                      setOpen(true);
                      setDetail(item);
                    }}
                  />
                </div>
              </div>
            ))
          : null}
      </div>
      <div
        className="btn_add"
        onClick={() => {
          setNameDraw("add");
          setOpen(true);
        }}
      >
        Thêm địa chỉ
      </div>
      <Addnew
        open={open}
        onClose={() => {
          form.resetFields();
          setOpen(false);
        }}
        refecth={refecth}
        detail={detail}
        form={form}
        nameDraw={nameDraw}
      />
    </div>
  );
};
