/* eslint-disable react-refresh/only-export-components */

import { lazy } from "@loadable/component";
import Default from "./layouts/Default";
import AuthLayout from "./layouts/Auth";
import RoutesProtector from "./components/RoutesProtector";



const Home = lazy(() => import("./pages/home/Home"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Login = lazy(() => import("./pages/auth/Login"));


// . . . . . . . . . ➤
const routes = [

  {
    path: "/",
    element: (<RoutesProtector> <Default /> </RoutesProtector>),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },

    ],
  },

  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },




];

export default routes;




