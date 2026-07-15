import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useCartStore, useFavStore } from "../store/product";
import Spin from "@/components/ui/Spinner";
import { useAuth } from "../auth/auth";
import { useToast } from "../context/ToastContext";
import { Kicker, Section } from "./ui/Layout";

const Cart = () => {
  const { cart, fetchCart, removeFromCart } = useCartStore();
  const { getFavorites, favorites } = useFavStore();
  const func = useAuth();
  const isAuthenticated = func?.isAuthenticated;
  const userData = func?.userData;
  const toast = useToast();
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        await getFavorites();
        const { success, message } = await fetchCart();
        if (!success) toast({ status: "error", description: message });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    const delay = setTimeout(getCart, 800);
    return () => clearTimeout(delay);
  }, []);

  const handleRemoveFromCart = async (pid: string) => {
    const remove = new Promise((resolve, reject) => {
      setTimeout(async () => {
        const { success } = await removeFromCart(pid);
        success ? resolve(undefined) : reject();
      }, 600);
    });

    toast.promise(remove, {
      success: { title: "Removed from cart" },
      error: {
        title: "An unexpected error occurred",
        description: "Please try again later",
      },
      loading: { title: "Working", description: "Please wait" },
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Link to="/login" className="hover-underline text-sm uppercase tracking-[0.2em] text-gold">
          Login to view cart
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="display-serif text-2xl">Something went wrong.</h2>
        <button
          onClick={() => window.location.reload()}
          className="hover-underline text-xs uppercase tracking-widest text-gold"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <Section>
      <div className="mb-12 flex flex-col items-start gap-4 border-b border-hairline pb-8">
        <Kicker>Cart</Kicker>
        <div className="flex w-full flex-wrap items-end justify-between gap-4">
          <h1 className="display-serif text-3xl md:text-5xl">
            Welcome to your cart,
            <br />
            <span className="text-gold">{userData?.firstname}</span>.
          </h1>
          {cart && cart.length > 0 && (
            <p className="text-xs uppercase tracking-[0.25em] text-mute">
              {cart.length} item{cart.length !== 1 && "s"}
            </p>
          )}
        </div>
      </div>

      {cart && cart.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cart.map((c: any) => {
            const isFavourite =
              favorites && favorites[0]?.favs.some((f: any) => f.product._id === c.product._id);
            return (
              <ProductCard
                key={c._id}
                cartItemId={c._id}
                product={c.product}
                handleRemoveFromCart={handleRemoveFromCart}
                fav={!!isFavourite}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 border border-hairline px-6 py-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Empty</p>
          <p className="text-lg text-ivory">No products have been added to cart.</p>
          <Link to="/" className="hover-underline mt-4 text-xs uppercase tracking-widest text-gold">
            Browse the store
          </Link>
        </div>
      )}
    </Section>
  );
};

export default Cart;
