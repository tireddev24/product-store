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

  const { userData, isAuthenticated } = useAuth();
  const { profileProducts, fetchPersonalProfile } = useProfileStore();

  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { success, message } = await fetchPersonalProfile();

        if (!success) {
          toast({
            status: "error",
            description: message,
          });
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [fetchPersonalProfile, toast]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Link
          to="/login"
          className="text-lg font-semibold text-blue-600 hover:underline"
        >
          Login to View Profile
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center text-xl sm:text-2xl">
          <p>Oops 😢</p>
          <p>Something went wrong.</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-600 underline hover:text-blue-700"
          >
            Try again?
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
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