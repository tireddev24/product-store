import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spin from "../components/spinner";
import { Button } from "./ui/Button";
import { FormControl, FormErrorMessage, FormLabel } from "./ui/Form";
import { Input } from "./ui/Input";
import { Kicker } from "./ui/Layout";

type LoginProps = {
  loading: boolean;
  pass: boolean;
  showPass: React.Dispatch<React.SetStateAction<boolean>>;
  loginData: { email: string; username: string; password: string };
  setLoginData: (d: any) => void;
  disabled: boolean;
  handleSignIn: () => void;
  invalid: { email: boolean; password: boolean };
};

const Login = ({
  loading,
  pass,
  showPass,
  loginData,
  setLoginData,
  disabled,
  handleSignIn,
  invalid,
}: LoginProps) => {
  useEffect(() => {
    const signin = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !disabled) handleSignIn();
    };
    window.addEventListener("keydown", signin);
    return () => window.removeEventListener("keydown", signin);
  });

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center px-6 py-12">
      <div className="w-full border border-hairline bg-noir-2 p-8 md:p-10">
        <div className="mb-8 flex flex-col gap-3 border-b border-hairline pb-6">
          <Kicker>Login</Kicker>
          <h1 className="display-serif text-2xl md:text-3xl">
            Welcome <span className="text-gold">back</span>.
          </h1>
          <p className="text-xs uppercase tracking-widest text-mute">Enter your credentials</p>
        </div>

        <div className="flex flex-col gap-5">
          <FormControl isInvalid={invalid.email}>
            <FormLabel>Email</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="you@studio.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value.toLowerCase(),
                })
              }
            />
            {invalid.email && <FormErrorMessage>Please enter a valid email</FormErrorMessage>}
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <div className="relative w-full">
              <Input
                variant="flushed"
                autoComplete="current-password"
                type={pass ? "text" : "password"}
                placeholder="••••••••"
                value={loginData.password}
                className="pr-10"
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => showPass((prev) => !prev)}
                className="absolute top-1/2 right-0 -translate-y-1/2 p-2 text-mute transition hover:text-gold"
                aria-label={pass ? "Hide password" : "Show password"}
              >
                {pass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </FormControl>

          {loading ? (
            <Spin />
          ) : (
            <Button
              disabled={disabled}
              className="mt-3 w-full"
              variant="primary"
              onClick={handleSignIn}
            >
              Login
            </Button>
          )}
        </div>

        <div className="mt-8 border-t border-hairline pt-6 text-center">
          <p className="text-[11px] uppercase tracking-widest text-mute">New to Product Store?</p>
          <Link
            to="/signup"
            className="hover-underline mt-2 inline-block text-sm font-semibold text-gold"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
