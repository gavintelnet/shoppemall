import React from "react";
import { GrPrevious } from "react-icons/gr";
import LocalStorage from "../../utils/LocalStorage";
import { formatVND } from "../../utils";
import { useNavigate } from "react-router-dom";

export default () => {
  const collection = LocalStorage.getCollection();
  const navigate = useNavigate();
  return (
    <div className="container collection_container">
      <div className="header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Bộ sưu tập</h3>
        <div></div>
      </div>
      <div className="collection_container">
        {collection ? (
          <>
            {collection.map((item, index) => (
              <div key={index} className="order_item">
                <div className="infor_order">
                  <img src={item.images[0]?.url} alt="" />
                  <div>
                    <p>{item?.name}</p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ color: "red" }}>{formatVND(item?.price)}</p>
                      <div onClick={() => navigate(`/detail/${item._id}`)}>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            textDecoration: "underline",
                            color: "#868383",
                            cursor: "pointer",
                          }}
                        >
                          Xem chi tiết sản phẩm
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="not_found">
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
};
