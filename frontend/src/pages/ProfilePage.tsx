import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProfileStore } from "../store/product";
import { useAuth } from "../auth/auth";
import { useToast } from "../context/ToastContext";
import Spin from "../components/spinner";
import Profile from "../components/profile";

const ProfilePage = () => {
  const toast = useToast();
  const location = useLocation();
  const func = useAuth();
  const userData = func?.userData;
  const isAuthenticated = func?.isAuthenticated!;
  const { profileProducts, fetchPersonalProfile } = useProfileStore();
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { success, message } = await fetchPersonalProfile();
        if (!success) toast({ status: "error", description: message });
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, [fetchPersonalProfile]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Link
          to="/login"
          className="hover-underline text-sm uppercase tracking-[0.2em] text-gold"
        >
          Login to view profile
        </Link>
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

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <Profile
      profileProducts={profileProducts}
      userData={userData}
      path={location.pathname}
      isLoading={isLoading}
    />
  );
};

export default ProfilePage;
