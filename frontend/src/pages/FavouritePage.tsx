import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore, useFavStore } from "../store/product";
import Spin from "../components/spinner";
import { Kicker } from "../components/ui/Layout";

function Favouritepage() {
  const { products } = useProductStore();
  const { favorites, getFavorites } = useFavStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const get = async () => {
      try {
        await getFavorites();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, []);

  const prods = products.filter((p: any) => p.fav === true);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 text-center">
        <p className="display-serif text-2xl">Something went wrong.</p>
        <button
          onClick={() => window.location.reload()}
          className="hover-underline text-xs uppercase tracking-widest text-gold"
        >
          Try again
        </button>
      </div>
    );
  }

  const items = prods.length
    ? prods
    : (favorites?.[0]?.favs.map((f: any) => ({
        ...f.product,
        fav: f.product._id,
      })) ?? []);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10">
      <div className="mb-12 flex flex-col items-start gap-3 border-b border-hairline pb-8">
        <Kicker>Saved</Kicker>
        <h1 className="display-serif text-3xl md:text-5xl">
          Your <span className="text-gold">favourites</span>.
        </h1>
      </div>

      {items.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product: any) => (
            <ProductCard key={product._id} product={product} fav={true} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 border border-hairline px-6 py-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
            Empty
          </p>
          <p className="text-lg text-ivory">
            You haven&apos;t saved anything yet.
          </p>
          <Link
            to="/"
            className="hover-underline mt-4 text-xs uppercase tracking-widest text-gold"
          >
            Browse the store
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favouritepage;
