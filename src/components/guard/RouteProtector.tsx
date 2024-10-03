
import { useLocation, Navigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import { useEffect, useState} from "react";

import useAxiosErrorInterceptor from "../../hooks/useAxiosErrorInterceptor";
import handleAxiosError from "../../utils/handleAxiosError";

import Loader from "../Loader";

interface PropType {
  allowedRoles: number[];
  children: React.ReactNode;
}


// ✪ RouteProtector
const RouteProtector: React.FC<PropType> = ({allowedRoles,  children }) => {
  
  const location = useLocation();

  const user = useUserStore((state) => state.user);
  const user_role = useUserStore((state) => state.user_role);
  const setUserRole = useUserStore((state) => state.setUserRole);

  const axios = useAxiosErrorInterceptor()


  const [isLoading, setIsLoading] = useState<boolean>(true)


  // WARN  If I'm gonna use the axios inteceptor here, there is no need to use anywhere

  useEffect(() => {

    const fetchUserRole = async() => {
      try{
        const pk = user?.pk 
        const response = await axios.get(`/auth/userRole/${pk}/`);
        const group_id = response?.data?.id
        setUserRole(group_id)
        
      }catch(error){
        handleAxiosError(error)
      }finally{
        setIsLoading(false)
      }
    }

    if(user){
      fetchUserRole()
    }
    else{
      setIsLoading(false)
    }

  }, [ user, setUserRole]);


  return(
    <>
      {
        isLoading
          ? <Loader/>
          : allowedRoles.includes(user_role)
            ? (<>{children}</>) 
            : <Navigate to="/auth/login" state={{ from: location }} replace />
      }
    </>
  )

};


export default RouteProtector;
