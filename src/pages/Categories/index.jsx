import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GridProduct } from "./components/GridProduct";
import { Footer } from "../Home/components/Footer";
import { Banner } from "../../components/banner";

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = location.state?.name;
  const catergoryActive = params?.get("active");
  const [search, setSearch] = React.useState({
    name: name ? name : "",
  });
  const { banner } = Banner(setSearch);
  console.log(banner);
  useEffect(() => {
    if (!catergoryActive) return;
    setSearch({ category: catergoryActive });
  }, [catergoryActive]);
  return (
    <div
      style={{
        border: "1px solid #ccc",
      }}
    >
      <h3 style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        Phân loại
      </h3>
      <div className="category_container ">
        <div className="menu_left">
          {banner.map((item) => (
            <div
              key={item.key}
              className="menu_item"
              onClick={() => {
                navigate(`?active=${item.category?._id}`);
              }}
              style={
                catergoryActive == item.category?._id
                  ? { backgroundColor: "#fff" }
                  : {}
              }
            >
              <img src={item.image?.url} alt="" />
              <p>{item?.name}</p>
            </div>
          ))}
        </div>
        <GridProduct search={search} />
      </div>
      <Footer />
    </div>
  );
};
