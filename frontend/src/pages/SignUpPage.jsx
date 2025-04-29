import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth.jsx";
import SignUp from "../components/signup.jsx";
import { useToast } from "@chakra-ui/react";
import useSignUp from "../hooks/useSignUp.jsx";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { url } = useAuth();
  const { loading } = useSignUp();

  const toast = useToast();
  const [pass, showPass] = useState(false);
  const [SignUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [userName, setUserName] = useState({
    success: false,
    message: "Enter a username",
  });
  const [disabled, setDisabled] = useState(true);
  const [invalid, setInvalid] = useState({
    password: false,
    email: false,
  });

  useEffect(() => {
    if (
      SignUpData.email &&
      SignUpData.username.length >= 8 &&
      SignUpData.password.length >= 8 &&
      SignUpData.confirmPassword.length >= 8 &&
      SignUpData.firstname &&
      SignUpData.lastname &&
      SignUpData.password === SignUpData.confirmPassword &&
      userName.success
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [SignUpData]);

  useEffect(() => {
    if (SignUpData.password === SignUpData.confirmPassword) {
      setInvalid({ ...invalid, password: false });
    } else if (SignUpData === "") {
      setInvalid({ ...invalid, password: false });
    } else {
      setInvalid({ ...invalid, password: true });
    }
  }, [SignUpData]);

  useEffect(() => {
    const validateEmail = () => {
      if (SignUpData.email.includes("@") && SignUpData.email.includes(".")) {
        setInvalid({ ...invalid, email: false });
      } else if (SignUpData.email === "") {
        setInvalid({ ...invalid, email: false });
      } else {
        setInvalid({ ...invalid, email: true });
      }
    };

    const checkUsername = async () => {
      const res = await fetch(`${url}/api/users/checkusername`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignUpData),
      });
      const data = await res.json();
      setUserName(data);
    };

    validateEmail();
    checkUsername();
  }, [SignUpData]);

  const handleRegister = async () => {
    const { success, message } = await registerUser(SignUpData);

    toast({
      position: "top",
      status: success ? "success" : "error",
      title: success ? "Account created" : "",
      description: success ? "Welcome to product store" : message,
      isClosable: false,
      duration: 1500,
    });

    if (success === true) {
      setSignUpData({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/");
    }
  };

  return (
    <SignUp
      handleRegister={handleRegister}
      SignUpData={SignUpData}
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
