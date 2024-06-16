import React, { useEffect } from "react";
import Slider from "react-slick";
import { RenderRate } from "../../utils/index";
import { FaRegHeart } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { Footer } from "./components/Footer";
import { ModalConfirm } from "./components/ModalConfirm";
import { AddToCart } from "./components/AddToCart";
import { BuyNow } from "./components/BuyNow";
import { GrPrevious } from "react-icons/gr";
import { formatVND } from "../../utils/index";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../../services/product";
import { useLoading } from "../../context/useLoading";

export default () => {
  const { setLoading } = useLoading();
  const [open, setOpen] = React.useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  const [openBuy, setOpenBuy] = React.useState(false);
  const [data, setData] = React.useState();
  const params = useParams();
  const id = params._id;
  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleBack = () => {
    window.history.back();
  };
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getDetailProduct(id)
      .then((res) => {
        setData(res.result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  return (
    <div className="container" style={{ backgroundColor: "#f2f2f2" }}>
      {data ? (
        <>
          <div className="detail_container">
            <div className="back_button" onClick={handleBack}>
              <GrPrevious />
            </div>
            <div className="img_slider">
              {data.images.length > 1 ? (
                <Slider {...settings}>
                  {data.images.map((item) => (
                    <div key={item.public_id}>
                      <img src={item.url} alt="" />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div key={data.images[0].public_id}>
                  <img src={data.images[0].url} alt="" />
                </div>
              )}
            </div>
            <div className="infor_product">
              <div>
                <p>{formatVND(data.price)}</p>
                <h4>{data.name}</h4>
                <div className="rate_sold">
                  {RenderRate(5)}
                  <span>| {data.sold_amout} đã bán</span>
                </div>
              </div>
              <FaRegHeart onClick={() => setOpen(true)} />
            </div>
          </div>
          <div className="description">
            <div className="border_bottom">
              <span>Mô tả sản phẩm</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
          <div className="delivery_method">
            <p>
              <TbTruckDelivery /> Miễn phí vận chuyển
            </p>
          </div>
          <Footer setOpenCart={setOpenCart} setOpenBuy={setOpenBuy} />
          {/* <ModalConfirm open={open} onCancel={() => setOpen(false)} /> */}
          <AddToCart
            open={openCart}
            onClose={() => setOpenCart(false)}
            data={data}
          />
          <BuyNow
            open={openBuy}
            onClose={() => setOpenBuy(false)}
            data={data}
          />
        </>
      ) : null}
    </div>
  );
};
