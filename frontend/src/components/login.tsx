import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "../context/ThemeContext";
import Spin from "../components/spinner";
import { Button } from "./ui/Button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { cn } from "../lib/cn";

const Login = ({
  loading,
  pass,
  showPass,
  loginData,
  setLoginData,
  disabled,
  handleSignIn,
  invalid,
}) => {
  useEffect(() => {
    const signin = (e) => {
      if (e.key === "Enter" && !disabled) {
        handleSignIn();
      }
    };
    window.addEventListener("keydown", signin);

    return () => {
      window.removeEventListener("keydown", signin);
    };
  });

  const cardBg = useColorModeValue("bg-white", "bg-gray-800");

  return (
    <div className="mx-auto mt-[15vh] max-w-xl px-4">
      <div
        className={cn(
          "relative flex w-full flex-col gap-4 rounded-2xl p-6",
          cardBg,
        )}
      >
        <h3 className="gradient-text text-lg font-bold md:text-xl">
          LOGIN TO PRODUCT STORE
        </h3>
        <div className="w-sm max-w-full">
          <h4 className="text-lg font-semibold">Enter Login Details</h4>
          <div className="mx-8 flex flex-col gap-5 p-6 md:mx-0">
            <FormControl isInvalid={invalid.email}>
              <FormLabel>Email</FormLabel>
              <Input
                variant="flushed"
                type="text"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value.toLowerCase(),
                  })
                }
              />
              <FormErrorMessage>Please enter a valid email</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <div className="relative mt-[-0.5rem] w-full">
                <Input
                  variant="flushed"
                  autoComplete="current-password"
                  type={pass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <Button
                  variant="unstyled"
                  className="absolute top-0 right-[-0.5rem] z-2"
                  onClick={() => showPass((prevPass) => !prevPass)}
                  aria-label={pass ? "Hide password" : "Show password"}
                >
                  {pass ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </Button>
              </div>
            </FormControl>

            {loading ? (
              <Spin />
            ) : (
              <Button
                disabled={disabled}
                className="mt-5 w-40 font-bold"
                variant="outline"
                onClick={() => handleSignIn()}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        <div className="-mt-5 flex flex-col gap-1">
          <p>New to Product Store?</p>
          <Link to="/signup">
            <span className="gradient-text cursor-pointer text-lg font-bold underline">
              Sign up Here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
