import { create } from "zustand";

// Function to get the initial value for isLoggedIn from localStorage
const getInitialLoggedInValue = (): boolean => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  return loggedIn === "true"; // Return true if the value is "true"
};


interface User {
  email: string;
  first_name: string;
  last_name: string;
  pk: number;
  user_group: number;
}

interface UserStore {
  user: null | User;
  isLoggedIn: boolean;
  setActiveUser: (userData: User) => void;
  removeActiveUser: () => void;
}

// Zustand store
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: getInitialLoggedInValue(), // Dynamically set initial value

  setActiveUser: (userData) => {
    set({ user: userData, isLoggedIn: true });
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  },

  removeActiveUser: () => {
    set({ user: null, isLoggedIn: false });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
  },
}));