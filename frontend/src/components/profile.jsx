import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { Link, Outlet } from "react-router-dom";
import Spin from "./spinner";

const Profile = ({ profileProducts, userData, path, isLoading }) => {
  return (
    <Container maxW={"container.xl"} mt={{ base: "3rem", md: "5rem" }}>
      {!path.includes("create") && (
        <VStack spacing={10}>
          <Heading
            as={"h1"}
            maxW={{ base: "3xl", lg: "full" }}
            mt={"-1.5rem"}
            h={"max-content"}
            size={{ base: "lg", md: "xl" }}
            bgGradient={"linear(to-tr, cyan.400, blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
          >
            Welcome to your profile, {userData.username}!
          </Heading>
          <Link to={`create`}>
            <Button colorScheme="blue" cursor={"pointer"}>
              Create A New Product
            </Button>
          </Link>

          {profileProducts.length > 0 && (
            <Text
              float={"right"}
              fontFamily={"monospace"}
              fontSize={"1.2rem"}
              fontWeight={"bold"}
            >
              You own {profileProducts.length} product(s).{" "}
            </Text>
          )}
          {isLoading && <Spin />}
          {profileProducts.length > 0 && !isLoading && (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              w={"full"}
              spacing={10}
              minChildWidth={"20rem"}
              placeItems={{ base: "center", md: "left" }}
            >
              {profileProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
            </SimpleGrid>
          )}

          {profileProducts.length === 0 && (
            <VStack mt={10} justify={"center"}>
              <Text
                fontSize={{ base: "1.2rem", md: "1.7rem" }}
                fontWeight={"bold"}
              >
                You have not created any product(s).
              </Text>
            </VStack>
          )}
        </VStack>
      )}
      <Outlet />
    </Container>
  );
};

export default Profile;
