import React, { createContext, useContext, useEffect, useState } from "react";
import { detailSetting, getLogoHeader } from "../services/setting";
import LocalStorage from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";

export const WebsiteConfigContext = createContext();

export const WebsiteConfigProvider = ({ children }) => {
  const [logoHeader, setLogoHeader] = useState(undefined);
  const [configWebsite, setConfigWebsite] = useState(undefined);
  const isLogin = LocalStorage.get("isLogin");
  //   const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [detailLogoHeader, rpSetting] = await Promise.all([
        getLogoHeader("6656784a2de1279e93bcc91a"),
        detailSetting("666e3adaf9d438d9e634555f"),
      ]);
      if (detailLogoHeader.status) {
        setLogoHeader(detailLogoHeader.result.images.url);
      }
      if (rpSetting.status) {
        setConfigWebsite(rpSetting.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };
  //   useEffect(() => {
  //     if (!isLogin) {
  //       navigate("/login");
  //     }
  //   }, [isLogin]);
  return (
    <WebsiteConfigContext.Provider
      value={{ logoHeader, configWebsite, refreshData }}
    >
      {children}
    </WebsiteConfigContext.Provider>
  );
};
