// // HERE Approach 1

// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         auth?.roles?.find(role => allowedRoles?.includes(role))
//             ? <Outlet />
//             : auth?.accessToken //changed from user to accessToken to persist login after refresh
//                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//                 : <Navigate to="/login" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;

// import { Navigate } from "react-router-dom";
// import { useAuthServiceContext } from "../context/AuthContext";

// // HERE approach  2
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isLoggedIn } = useAuthServiceContext();
//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace={true} />;
//   }
//   console.log("test");
//   return <>{children}</>; // Wrapping children in a React fragment
// };

// export default ProtectedRoute;

import { useLocation, Navigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

interface PropType {
  children: React.ReactNode;
}
// NOTE add roles protection


// <✪> RouteProtector
const RouteProtector: React.FC<PropType> = ( {children} ) => {
  const location = useLocation();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RouteProtector;
