import React, { useEffect } from "react";
import { useLoading } from "../../context/useLoading";
import { getAllProductsByBanner } from "../../services/product";

export const Products = (body) => {
  const [products, setProducts] = React.useState([]);
  const { setLoading } = useLoading();
  useEffect(() => {
    if(!body) return;
    setLoading(true);
    getAllProductsByBanner({ ...body, page: body.page - 1 })
      .then((res) => {
        setProducts(
          res.result.products.map((item) => ({
            ...item,
            key: item._id,
          }))
        );
        // setTotal(res.result.pagination.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [body.category, body.size]);
  return { products };
};
