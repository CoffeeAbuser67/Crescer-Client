import { axiosDefault } from "./axios";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

interface Credentials {
  email: string;
  password: string;
}

// {✪} useAuthService
const useAuthService = () => {

  const navigate = useNavigate()
  const setActiveUser = useUserStore((state) => state.setActiveUser);
  const removeActiveUser = useUserStore((state) => state.removeActiveUser);

  // {●} login
  const login = async (values: Credentials) => {

    console.log("values  inside login service✉ :", values); // [LOG] ✉

    try {
      const response = await axiosDefault.post("/auth/login/", values);
      const user = response?.data?.user;
      setActiveUser(user);
    } catch (error) {
      return Promise.reject(error);
    }

  }; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .


  // {●} tryRefreshToken
  const tryRefreshToken = async () => {
    try {
      const response = await axiosDefault.post(
        "/auth/token/refresh/",
        {},
        {
          withCredentials: true,
        }
      );
      return response?.status === 200;

    } catch (error) {
      return Promise.reject(error);
    }
  }; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

  // {●} logout
  const logout = async () => {
    try {

      removeActiveUser();
      await axiosDefault.post(
        "/auth/logout/",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/auth/login");
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { tryRefreshToken, logout, login };
};

export default useAuthService;

