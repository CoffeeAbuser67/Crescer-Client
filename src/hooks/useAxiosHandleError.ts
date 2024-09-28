import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


import { axiosPrivate } from "../api/axios";


// {●} handleAxiosError
const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with a status code other than 2xx
      console.error("Response Error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          toast.error("Unauthorized. Please log in.");
          break;
        case 500:
          toast.error("Internal server error. Please try again later.");
          break;
        default:
          toast.error(`Server Error: ${error.response.status}`);
      }
    } else if (error.request) {
      // Request was made but no response was received (Network or timeout issue)
      if (error.code === "ECONNABORTED") {
        console.error("Network Timeout Error:", error.message);
        toast.error("Request timed out. Please try again.");
      } else if (!navigator.onLine) {
        console.error("Network Error: The device is offline.");
        toast.error("You are offline. Check your network connection.");
      } else {
        console.error("Network Error:", error.request);
        toast.error("Network error. Please try again.");
      }
    } else {
      // Something happened in setting up the request
      console.error("Axios Error:", error.message);
      toast.error("An error occurred. Please try again.");
    }

    console.error("Request Config:", error.config);
  } else if (error instanceof Error) {
    console.error("Non-Axios Error:", error.message);
    toast.error("An error occurred. Please try again.");
  } else {
    console.error("An unexpected error occurred.");
    toast.error("An unexpected error occurred.");
  }
}; 


// {✪} useAxiosHandleError
const useAxiosHandleError = () => {

  useEffect(() => {
    // Set up interceptors
    const errorResponseInterceptor = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        // {○} handleAxiosError
        handleAxiosError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(errorResponseInterceptor);
    };
  }, []);

  return axiosPrivate
}


export default useAxiosHandleError

