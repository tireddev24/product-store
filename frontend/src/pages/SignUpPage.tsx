import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../components/signup";
import useSignUp from "../hooks/useSignUp";
import { SERVER_URI as url } from "../lib/secrets";
import { useToast } from "../context/ToastContext";

const INITIAL_FORM_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const VALIDATION_RULES = {
  username: (value: string) => value.length >= 8,
  password: (value: string) => value.length >= 8,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const { loading, registerUser } = useSignUp();
  const toast = useToast();
  const [pass, showPass] = useState(false);
  const [signUpData, setSignUpData] = useState(INITIAL_FORM_STATE);

  const [userName, setUserName] = useState({
    success: true,
    message: "Enter a username",
  });
  const [userNames, setUserNames] = useState<string[]>([]);

  useEffect(() => {
    const getUsernames = async () => {
      try {
        const res = await fetch(`${url}/api/users/checkusername`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setUserNames(data.usernames ?? []);
      } catch (e) {
        console.error(e);
      }
    };
    getUsernames();
  }, []);

  useEffect(() => {
    const exists = userNames.includes(signUpData.username);
    if (signUpData.username.length === 0) {
      setUserName({ success: false, message: "Username is required" });
    } else if (signUpData.username.length < 8) {
      setUserName({ success: false, message: "Minimum 8 characters" });
    } else if (exists) {
      setUserName({ success: false, message: "Username already taken" });
    } else {
      setUserName({ success: true, message: "Username is available" });
    }
  }, [signUpData.username, userNames]);

  const [disabled, setDisabled] = useState(true);
  const [invalid, setInvalid] = useState({ password: false, email: false });

  const validateForm = useCallback(() => {
    const isValid =
      signUpData.email &&
      VALIDATION_RULES.username(signUpData.username) &&
      VALIDATION_RULES.password(signUpData.password) &&
      signUpData.password === signUpData.confirmPassword &&
      signUpData.firstname &&
      signUpData.lastname &&
      userName.success;
    setDisabled(!isValid);
  }, [signUpData, userName.success]);

  const validatePassword = useCallback(() => {
    const isPasswordValid =
      (signUpData.password !== "" || signUpData.confirmPassword !== "") &&
      signUpData.password === signUpData.confirmPassword;
    signUpData.password.length > 0 || signUpData.confirmPassword.length > 0
      ? setInvalid((prev) => ({ ...prev, password: !isPasswordValid }))
      : setInvalid((prev) => ({ ...prev, password: false }));
  }, [signUpData.password, signUpData.confirmPassword]);

  const validateEmail = useCallback(() => {
    const isEmailValid = signUpData.email === "" || VALIDATION_RULES.email(signUpData.email);
    setInvalid((prev) => ({ ...prev, email: !isEmailValid }));
  }, [signUpData.email]);

  useEffect(validateForm, [validateForm]);
  useEffect(validatePassword, [validatePassword]);
  useEffect(validateEmail, [validateEmail]);

  const handleRegister = async () => {
    try {
      const { success, message } = await registerUser(signUpData);
      toast({
        status: success ? "success" : "error",
        title: success ? "Account created" : "",
        description: success ? "Welcome to Maison" : message,
        duration: 1500,
      });
      if (success) {
        setSignUpData(INITIAL_FORM_STATE);
        navigate("/");
      }
    } catch (error) {
      toast({
        status: "error",
        title: "Registration failed",
        description: "An unexpected error occurred",
        duration: 2000,
      });
    }
  };

  return (
    <SignUp
      handleRegister={handleRegister}
      SignUpData={signUpData}
      setSignUpData={setSignUpData}
      disabled={disabled}
      invalid={invalid}
      loading={loading}
      pass={pass}
      showPass={showPass}
      userName={userName}
    />
  );
};

export default SignUpPage;
