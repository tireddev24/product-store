import { Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useProfileStore } from "../store/product";
import { useAuth } from "../auth/auth";
import Spin from "../components/spinner";
import { Link, useLocation } from "react-router-dom";
import Profile from "../components/profile";

const ProfilePage = () => {
  const toast = useToast();
  const location = useLocation();
  const [path, setPath] = useState();

  const { userData, isAuthenticated } = useAuth();
  const { profileProducts, fetchPersonalProfile } = useProfileStore();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const l_path = location.pathname;
    setPath(l_path);
  }, [location.pathname]);

  useEffect(() => {
    const get = async () => {
      try {
        const { success, message } = await fetchPersonalProfile();
        if (!success) {
          toast({
            success: "error",
            message: message,
          });
        }
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      get();
    }, 1500);
  }, []);

  if (!isAuthenticated) {
    return (
      <VStack minH={"100vh"}>
        <Link to={"/login"}>Login to View Profile</Link>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack minH={"70vh"} justifyContent={"center"}>
        <Text fontSize={{ base: 22, sm: 30 }}>
          Oops😢 <br /> Something went wrong. <br />{" "}
          <Link
            style={{ textDecoration: "underline" }}
            onClick={() => window.location.reload()}
          >
            Try again?
          </Link>
        </Text>
      </VStack>
    );
  }

  if (isLoading) {
    return (
      <VStack minH={"80vh"} justify={"center"}>
        <Spin />
      </VStack>
    );
  }

  return (
    <Profile
      profileProducts={profileProducts}
      userData={userData}
      path={path}
      isLoading={isLoading}
    />
  );
};

export default ProfilePage;
