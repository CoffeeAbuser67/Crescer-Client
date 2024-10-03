/* eslint-disable react-refresh/only-export-components */

import { lazy } from "@loadable/component";
import Default from "./layouts/Default";
import AuthLayout from "./layouts/Auth";
import RouteProtector from "./components/guard/RouteProtector";

const Home = lazy(() => import("./pages/home/Home"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Login = lazy(() => import("./pages/auth/Login"));




// . . . . . . . . . ➤

const ROLES = {

  'User': 3,
  'Staff': 2,
  'Admin': 1,
  'AnyRole':0 
}
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
