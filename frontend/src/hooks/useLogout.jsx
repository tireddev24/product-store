import { useState } from "react";
import { useAuth } from "../auth/auth";

const useLogout = () => {
  const { logout, url } = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const logoutUser = async () => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch(`${url}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res) {
        setError("An unexpected error occured!");
        return { success: false, message: "An unexpected error occured!" };
      }

      const data = await res.json();

      if (res.status === 400) {
        return { success: data.success, message: data.message };
      }

      if (res.status === 404) {
        return {
          success: data.success,
          message: "You are not permitted to perform this action!",
        };
      }

      await logout();
      return { success: data.success, message: data.message };
    } catch (error) {
      setError(error.message);
      console.error(error);
      return { success: false, message: "Unable to communicate with server" };
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    logoutUser,
  };
};

export default useLogout;
