import React, { useEffect } from "react";
import { GrPrevious } from "react-icons/gr";
import { formatVND, getTimeNow, splitText } from "../../utils";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { getListUserAll } from "../../services/list_user";
import LocalStorage from "../../utils/LocalStorage";
import { createOrder } from "../../services";
import { Notification } from "../../helpers/notify";
import { useLoading } from "../../context/useLoading";
export default () => {
  const user = LocalStorage.getUser();
  const { setLoading } = useLoading();

  const [form] = Form.useForm();
  const timeNow = getTimeNow();
  const cartData = LocalStorage.getCart();
  const totalCartAmout = cartData
    ? cartData.reduce((acc, item) => acc + item.totalAmount, 0)
    : 0;
  const [dataTable, setDataTable] = React.useState(cartData);
  const [totalPrice, setTotalPrice] = React.useState(totalCartAmout);
  const handleQuantityChange = (record, value) => {
    const updatedRows = cartData.map((row) => {
      if (row.key === record.key) {
        const totalAmount = value * row.price;
        // LocalStorage.setCartUser({ ...row, quantity: value, totalAmount });
        return { ...row, quantity: value, totalAmount };
      }
      return row;
    });
    setDataTable(updatedRows);
    const newTotalPrice = updatedRows.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );
    setTotalPrice(newTotalPrice);
  };
  const handleDelete = (record) => {
    const updatedData = dataTable.filter((row) => row.key !== record.key);
    setDataTable(updatedData);
  };
  const onFinish = async (values) => {
    if (!dataTable || dataTable.length < 1) {
      return Notification("Bạn chưa có sản phẩm nào", "error");
    }
    const orderItems = dataTable;
    const newOrder = {
      ...values,
      orderItems,
      totalPrice: totalPrice,
      homeAgentId: user._id,
    };
    setLoading(true);
    await createOrder(newOrder)
      .then((res) => {
        if (res.status) {
          Notification("Tạo đơn hàng thành công", "success");
          LocalStorage.remove("cart");
          setDataTable([]);
          form.resetFields();
          LocalStorage.setHistory({
            ...newOrder,
            timeOrder: timeNow,
            status: "Kiểm duyệt",
          });
        } else {
          Notification("Tạo đơn hàng thất bại", "error");
        }
      })
      .catch((error) => {
        Notification("Tạo đơn hàng thất bại", "error");
      })
      .finally(() => setLoading(false));
  };
  const columnItems = [
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      width: 100,
      align: "center",
      render: (images) => (
        <img
          key={images[0].public_id}
          src={images[0].url}
          alt="Product"
          style={{ width: 50 }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 100,
      align: "left",
      render: (_, record) => {
        return <p>{splitText(record.name, 10)}</p>;
      },
    },
    {
      title: "Giá (đ)",
      dataIndex: "price",
      key: "price",
      width: 120,
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Input
          type="number"
          min={1}
          value={record.quantity}
          onChange={(e) =>
            handleQuantityChange(record, parseInt(e.target.value, 10))
          }
        />
      ),
    },
    {
      title: "Tổng số",
      dataIndex: "totalAmount",
      align: "center",
    },
    {
      title: "",
      key: "action",
      width: 100,
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa sản phầm"
              description="Bạn có chắc muốn xóa sản phẩm này"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDelete(record)}
            >
              <RiDeleteBin5Line style={{ color: "red", fontSize: 20 }} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="create_order">
      <div className="header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Tạo đơn hàng</h3>
        <div></div>
      </div>
      <div className="form_create">
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 60%", padding: "0 10px" }}>
              <Row gutter={14}>
                <Col span={12}>
                  <Form.Item
                    label="Khách hàng"
                    name="customer"
                    rules={[
                      {
                        required: true,
                        message: "Please input your customer!",
                      },
                    ]}
                  >
                    {/* <Select
                      showSearch
                      optionFilterProp="children"
                      //   filterOption={filterOption}
                      options={dataUser}
                    /> */}
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={5}>
                <Col span={12}>
                  <Form.Item label=" ">
                    <div style={{ fontWeight: 550, fontSize: 20 }}>
                      <p>
                        Tổng tiền <span>{formatVND(totalPrice)}</span>
                      </p>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Table columns={columnItems} dataSource={dataTable} />
            </div>
          </div>
          <div
            style={{ marginTop: 15, display: "flex", justifyContent: "center" }}
          >
            <Space>
              <div className="btn_cancel">
                <Button htmlType="button" onClick={() => {}}>
                  Hủy
                </Button>
              </div>
              <div className="btn_submit">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: "#e62e05" }}
                >
                  Tạo đơn
                </Button>
              </div>
            </Space>
          </div>
        </Form>
      </div>
    </div>
  );
};
