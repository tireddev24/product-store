import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "../context/ThemeContext";
import Spin from "../components/spinner";
import { Button } from "./ui/Button";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { cn } from "../lib/cn";

const SignUp = ({
  SignUpData,
  disabled,
  invalid,
  handleRegister,
  loading,
  pass,
  showPass,
  setSignUpData,
  userName,
}) => {
  useEffect(() => {
    const signUp = (e) => {
      if (e.key === "Enter" && !disabled) {
        handleRegister();
      }
    };
    window.addEventListener("keydown", signUp);

    return () => {
      window.removeEventListener("keydown", signUp);
    };
  });

  const cardBg = useColorModeValue("bg-white", "bg-gray-800");

  return (
    <div className="mx-auto mt-8 max-w-2xl md:mt-[15vh]">
      <div className={cn("flex flex-col gap-4 rounded-2xl p-4", cardBg)}>
        <h2 className="gradient-text my-1 text-lg font-bold md:text-xl">
          Sign up to Product Store
        </h2>

        <div className="mt-2 grid min-w-68 grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10">
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              variant="flushed"
              placeholder="Enter your first name"
              required
              value={SignUpData.firstname}
              onChange={(e) =>
                setSignUpData({ ...SignUpData, firstname: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              variant="flushed"
              placeholder="Enter your last name"
              type="text"
              required
              value={SignUpData.lastname}
              onChange={(e) =>
                setSignUpData({ ...SignUpData, lastname: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              variant="flushed"
              placeholder="Enter your user name"
              type="text"
              value={SignUpData.username}
              onChange={(e) => {
                setSignUpData({ ...SignUpData, username: e.target.value });
              }}
            />
            {SignUpData.username && (
              <FormHelperText
                className={cn(
                  "ml-1 font-mono font-bold break-keep",
                  userName.success ? "text-green-600" : "text-red-500",
                )}
              >
                {userName.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isInvalid={invalid.email}>
            <FormLabel>Email</FormLabel>
            <Input
              variant="flushed"
              type="email"
              placeholder="Enter your email"
              value={SignUpData.email}
              onChange={(e) =>
                setSignUpData({
                  ...SignUpData,
                  email: e.target.value.toLowerCase(),
                })
              }
            />
            <FormErrorMessage className="-mb-5">
              Please enter a valid email!
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={invalid.password}>
            <FormLabel>Password</FormLabel>
            <div className="relative w-full">
              <Input
                variant="flushed"
                placeholder="Enter your password"
                type={pass ? "text" : "password"}
                value={SignUpData.password}
                minLength={8}
                maxLength={16}
                required
                onChange={(e) =>
                  setSignUpData({ ...SignUpData, password: e.target.value })
                }
              />
              <Button
                variant="unstyled"
                className="absolute top-0 right-0 z-2"
                onClick={() => showPass((prevPass) => !prevPass)}
                aria-label={pass ? "Hide password" : "Show password"}
              >
                {pass ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </Button>
            </div>
            <FormHelperText className="float-left ml-1">
              Password must be up to 8 characters
            </FormHelperText>
          </FormControl>

          <FormControl isInvalid={invalid.password}>
            <FormLabel>Confirm Password</FormLabel>
            <div className="relative w-full">
              <Input
                variant="flushed"
                placeholder="Confirm your password"
                type={pass ? "text" : "password"}
                value={SignUpData.confirmPassword}
                minLength={8}
                maxLength={16}
                required
                onChange={(e) =>
                  setSignUpData({
                    ...SignUpData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <Button
                variant="unstyled"
                className="absolute top-0 right-0 z-2"
                onClick={() => showPass((prevPass) => !prevPass)}
                aria-label={pass ? "Hide password" : "Show password"}
              >
                {pass ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </Button>
            </div>
            <FormErrorMessage className="ml-1">
              Passwords do not match!
            </FormErrorMessage>
          </FormControl>
        </div>

        {loading ? (
          <Spin />
        ) : (
          <Button
            disabled={disabled}
            variant="outline"
            className="mt-5"
            onClick={handleRegister}
          >
            Sign up
          </Button>
        )}

        <div className="my-5 flex flex-col gap-1">
          <p>Already have an account?</p>
          <Link to="/login">
            <span className="gradient-text cursor-pointer text-lg font-bold underline">
              Login Here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
