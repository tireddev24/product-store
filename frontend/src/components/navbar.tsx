import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Home,
  LogOut,
  Menu,
  PlusSquare,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../auth/auth";
import { useCartStore } from "../store/product";
import useLogout from "../hooks/useLogout";
import { useToast } from "../context/ToastContext";
import { Button } from "./ui/Button";
import { cn } from "../lib/cn";

type NavbarProps = {
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ show = false, setShow = () => {} }: NavbarProps) => {
  const func = useAuth();
  const isAuthenticated = func?.isAuthenticated;
  const userData = func?.userData;
  const logout = func?.logout!;

  const { logoutUser } = useLogout();
  const { cart, fetchCart } = useCartStore();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (!isAuthenticated) return;
    const getCart = async () => {
      const { success, message, res } = await fetchCart();
      if (!success && res && (res === 401 || res === 400)) {
        toast({ status: "error", description: message });
        await logout();
        navigate("/login");
      }
      cart && setCount(cart.length);
    };
    getCart();
  }, [isAuthenticated, cart?.length]);

  const handleLogOut = async () => {
    await logoutUser();
    toast({
      status: "info",
      title: "Logged out",
      icon: <LogOut className="size-4" />,
      duration: 2000,
    });
    navigate("/");
  };

  const NavLink = ({
    to,
    icon,
    label,
    onClick,
  }: {
    to: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }) => (
    <Link
      to={to}
      onClick={onClick}
      className="hover-underline group flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-gold"
    >
      <span className="text-gold/80 group-hover:text-gold">{icon}</span>
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-noir/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center border border-gold text-gold">
            <span className="text-[13px] font-bold tracking-tighter">P</span>
          </span>
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.32em] text-ivory sm:inline">
            Product
            <span className="text-gold"> / </span>
            <span className="text-mute">Store</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" icon={<Home className="size-4" />} label="Home" />
          {isAuthenticated && (
            <>
              <NavLink
                to="/fav"
                icon={<Heart className="size-4" />}
                label="Favourites"
              />
              <NavLink
                to="/profile/create"
                icon={<PlusSquare className="size-4" />}
                label="New"
              />
              <Link
                to="/viewcart"
                className="hover-underline relative flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors hover:text-gold"
              >
                <ShoppingBag className="size-4 text-gold/80" />
                Cart
                {count > 0 && (
                  <span className="ml-1 inline-flex size-5 items-center justify-center border border-gold/60 bg-gold/10 text-[10px] font-bold text-gold">
                    {count}
                  </span>
                )}
              </Link>
            </>
          )}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              {!path.includes("login") && (
                <Link to="/login">
                  <Button variant="default">Login</Button>
                </Link>
              )}
              {!path.includes("signup") && (
                <Link to="/signup">
                  <Button variant="primary">Sign up</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/profile"
                className="flex items-center gap-2 border border-hairline px-3 py-2 text-[11px] uppercase tracking-widest text-ivory transition hover:border-gold hover:text-gold"
              >
                <User className="size-4 text-gold" />
                <span className="max-w-[120px] truncate">
                  {userData?.firstname || "Profile"}
                </span>
              </Link>
              <Button variant="ghost" onClick={handleLogOut}>
                Log out
              </Button>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex size-10 items-center justify-center border border-hairline text-ivory transition hover:border-gold hover:text-gold md:hidden"
            onClick={() => setShow((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {show ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "border-t border-hairline bg-noir-2 md:hidden",
          show ? "block" : "hidden",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-4">
          <MobileLink
            to="/"
            label="Home"
            icon={<Home className="size-4" />}
            onClose={() => setShow(false)}
          />
          {isAuthenticated && (
            <>
              <MobileLink
                to="/fav"
                label="Favourites"
                icon={<Heart className="size-4" />}
                onClose={() => setShow(false)}
              />
              <MobileLink
                to="/profile/create"
                label="New product"
                icon={<PlusSquare className="size-4" />}
                onClose={() => setShow(false)}
              />
              <MobileLink
                to="/viewcart"
                label={`Cart (${count})`}
                icon={<ShoppingBag className="size-4" />}
                onClose={() => setShow(false)}
              />
              <MobileLink
                to="/profile"
                label="Profile"
                icon={<User className="size-4" />}
                onClose={() => setShow(false)}
              />
              <button
                type="button"
                className="flex items-center gap-3 border-t border-hairline px-1 py-3 text-left text-xs uppercase tracking-[0.2em] text-[color:var(--color-danger)]"
                onClick={() => {
                  setShow(false);
                  handleLogOut();
                }}
              >
                <LogOut className="size-4" /> Log out
              </button>
            </>
          )}
          {!isAuthenticated && (
            <div className="mt-2 flex gap-2">
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="flex-1"
              >
                <Button variant="default" className="w-full">
                  Login
                </Button>
              </Link>
              <Link
                to="/signup"
                onClick={() => setShow(false)}
                className="flex-1"
              >
                <Button variant="primary" className="w-full">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

function MobileLink({
  to,
  label,
  icon,
  onClose,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClose}
      className="flex items-center gap-3 py-3 text-xs uppercase tracking-[0.2em] text-ivory transition hover:text-gold"
    >
      <span className="text-gold">{icon}</span>
      {label}
    </Link>
  );
}

export default Navbar;
