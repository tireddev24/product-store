import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFavStore, useProductStore } from "../store/product";
import { params, priceRange } from "../store/sortparameters";
import { getSortedProducts } from "../lib/handlers";
import { useAuth } from "../auth/auth";
import { useToast } from "@/context/ToastContext";
import ProductCard from "@/components/ProductCard";
import SortMenu from "@/components/sortmenu";
import PriceRange from "@/components/pricerange";
import SearchBar from "@/components/searchbar";
import Spin from "@/components/ui/Spinner";
import { Kicker } from "@/components/ui/Layout";

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();
  const { favorites, getFavorites } = useFavStore();
  // const { isAuthenticated } = useAuth();
  const func = useAuth();
  const isAuthenticated = func?.isAuthenticated;
  const toast = useToast();

  const [value, setValue] = useState("1");
  const [sortKey, setSortKey] = useState(params[0]);
  const [searchval, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [rangeVal, setRangeVal] = useState([100, 100000]);

  const sortstatus = useRef("Newest");
  const handleRef = (status: string) => (sortstatus.current = status);

  const handleClick = (title: string, key: string, direction: string, value: string) => {
    handleRef(title);
    setSortKey({ key, direction } as any);
    setValue(value);
  };

  useEffect(() => {
    const get = async () => {
      try {
        if (isAuthenticated) await getFavorites();
        await fetchProducts();
      } catch (err: any) {
        console.log("Error " + err);
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
    setSortKey(priceRange as any);
    toast({
      status: "success",
      description: "Price range filter applied",
      duration: 1500,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
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

  const sortedProducts = getSortedProducts({
    product: products,
    searchval,
    sortKey,
    rangeVal,
  });

  return (
    <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
      {/* Editorial hero */}
      <section className="hidden grid-cols-1 items-end gap-8 border-b border-hairline py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div className="flex flex-col gap-5">
          <Kicker>The Collection</Kicker>
          <h1 className="display-serif text-4xl leading-[1.02] md:text-6xl lg:text-7xl">
            Objects, curated
            <br />
            with <span className="text-gold">intention</span>.
          </h1>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-mute md:text-right md:text-base">
          A quiet marketplace of considered things. Independent makers, honest prices, and pieces
          worth keeping.
        </p>
      </section>

      {/* Filters row */}
      <section className="grid grid-cols-1 items-center gap-6 border-b border-hairline py-8 lg:grid-cols-[1fr_auto_auto]">
        <SearchBar
          searchval={searchval}
          sortKey={sortKey}
          products={products}
          getSortedProducts={getSortedProducts as any}
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
      </section>

      {/* Grid */}
      <section className="py-12">
        {sortedProducts.length > 0 ? (
          <>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-mute">
                {sortedProducts.length} piece
                {sortedProducts.length !== 1 && "s"}
              </h2>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                {sortstatus.current}
              </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product: any) => {
                const isFavourite =
                  favorites?.[0]?.favs.some((f: any) => f.product._id === product._id) ?? false;
                return <ProductCard key={product._id} product={product} fav={isFavourite} />;
              })}
            </div>
          </>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 border border-hairline px-6 py-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Nothing here yet</p>
            <p className="text-lg text-ivory">No products match your filters.</p>
            <Link
              to="/profile/create"
              className="hover-underline mt-4 text-xs uppercase tracking-widest text-gold"
            >
              Create a product
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;
