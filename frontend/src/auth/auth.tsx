import { createContext, useContext, useEffect, useState } from "react";
import { SERVER_URI as url } from "../utils/secrets";

export interface AuthContextType {
  isAuthenticated: null | boolean;
  login: (newData: any) => void;
  logout: () => void;
  updateProfile: (
    updates: any,
  ) => Promise<{ success: boolean; message: string }>;
  userData: null | any;
  url: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const storedData = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("user_data") || "") || null;
    } catch (error) {
      console.error("Error parsing user data from sessionStorage:", error);
      return null;
    }
  })();

  useEffect(() => {
    if (storedData) {
      const { user } = storedData;
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newData: any) => {
    sessionStorage.setItem(
      "user_data",
      JSON.stringify({
        user: newData,
      }),
    );

    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("user_data");
    setUserData(null);
    setIsAuthenticated(false);
    setTimeout(() => {
      window.location.replace("/");
    }, 850);
  };

  const updateProfile = async (updates: any) => {
    try {
      const res = await fetch(`${url}/api/users/update`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      login(data.user);

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Unable to communicate with server" };
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, updateProfile, userData, url }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
