import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { getAllProductsByBanner } from "../../../services/product";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
export const SearchTopBar = () => {
  const navigate = useNavigate();
  const handleSearch = async (value) => {
    const body = { name: value, page: 0, size: 10 };
    // await getAllProductsByBanner(body).then((res) => {
    //   if (res.status) {
    navigate("/categories", {
      state: {
        name: value,
      },
    });
    //   }
    //   console.log(res);
    // });
  };
  return (
    <div className="topbar_search">
      <Form.Item label="" name="search">
        <Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          onSearch={handleSearch}
        />
      </Form.Item>
    </div>
  );
};
