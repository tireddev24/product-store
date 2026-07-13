import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore, useFavStore } from "../store/product";

function Favouritepage() {
  const { products } = useProductStore();
  const { favorites, getFavorites } = useFavStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const get = async () => {
      try {
        await getFavorites();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, []);

  const prods = products.filter((p) => p.fav === true);

  // Loading
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-center text-xl sm:text-2xl">
          Oops 😢
          <br />
          Something went wrong.
          <br />
          <Link
            to="#"
            onClick={() => window.location.reload()}
            className="underline text-blue-600 hover:text-blue-700"
          >
            Try again?
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col items-center">
        <h1 className="mt-10 mb-10 text-center text-3xl lg:text-5xl font-bold bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Favourite Products
        </h1>

        {favorites && favorites.length === 0 && (
          <div className="text-center">
            <p className="text-2xl font-bold">
              No product(s) have been added to favourites.
            </p>
          </div>
        )}

        {prods.length > 0 && (
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {prods.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {favorites && favorites.length > 0 && (
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favorites[0].favs.map((favorite) => (
              <ProductCard
                key={favorite.product._id}
                product={favorite.product}
                fav={favorite.product._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favouritepage;