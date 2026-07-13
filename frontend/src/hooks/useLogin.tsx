import { useState } from "react";
import { useAuth } from "../auth/auth";

const useLogin = () => {
  const { login, url } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const loginUser = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!res) {
        setError("An unexpected error occured!");
        return { success: false, message: "An unexpected error occured!" };
      }

      const data = await res.json();

      if (res.status === 429) {
        setError("Too Many Login Attempts");
        return {
          success: false,
          message: "Too many login attempts. Please Try again later",
        };
      }

      if (res.status === 200) {
        login(data.user);

        return { success: data.success, message: data.message };
      } else if (res.status === 404) {
        setError(data.message);

        return { success: data.success, message: data.message };
      } else if (res.status === 401) {
        return { success: data.success, message: data.message };
      } else {
        return { success: data.success, message: "Login failed!" };
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      return { success: false, message: "Unable to communicate with server" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
};

export default useLogin;
