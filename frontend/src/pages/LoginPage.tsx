
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import Login from "../components/login";
import { FaLock } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useToast } from "../context/ToastContext";

function LoginPage() {
  const { loading, loginUser } = useLogin();

  const [pass, showPass] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [invalid, setInvalid] = useState({
    email: false,
    password: false,
  });
  useEffect(() => {
    if (loginData.email.includes("@") && loginData.email.includes(".")) {
      setInvalid({ ...invalid, email: false });
    } else if (loginData.email === "") {
      setInvalid({ ...invalid, email: false });
    } else {
      setInvalid({ ...invalid, email: true });
    }
  }, [loginData]);

  useEffect(() => {
    if (
      loginData.email.includes("@") &&
      loginData.email.includes(".") &&
      loginData.password.length >= 1
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [loginData]);

  const handleSignIn = async () => {
    if (!loginData.email && !loginData.password) {
      toast({
        status: "warning",
        description: "Please fill in a fields!",
      });
    }

    const { success, message } = await loginUser(loginData);

    toast({
      status: success ? "success" : "error",

      duration: 1500,
      title: message,
      icon: success ? <FaLock /> : <MdError fontSize={"20px"} />,
    });

    if (success === true) {
      setLoginData({ email: "", username: "", password: "" });
      navigate("/");
    }
  };

  return (
    <Login
      loading={loading}
      pass={pass}
      showPass={showPass}
      loginData={loginData}
      setLoginData={setLoginData}
      disabled={disabled}
      handleSignIn={handleSignIn}
      invalid={invalid}
    />
  );
}

export default LoginPage;
