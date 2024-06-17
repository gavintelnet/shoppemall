import React from "react";
import { formatVND, splitText } from "../../../utils/index";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Products } from "../../../components/products";
import Slider from "react-slick";

export const Refund70 = ({ banner }) => {
  const navigate = useNavigate();
  const [size, setSize] = React.useState(10);
  const body = { category: banner.category._id, page: 1, size: size };
  const { products } = Products(body);
  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <div className="component_refund">
      <div className="banner">
        {banner.images.length > 1 ? (
          <Slider {...settings}>
            {banner.images.map((item) => (
              <div key={item?.public_id}>
                <img src={item?.url} alt="" />
              </div>
            ))}
          </Slider>
        ) : (
          <div key={banner.images[0]?.public_id}>
            <img src={banner.images[0]?.url} alt="" />
          </div>
        )}
      </div>
      <div className="list_wrap">
        <div className="see_more">
          <p>{banner.category.description}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
            onClick={() =>
              navigate(`/categories?active=${banner.category._id}`)
            }
          >
            <span>Xem thêm</span>
            <FaArrowRightLong />
          </div>
        </div>
        <div className="list">
          {products.map((item) => (
            <div key={item.key} onClick={() => navigate(`/detail/${item._id}`)}>
              <img src={item.images[0].url} alt="" />
              <div className="content">
                <p>{splitText(item.name, 10)}</p>
                <span>{formatVND(item.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
