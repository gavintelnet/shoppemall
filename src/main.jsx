import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Routers from "./routers";
import "./scss/styles.scss";
import { LoadingProvider } from "./context/useLoading";
import { WebsiteConfigProvider } from "./context/ConfigWebsite";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LoadingProvider>
      <WebsiteConfigProvider>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </WebsiteConfigProvider>
    </LoadingProvider>
  </React.StrictMode>
);
