import { Search } from "lucide-react";
import { Input } from "./ui/Input";

type Product = { _id: string; name: string };

type SearchBarProps = {
  searchval: string;
  products: Product[];
  sortKey: unknown;
  getSortedProducts: (
    products: Product[],
    q: string,
    key: unknown,
  ) => Product[];
  setSearchVal: (v: string) => void;
};

const SearchBar = ({
  searchval,
  products,
  sortKey,
  getSortedProducts,
  setSearchVal,
}: SearchBarProps) => {
  const results = searchval
    ? getSortedProducts(products, searchval, sortKey).slice(0, 5)
    : [];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gold" />
      <Input
        variant="flushed"
        placeholder="Search products"
        onChange={(e) => setSearchVal(e.target.value)}
        name="search"
        value={searchval}
        className="pl-9"
      />

      {searchval && (
        <div className="absolute z-20 mt-2 w-full border border-hairline bg-surface-2 py-1 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.9)]">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-xs uppercase tracking-widest text-mute">
              No products found
            </p>
          ) : (
            results.map((product) => (
              <div
                key={product._id}
                className="cursor-pointer px-4 py-2 text-left text-sm text-ivory transition hover:bg-noir-2 hover:text-gold"
              >
                <p className="font-medium">{product.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
