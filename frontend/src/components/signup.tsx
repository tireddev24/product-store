import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spin from "@/components/ui/Spinner";

import { Button } from "./ui/Button";
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "./ui/Form";
import { Input } from "./ui/Input";
import { Kicker } from "./ui/Layout";
import { cn } from "../lib/cn";

type SignUpProps = {
  SignUpData: any;
  disabled: boolean;
  invalid: { email: boolean; password: boolean };
  handleRegister: () => void;
  loading: boolean;
  pass: boolean;
  showPass: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpData: (d: any) => void;
  userName: { success: boolean; message: string };
};

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
}: SignUpProps) => {
  useEffect(() => {
    const signUp = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !disabled) handleRegister();
    };
    window.addEventListener("keydown", signUp);
    return () => window.removeEventListener("keydown", signUp);
  });

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-2xl items-center px-6 py-12">
      <div className="w-full border border-hairline bg-noir-2 p-8 md:p-10">
        <div className="mb-8 flex flex-col gap-3 border-b border-hairline pb-6">
          <Kicker>Create account</Kicker>
          <h1 className="display-serif text-2xl md:text-3xl">
            Join <span className="text-gold">Maison</span>.
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormControl>
            <FormLabel>First name</FormLabel>
            <Input
              variant="flushed"
              placeholder="First name"
              required
              value={SignUpData.firstname}
              onChange={(e) => setSignUpData({ ...SignUpData, firstname: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input
              variant="flushed"
              placeholder="Last name"
              type="text"
              required
              value={SignUpData.lastname}
              onChange={(e) => setSignUpData({ ...SignUpData, lastname: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              variant="flushed"
              placeholder="Username"
              type="text"
              value={SignUpData.username}
              onChange={(e) => setSignUpData({ ...SignUpData, username: e.target.value })}
            />
            {SignUpData.username && (
              <FormHelperText
                className={cn(
                  userName.success
                    ? "text-[color:var(--color-success)]"
                    : "text-[color:var(--color-danger)]",
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
              placeholder="you@studio.com"
              value={SignUpData.email}
              onChange={(e) =>
                setSignUpData({
                  ...SignUpData,
                  email: e.target.value.toLowerCase(),
                })
              }
            />
            {invalid.email && <FormErrorMessage>Please enter a valid email</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={invalid.password}>
            <FormLabel>Password</FormLabel>
            <div className="relative w-full">
              <Input
                variant="flushed"
                placeholder="••••••••"
                type={pass ? "text" : "password"}
                value={SignUpData.password}
                minLength={8}
                maxLength={16}
                required
                className="pr-10"
                onChange={(e) => setSignUpData({ ...SignUpData, password: e.target.value })}
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
            <FormHelperText>Minimum 8 characters</FormHelperText>
          </FormControl>

          <FormControl isInvalid={invalid.password}>
            <FormLabel>Confirm password</FormLabel>
            <div className="relative w-full">
              <Input
                variant="flushed"
                placeholder="••••••••"
                type={pass ? "text" : "password"}
                value={SignUpData.confirmPassword}
                minLength={8}
                maxLength={16}
                required
                className="pr-10"
                onChange={(e) =>
                  setSignUpData({
                    ...SignUpData,
                    confirmPassword: e.target.value,
                  })
                }
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
            {invalid.password && <FormErrorMessage>Passwords do not match</FormErrorMessage>}
          </FormControl>
        </div>

        {loading ? (
          <div className="mt-8">
            <Spin />
          </div>
        ) : (
          <Button
            disabled={disabled}
            variant="primary"
            className="mt-8 w-full"
            onClick={handleRegister}
          >
            Create account
          </Button>
        )}

        <div className="mt-8 border-t border-hairline pt-6 text-center">
          <p className="text-[11px] uppercase tracking-widest text-mute">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="hover-underline mt-2 inline-block text-sm font-semibold text-gold"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
