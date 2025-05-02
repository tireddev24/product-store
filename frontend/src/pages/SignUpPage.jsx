import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth.jsx";
import SignUp from "../components/signup.jsx";
import { useToast } from "@chakra-ui/react";
import useSignUp from "../hooks/useSignUp.jsx";

const INITIAL_FORM_STATE = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const VALIDATION_RULES = {
  username: (value) => value.length >= 8,
  password: (value) => value.length >= 8,
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const { url } = useAuth();
  const { loading, registerUser } = useSignUp();

  const toast = useToast();
  const [pass, showPass] = useState(false);
  const [signUpData, setSignUpData] = useState(INITIAL_FORM_STATE);

  const [userName, setUserName] = useState({
    success: true,
    message: "Enter a username",
  });

  const [disabled, setDisabled] = useState(true);
  const [invalid, setInvalid] = useState({
    password: false,
    email: false,
  });

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
    const isEmailValid =
      signUpData.email === "" || VALIDATION_RULES.email(signUpData.email);

    setInvalid((prev) => ({ ...prev, email: !isEmailValid }));
  }, [signUpData.email]);

  const checkUsername = useCallback(async () => {
    try {
      const res = await fetch(`${url}/api/users/checkusername`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      const data = await res.json();
      setUserName(data);
    } catch (error) {
      console.error("Username check error:", error);
      setUserName({
        success: true,
        message: "Error verifying username availability.",
      });
    }
  }, [signUpData.username, url]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  useEffect(() => {
    validatePassword();
  }, [validatePassword]);

  useEffect(() => {
    validateEmail();
    if (signUpData.username) {
      checkUsername();
    }
  }, [validateEmail, checkUsername, signUpData.username]);

  const handleRegister = async () => {
    try {
      const { success, message } = await registerUser(signUpData);

      toast({
        position: "top",
        status: success ? "success" : "error",
        title: success ? "Account created" : "",
        description: success ? "Welcome to product store" : message,
        duration: 1500,
      });
      if (success) {
        success && setSignUpData(INITIAL_FORM_STATE);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        position: "top",
        status: "error",
        title: "Registration failed",
        description: "An unexpected error occurred",
        isClosable: true,
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
