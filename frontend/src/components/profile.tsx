import { Link, Outlet } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Spin from "./spinner";
import { Button } from "./ui/Button";
import { Kicker } from "./ui/Layout";

type ProfileProps = {
  profileProducts: any[];
  userData: any;
  path: string;
  isLoading: boolean;
};

const Profile = ({
  profileProducts,
  userData,
  path,
  isLoading,
}: ProfileProps) => {
  const inCreate = path.includes("create");

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10">
      {!inCreate && (
        <>
          <div className="mb-12 flex flex-col gap-6 border-b border-hairline pb-10 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-3">
              <Kicker>Profile</Kicker>
              <h1 className="display-serif text-3xl md:text-5xl">
                Welcome back,{" "}
                <span className="text-gold">{userData?.username}</span>.
              </h1>
              {profileProducts.length > 0 && (
                <p className="text-xs uppercase tracking-[0.25em] text-mute">
                  {profileProducts.length} product
                  {profileProducts.length !== 1 && "s"} listed
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <Link to="settings">
                <Button variant="default">Settings</Button>
              </Link>
              <Link to="create">
                <Button variant="primary">Create new</Button>
              </Link>
            </div>
          </div>

          {isLoading && <Spin />}

          {profileProducts.length > 0 && !isLoading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {profileProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {profileProducts.length === 0 && !isLoading && (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 border border-hairline px-6 py-16 text-center">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                Empty catalogue
              </p>
              <p className="text-lg text-ivory">
                You have not created any products yet.
              </p>
              <Link
                to="create"
                className="hover-underline mt-4 text-xs uppercase tracking-widest text-gold"
              >
                Create your first product
              </Link>
            </div>
          )}
        </>
      )}
      <Outlet />
    </div>
  );
};

export default Profile;
