/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useFavStore, useProductStore } from "../store/product";
import { params, priceRange } from "../store/sortparameters";
import { getSortedProducts } from "../functions/handlers";
import { useAuth } from "../auth/auth";
import { useToast } from "../context/ToastContext";

import ProductCard from "../components/ProductCard";
import SortMenu from "../components/sortmenu";
import PriceRange from "../components/pricerange";
import SearchBar from "../components/searchbar";
import Spin from "../components/spinner";

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();
  const { favorites, getFavorites } = useFavStore();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [value, setValue] = useState("1");
  const [sortKey, setSortKey] = useState(params[0]);
  const [searchval, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [rangeVal, setRangeVal] = useState([100, 100000]);

  const sortstatus = useRef("Newest");

  const handleRef = (status: string) => {
    sortstatus.current = status;
  };

  const handleClick = (
    title: string,
    key: string,
    direction: string,
    value: string,
  ) => {
    handleRef(title);
    setSortKey({ key, direction });
    setValue(value);
  };

  useEffect(() => {
    const get = async () => {
      try {
        if (isAuthenticated) {
          await getFavorites();
        }

        await fetchProducts();
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    get();
  }, [fetchProducts, getFavorites, isAuthenticated]);

  const handleSliderChange = (val: number[]) => {
    handleRef(params[1].title);
    setSortKey(params[1]);
    setRangeVal(val);
  };

  const handleSlider = () => {
    handleRef("Price Range");
    setSortKey(priceRange);

    toast({
      position: "top",
      status: "success",
      description: "Price range filter applied",
      variant: "top-accent",
      colorScheme: "blue",
      duration: 1500,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-center text-xl sm:text-2xl">
          Oops 😢
          <br />
          Something went wrong.
          <br />
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-600 underline hover:text-blue-700"
          >
            Try again?
          </button>
        </p>
      </div>
    );
  }

  const sortedProducts = getSortedProducts(
    products,
    searchval,
    sortKey,
    rangeVal,
  );

  return (
    <div className="relative mx-auto max-w-7xl px-6 py-2">
      <div className="flex flex-col items-center gap-10">
        <h1 className="mt-6 text-center text-3xl md:text-5xl font-bold bg-gradient-to-tr from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Current Products
        </h1>

        <SearchBar
          searchval={searchval}
          sortKey={sortKey}
          products={products}
          getSortedProducts={getSortedProducts}
          setSearchVal={setSearchVal}
        />

        {products.length > 0 && (
          <>
            <PriceRange
              handleSliderChange={handleSliderChange}
              handleSlider={handleSlider}
              rangeVal={rangeVal}
              setRangeVal={setRangeVal}
            />

            <SortMenu
              handleClick={handleClick}
              params={params}
              sortstatus={sortstatus}
              value={value}
              setValue={setValue}
            />
          </>
        )}

        {sortedProducts.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const isFavourite =
                favorites?.[0]?.favs.some(
                  (fav) => fav.product._id === product._id,
                ) ?? false;

              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  fav={isFavourite}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center text-xl font-bold text-gray-500">
            <p>No Products Found 😢</p>

            <Link
              to="/create"
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              Create a product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;