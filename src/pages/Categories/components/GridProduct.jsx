import React, { useCallback, useEffect } from "react";
import { formatVND, splitText } from "../../../utils/index";
import { useNavigate } from "react-router-dom";
import { Products } from "../../../components/products";

export const GridProduct = ({ search }) => {
  const [dataGrid, setDataGrid] = React.useState();
  const navigate = useNavigate();
  const [size, setSize] = React.useState(10);
  const body = {
    category: search?.category,
    name: search?.name,
    page: 1,
    size: size,
  };
  const { products } = Products(body);
  useEffect(() => {
    setDataGrid(products);
  }, [products]);

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const checkScrollBottom = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300
    ) {
      setSize((prevSize) => prevSize + 10);
    }
  }, []);

  const debouncedCheckScrollBottom = useCallback(
    debounce(checkScrollBottom, 100),
    [checkScrollBottom]
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedCheckScrollBottom);
    return () => {
      window.removeEventListener("scroll", debouncedCheckScrollBottom);
    };
  }, [debouncedCheckScrollBottom]);
  return (
    <div className="grid_product">
      {products.map((item) => (
        <div key={item._id} onClick={() => navigate(`/detail/${item._id}`)}>
          <img src={item.images[0].url} alt="" />
          <p>{splitText(item.name, 20)}</p>
          <span>{formatVND(item.price)}</span>
        </div>
      ))}
    </div>
  );
};
