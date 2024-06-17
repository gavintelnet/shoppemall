import React from "react";
import { WebsiteConfigContext } from "../../context/ConfigWebsite";

export const TopBar = () => {
  const { logoHeader } = React.useContext(WebsiteConfigContext);
  return (
    <div className="top_bar">
      <div style={{ paddingLeft: "10px" }}>
        <img src={logoHeader} alt="" />
      </div>
      <div style={{ paddingRight: "10px" }}>
        <p>Bạn cần giúp đỡ?</p>
      </div>
    </div>
  );
};
