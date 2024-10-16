import { useLocation, Navigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useEffect, useState } from "react";

import useAxiosErrorInterceptor from "../../hooks/useAxiosErrorInterceptor";
import handleAxiosError from "../../utils/handleAxiosError";

import Loader from "../Loader";

interface PropType {
  allowedRoles: number[];
  children: React.ReactNode;
}


const Custom_loader = () => (
  <div id="custom_loader" className="relative h-screen">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Loader/>
    </div>
  </div>
);


// WARN some problems here, no need to use pk 


// ✪ RouteProtector
const RouteProtector: React.FC<PropType> = ({ allowedRoles, children }) => {
  const location = useLocation();

  const user = useUserStore((state) => state.user);
  const user_role = useUserStore((state) => state.user_role);
  const setUserRole = useUserStore((state) => state.setUserRole);
  const axios = useAxiosErrorInterceptor();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // const pk = user?.pkid;
        const response = await axios.get(`/auth/userRole/`);
        const group_id = response?.data?.id;
        setUserRole(group_id);
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserRole();
    } else {
      setIsLoading(false);
    }
  }, [user, setUserRole, axios]);

  return (
    <>
      {isLoading ? (
        <Custom_loader />
      ) : allowedRoles.includes(user_role) ? (
        <>{children}</>
      ) : (
        <Navigate to="/auth/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RouteProtector;
