import React from "react";
import { Modal } from "antd";

export const ModalConfirm = ({ open, onCancel }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={false}
      closeIcon={null}
      width={500}
      className="modal_container"
    >
      <div className="title_confirm">
        <p>Lưu sản phẩm vào bộ sưu tập?</p>
      </div>
      <div className="button_group">
        <button onClick={onCancel}>Hủy bỏ</button>
        <button>Xác nhận</button>
      </div>
    </Modal>
  );
};
