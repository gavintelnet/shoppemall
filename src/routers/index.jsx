import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import LocalStorage from "../utils/LocalStorage";
import { useLoading } from "../context/useLoading";
import { Loading } from "../constants/Loading";
import { ChatContextProvider } from "../context/ChatContext";
import { getUserDetail } from "../services/user";
import {
  WebsiteConfigContext,
  WebsiteConfigProvider,
} from "../context/ConfigWebsite";
import BaoTri from "../pages/BaoTri";

// Views
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories"));
const Detail = lazy(() => import("../pages/Detail"));
const PayCheck = lazy(() => import("../pages/Paycheck"));
const Payment = lazy(() => import("../pages/Payment"));
const Account = lazy(() => import("../pages/Account"));
const History = lazy(() => import("../pages/History"));
const OrderDetail = lazy(() =>
  import("../pages/History/components/OrderDetail")
);
const Setting = lazy(() => import("../pages/Setting"));
const CreateOrder = lazy(() => import("../pages/CreateOrder"));
const Chat = lazy(() => import("../pages/Chat"));
const Address = lazy(() => import("../pages/Address"));
const Collections = lazy(() => import("../pages/Collections"));

// const NotFound = lazy(() => import('../pages/Page404'));

const routes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/detail/:_id",
    element: <Detail />,
  },
  {
    path: "/pay",
    element: <PayCheck />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/histories",
    element: <History />,
  },
  {
    path: "/order-detail",
    element: <OrderDetail />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/create-order",
    element: <CreateOrder />,
  },
  {
    path: "/cskh",
    element: <Chat />,
  },
  {
    path: "/address",
    element: <Address />,
  },
  {
    path: "/bao-tri",
    element: <BaoTri />,
  },
  {
    path: "/collections",
    element: <Collections />,
  },
  //   {
  //     path: '*',
  //     element: <NotFound />
  //   }
];

const Routers = () => {
  const { loading } = useLoading();
  const element = useRoutes(routes);
  const navigate = useNavigate();
  const isLogin = LocalStorage.get("isLogin");
  const [dataUser, setDataUser] = useState({});
  const { configWebsite, refreshData } = useContext(WebsiteConfigContext);
  const renderRouter = (el, auth) => {
    if (el && auth) {
      return element;
    }
  };
  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate("/login");
  //   }
  // }, []);
  useEffect(() => {
    if (isLogin && isLogin !== null) {
      const getUserDt = async () => {
        try {
          const rp = await getUserDetail();
          if (rp.status) {
            setDataUser(rp.result);
          } else {
            navigate("/login");
          }
        } catch (err) {}
      };
      getUserDt();
    }
  }, [isLogin]);
  useEffect(() => {
    if (configWebsite?.baoTri) {
      navigate("/bao-tri");
      refreshData();
    } else if (!isLogin) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [isLogin]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loading && <Loading />}
      <ChatContextProvider user={dataUser && dataUser}>
        {renderRouter(element, true)}
      </ChatContextProvider>
    </Suspense>
  );
};

export default Routers;
