import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Home,
  Moon,
  PlusSquare,
  ShoppingCart,
  Sun,
  Unlock,
} from "lucide-react";
import { useAuth } from "../auth/auth";
import { useCartStore } from "../store/product";
import useLogout from "../hooks/useLogout";
import { useColorMode, useColorModeValue } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { Avatar, AvatarBadge } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { cn } from "../lib/cn";

type NavbarProps = {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ show = false, setShow = () => {} }: NavbarProps) => {
  const { isAuthenticated, userData, logout } = useAuth();
  const { logoutUser } = useLogout();
  const { cart, fetchCart } = useCartStore();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();
  const [path, setPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const getCart = async () => {
        const { success, message, res } = await fetchCart();
        if (!success && res && (res === 401 || res === 400)) {
          toast({
            status: "error",
            description: message,
          });
          await logout();
          navigate("/login");
        }
        cart && setCount(cart.length);
      };
      getCart();
    }
  }, [isAuthenticated, cart && cart.length]);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  const handleLogOut = async () => {
    await logoutUser();

    toast({
      status: "info",
      icon: <Unlock className="size-4" />,
      title: "Logged Out",
      duration: 2500,
    });

    navigate("/");
  };

  const dropdown = useColorModeValue("bg-gray-300", "bg-gray-700");

  const mobileMenu = (
    <>
      <Button
        onClick={toggleColorMode}
        className="min-w-26 md:hidden"
        variant="default"
      >
        {colorMode === "light" ? (
          <Moon className="size-5" />
        ) : (
          <Sun className="size-5" />
        )}
      </Button>

      {!path.includes("login") && !isAuthenticated && (
        <Link to="/login" onClick={() => setShow(false)}>
          <Button className="min-w-26 sm:hidden" variant="cyan">
            Login
          </Button>
        </Link>
      )}

      {!path.includes("signup") && !isAuthenticated && (
        <Link to="/signup" onClick={() => setShow(false)}>
          <Button className="min-w-26 sm:hidden" variant="default">
            Sign up
          </Button>
        </Link>
      )}

      {isAuthenticated && (
        <>
          <Link to="/" onClick={() => setShow(false)}>
            <Button className="min-w-26" variant="cyan">
              Home
            </Button>
          </Link>
          <Link to="/fav" onClick={() => setShow(false)}>
            <Button className="min-w-26" variant="purple">
              Favourites
            </Button>
          </Link>
          <Link to="/viewcart" onClick={() => setShow(false)}>
            <Button className="min-w-26" variant="yellow">
              View Cart
            </Button>
          </Link>
          <Link to="/profile" onClick={() => setShow(false)}>
            <Button className="min-w-26" variant="blue">
              Profile
            </Button>
          </Link>
          <Button
            className="min-w-26 hover:underline"
            variant="red"
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </>
      )}
    </>
  );

  return (
    <div className="w-full px-4">
      <div className="flex h-16 shrink-0 items-center justify-between">
        <p className="gradient-text mx-[-0.5rem] text-[26px] font-bold uppercase sm:text-[28px] lg:text-[32px]">
          <Link to="/">Product Store</Link>
        </p>

        <div className="mx-2 flex items-center gap-2 sm:mx-0">
          <Link to="/">
            <Button className="hidden md:inline-flex" variant="default">
              <Home className="size-5" />
            </Button>
          </Link>

          {isAuthenticated && (
            <Link to="/fav">
              <Button className="hidden md:inline-flex" variant="default">
                <Heart className="size-5 fill-current" />
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <Link to="profile/create">
              <Button className="hidden md:inline-flex" variant="default">
                <PlusSquare className="size-5" />
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <Link to="viewcart">
              <Button
                className="relative hidden bg-red-600 text-white md:inline-flex"
                variant="red"
              >
                <ShoppingCart className="size-5" />
                <span
                  className={cn(
                    "absolute -top-3 -right-2 flex size-[22px] items-center justify-center rounded-full text-xs font-bold",
                    dropdown,
                  )}
                >
                  {count}
                </span>
              </Button>
            </Link>
          )}

          {!path.includes("signup") && !isAuthenticated && (
            <Link to="/signup">
              <Button
                className="hidden min-w-26 hover:underline md:inline-flex"
                variant="default"
              >
                Sign up
              </Button>
            </Link>
          )}

          {!path.includes("login") && !isAuthenticated && (
            <Link to="/login">
              <Button
                className="hidden min-w-26 hover:underline sm:inline-flex"
                variant="cyan"
              >
                Login
              </Button>
            </Link>
          )}

          <Button
            onClick={toggleColorMode}
            className="hidden md:inline-flex"
            variant="default"
          >
            {colorMode === "light" ? (
              <Moon className="size-5" />
            ) : (
              <Sun className="size-5" />
            )}
          </Button>

          {isAuthenticated && (
            <Button
              className="hidden hover:underline sm:inline-flex"
              variant="red"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          )}

          <div className="relative">
            <div
              className="block sm:hidden"
              onClick={() => setShow((prevShow) => !prevShow)}
            >
              {isAuthenticated && userData._id ? (
                <Avatar
                  size="md"
                  name={`${userData.firstname} ${userData.lastname}`}
                  className="z-2"
                >
                  <AvatarBadge bg={!navigator.onLine ? "green.500" : "red.400"} />
                </Avatar>
              ) : (
                <Avatar size="md" name="" className="z-2" />
              )}
            </div>

            <div className="hidden sm:block">
              {isAuthenticated && userData._id ? (
                <Link to="/profile">
                  <Avatar
                    size="md"
                    name={`${userData.firstname} ${userData.lastname}`}
                    className="z-2 sm:size-10"
                  >
                    <AvatarBadge bg={!navigator.onLine ? "green.500" : "red.400"} />
                  </Avatar>
                </Link>
              ) : (
                <Avatar size="md" name="" className="z-2 sm:size-10" />
              )}
            </div>

            <div
              className={cn(
                "absolute right-2 z-2 w-40 rounded-md sm:hidden",
                dropdown,
                show ? "block" : "hidden",
              )}
            >
              <div className="my-5 flex flex-col items-center gap-2">
                {mobileMenu}
              </div>
            </div>

            {isAuthenticated && (
              <div
                className={cn(
                  "absolute right-2 z-2 hidden w-40 rounded-md lg:hidden",
                  dropdown,
                  show ? "block sm:block" : "hidden",
                )}
              >
                <div className="my-5 flex flex-col items-center gap-2">
                  {mobileMenu}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
