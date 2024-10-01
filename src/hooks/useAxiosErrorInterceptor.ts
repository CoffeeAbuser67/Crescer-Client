import { useEffect } from "react";

import { axiosPrivate} from "../utils/axios";
import { useTimerStore } from "../store/timerStore";

import useAuthService from "../utils/authService";



// {✪} useAxiosErrorInterceptor
const useAxiosErrorInterceptor = () => {


  const {tryRefreshToken} = useAuthService()

  // WARN Consume TimerStore remove in production
  const resetTimer = useTimerStore((state) => state.resetTimer)

  useEffect(() => {
    // Set up interceptors
    const errorResponseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        
        try{

          const originalRequest = error?.config;
          const status = error?.response?.status;
  
          if (status === 401) {
            // {○} tryRefreshToken
            const isTokenRefreshed = await tryRefreshToken()
          
            if (isTokenRefreshed){
              resetTimer() // WARN Remove this in production
              console.log('Authentication Refreshed') //[LOG] Authentication Refreshed  
              return axiosPrivate(originalRequest)
            }
          }

        }catch(error){
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(errorResponseInterceptor);
    };
  }, []);

  return axiosPrivate;
};


export default useAxiosErrorInterceptor;
