import React from "react";
import { SearchTopBar } from "./components/SearchTopBar";
import { Refund20 } from "./components/Refund20";
import { Refund30 } from "./components/Refund30";
import { Refund40 } from "./components/Refund40";
import { Refund50 } from "./components/Refund50";
import { Refund60 } from "./components/Refund60";
import { Refund70 } from "./components/Refund70";
import { Footer } from "./components/Footer";
import { Banner } from "../../components/banner";

export default () => {
  const { banner } = Banner();

  return (
    <div className="home_container">
      <div>
        <SearchTopBar />
        {banner.length > 0
          ? banner.map((item, index) => (
              <>
                {/* <Refund20 banner={banner[index]} /> */}
                {/* <Refund30 banner={banner[5]} />
                <Refund40 banner={banner[1]} />
                <Refund50 banner={banner[3]} />
                <Refund60 banner={banner[4]} />
                <Refund60 banner={banner[2]} /> */}
                <Refund70 banner={item} />
              </>
            ))
          : null}
      </div>
      <Footer />
    </div>
  );
};
