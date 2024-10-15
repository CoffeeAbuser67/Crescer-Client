/* eslint-disable react-refresh/only-export-components */

import { lazy } from "@loadable/component";
import Default from "./layouts/Default";
import AuthLayout from "./layouts/Auth";
import RouteProtector from "./components/guard/RouteProtector";

const Home = lazy(() => import("./pages/home/Home"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Login = lazy(() => import("./pages/auth/Login"));
const Temp = lazy(() => import("./pages/Temp"));
// . . . . . . . . . ➤

const ROLES = {
  User: 3,
  Staff: 2,
  Admin: 1,
  AnyRole: 0,
};
// . . . . . . . . . ➤

const routes = [
  {
    path: "/",
    element: (
      <RouteProtector allowedRoles={[ROLES.Staff, ROLES.User, ROLES.Admin]}>
        <Default />
      </RouteProtector>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      
      {
        path: "settings",
        element: (
          <RouteProtector allowedRoles={[ROLES.Staff, ROLES.User, ROLES.Admin]}>
            <Settings />,
          </RouteProtector>
        ),
      },

      {
        path: "temp",
        element: (
          <RouteProtector allowedRoles={[ROLES.Staff, ROLES.User, ROLES.Admin]}>
            <Temp />
          </RouteProtector>
        ),
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
