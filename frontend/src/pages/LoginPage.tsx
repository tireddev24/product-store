import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, AlertOctagon } from "lucide-react";
import useLogin from "../hooks/useLogin";
import Login from "../components/login";
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
  const [invalid, setInvalid] = useState({ email: false, password: false });

  useEffect(() => {
    if (loginData.email.includes("@") && loginData.email.includes(".")) {
      setInvalid((prev) => ({ ...prev, email: false }));
    } else if (loginData.email === "") {
      setInvalid((prev) => ({ ...prev, email: false }));
    } else {
      setInvalid((prev) => ({ ...prev, email: true }));
    }
  }, [loginData.email]);

  useEffect(() => {
    setDisabled(
      !(
        loginData.email.includes("@") &&
        loginData.email.includes(".") &&
        loginData.password.length >= 1
      ),
    );
  }, [loginData]);

  const handleSignIn = async () => {
    if (!loginData.email && !loginData.password) {
      toast({ status: "warning", description: "Please fill in all fields" });
      return;
    }

    const { success, message } = await loginUser(loginData);
    toast({
      status: success ? "success" : "error",
      duration: 1500,
      title: message,
      icon: success ? (
        <Lock className="size-4" />
      ) : (
        <AlertOctagon className="size-4" />
      ),
    });

    if (success) {
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
