import React, { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../context/useLoading";
import { getAllAddresses } from "../../services/address";
import LocalStorage from "../../utils/LocalStorage";
import { formatVND } from "./../../utils/index";
import { Address } from "./components/Address";
import { Footer } from "./components/Footer";
import { Notification } from "../../helpers/notify";

export default () => {
  const location = useLocation();
  const product = location.state;
  const [open, setOpen] = React.useState(false);
  const user = LocalStorage.getUser();
  const { setLoading } = useLoading();
  const [address, setAddress] = React.useState([]);
  const [addressDef, setAddressDef] = React.useState({});

  useEffect(() => {
    setLoading(true);
    getAllAddresses(user?._id)
      .then((res) => {
        if (res.status) {
          const filterDefault = res.result.find(
            (item) => item.isDefault === true
          );
          setAddress(res.result);
          setAddressDef(filterDefault);
        }
      })
      .catch((err) => Notification(err.message, "error"))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="pay_container">
      <div className="infor_wrap">
        <div className="pay_header">
          <GrPrevious onClick={() => window.history.back()} />
          <h3>Xác nhận đơn hàng</h3>
          <div></div>
        </div>
        <div
          className="address"
          onClick={() => {
            setOpen(true);
          }}
        >
          <div>
            <p>
              <FaLocationDot />
              <span> Địa chỉ nhận hàng</span>
            </p>
            <p>
              {addressDef?.name} | <span> {addressDef?.phone} </span>
            </p>
            <p> {addressDef?.location}</p>
          </div>
          <div>
            <GrNext />
          </div>
        </div>
      </div>
      <div className="product_infor">
        {/* {product.map((item) => ( */}
        {product ? (
          <div key={product._id} className="item">
            <img src={product.images[0]?.url} alt="" />
            <div className="item_infor">
              <div className="detail">
                {/* <p>{splitText(product.label, 25)}</p> */}
                <p>{product.name}</p>
                <p>{formatVND(product.price)}</p>
              </div>
              <div>
                <span>{product.quantity} x </span>
                <span>{formatVND(product.price)}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* ))} */}
      </div>
      <div className="total">
        <p>Tổng số tiền</p>
        <p>{formatVND(product.totalPrice)}</p>
      </div>
      <Footer
        product={product}
        totalPrice={formatVND(product.totalPrice)}
        address={addressDef}
      />
      <Address
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        address={address}
        setAddressDef={setAddressDef}
      />
    </div>
  );
};
