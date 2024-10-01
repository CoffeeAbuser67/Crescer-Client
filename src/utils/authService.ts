import { axiosDefault } from "./axios";
import { useUserStore } from "../store/userStore";

interface Credentials {
  email: string;
  password: string;
}

// {✪} useAuthService
const useAuthService = () => {


  const setActiveUser = useUserStore((state) => state.setActiveUser);
  

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
      const response = await axiosDefault.post(
        "/auth/logout/",
        {},
        {
          withCredentials: true,
        }
      );

      return response.status;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { tryRefreshToken, logout, login };
};

export default useAuthService;

//   // {●} login
//   login: async (credentials: Credentials) => {
//     try {
//       const response = await axios.post('/auth/login/', credentials);
//       console.log('Response Data:', response.data);
//       set({ isAuthenticated: true });
//       toast.success('Login successful');

//     } catch (error) {
//       console.error('Login failed', error);
//       toast.error('Login failed');
//     }
//   },

// // {●} login
//   export const useLogin = async (credentials : Credentials) => {

//     const url = "/auth/login/";
//     const response = await axiosDefault.post(url, credentials);
//     console.log("Response Data:", response.data); // [LOG]
//     toast.success("Request successful");
//   }; // . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
