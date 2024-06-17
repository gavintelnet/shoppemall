import React, { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { GrPrevious } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useLoading } from "../../context/useLoading";
import { getDetailProduct } from "../../services/product";
import { RenderRate, formatVND } from "../../utils/index";
import { AddToCart } from "./components/AddToCart";
import { BuyNow } from "./components/BuyNow";
import { Footer } from "./components/Footer";
import LocalStorage from "../../utils/LocalStorage";
import { Notification } from "../../helpers/notify";
import { CiHeart } from "react-icons/ci";
export default () => {
  const { setLoading } = useLoading();
  const [open, setOpen] = React.useState(false);
  const [openCart, setOpenCart] = React.useState(false);
  const [openBuy, setOpenBuy] = React.useState(false);
  const [data, setData] = React.useState();
  const params = useParams();
  const id = params._id;
  const [like, setLike] = React.useState(false);
  const collections = LocalStorage.getCollection();

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
  const handleAddCollections = async (values) => {
    LocalStorage.setCollection(values);
    Notification("Thêm vào bộ sư tập thành công!", "success");
    setLike(true);
  };
  const handleRemoveCollections = async (values) => {
    LocalStorage.removeCollection(values);
    Notification("Đã bỏ yêu thích!", "success");
    setLike(false);
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
  useEffect(() => {
    if (!collections || !data) return;
    const likeProduct = collections.some((el) => el?._id === data?._id);
    setLike(likeProduct);
  }, [collections]);
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
                  <span>| {data.sold_amout || 0} đã bán</span>
                </div>
              </div>
              <div className="like">
                {like ? (
                  <FaHeart
                    style={{ color: "red" }}
                    onClick={() => handleRemoveCollections(data._id)}
                  />
                ) : (
                  <CiHeart
                    // style={{ fontSize: "30px !important" }}
                    onClick={() => handleAddCollections(data)}
                  />
                )}
              </div>
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
