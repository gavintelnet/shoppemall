import { Drawer } from "antd";
import React from "react";

export const Address = ({ open, onClose, address, setAddressDef }) => {
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
          <h3>Danh sách địa chỉ</h3>
        </div>
        <div className="address_wrap">
          {address
            ? address.map((item) => (
                <div
                  key={item._id}
                  className="item"
                  style={{ border: "1px solid #ccc" }}
                >
                  <div>
                    <p>
                      Tên người nhận: <span> {item?.name}</span>
                    </p>
                    <p>
                      Số điện thoại: <span> {item?.phone}</span>
                    </p>
                    <p>
                      Địa chỉ: <span> {item?.location}</span>
                    </p>
                    {item.isDefault && <p>[MẶC ĐỊNH]</p>}
                  </div>
                  <div
                    className="edit"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setAddressDef(item);
                      onClose();
                    }}
                  >
                    Chọn
                  </div>
                </div>
              ))
            : null}
        </div>
        {/* <div className="no_resourse">
          <div></div>
          <h2>Không có dữ liệu</h2>
        </div> */}
      </Drawer>
    </>
  );
};
