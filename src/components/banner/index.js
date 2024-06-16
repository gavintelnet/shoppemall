import React, { useEffect } from "react";
import { useLoading } from "../../context/useLoading";
import { getBanner, getBannerFooter, getLogoHeader } from "../../services/banner";

export const Banner = (setSearch) => {
  const [banner, setBanner] = React.useState([]);
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    getBanner()
      .then((res) => {
        setBanner(
          res.result.map((item) => ({
            ...item,
            key: item._id,
          }))
          );
          // setActiveTab(res.result[0].category._id)
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { banner };
};

export const BannerFooter = () => {
  const [bannerFooter, setBanner] = React.useState();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    getBannerFooter()
      .then((res) => {
        setBanner({...res.result, key:res.result._id});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { bannerFooter };
};
export const LogoHeader = () => {
  const [logoHeader, setBanner] = React.useState();
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    getLogoHeader()
      .then((res) => {
        setBanner({...res.result, key:res.result._id});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { logoHeader };
};