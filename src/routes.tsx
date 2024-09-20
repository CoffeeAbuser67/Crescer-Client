/* eslint-disable react-refresh/only-export-components */

import { lazy } from "@loadable/component";
import Default from "./layouts/Default";


const Home = lazy(() => import("./pages/home/Home"));
const Settings = lazy(() => import("./pages/settings/Settings"));

// . . . . . . . . . ➤
const routes = [
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },

    ],
  },
];

export default routes;




