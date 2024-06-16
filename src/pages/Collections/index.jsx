import React from "react";
import { GrPrevious } from "react-icons/gr";

export default () => {
  return (
    <div className="container collection_container">
      <div className="header">
        <GrPrevious onClick={() => window.history.back()} />
        <h3>Bộ sưu tập</h3>
        <div></div>
      </div>
    </div>
  );
};
