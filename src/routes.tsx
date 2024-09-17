
import { lazy } from "@loadable/component";
import Default from "./layouts/Default";


// eslint-disable-next-line react-refresh/only-export-components
const Home = lazy(() => import("./pages/home/Home"));


// . . . . . . . . . ➤
const routes = [
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];

export default routes;




