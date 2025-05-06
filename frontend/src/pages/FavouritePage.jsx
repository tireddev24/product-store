import {
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useFavStore } from "../store/product";

const favs = [1, 2, 3, 4];

function Favouritepage() {
  const { products, fetchProducts } = useProductStore();
  const { favorites, getFavorites } = useFavStore();

  const [loading, isLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const get = async () => {
      try {
        // await fetchProducts();
        await getFavorites();
      } catch (error) {
        setError(e);
      } finally {
        isLoading(false);
      }
    };

    get();
  }, []);

  const prods = products.filter((p) => p.fav === true);

  //loading
  if (loading) {
    return (
      <VStack minH={"70vh"} justifyContent={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </VStack>
    );
  }

  //unable to reach server error
  if (error) {
    return (
      <VStack minH={"70vh"} justifyContent={"center"}>
        <Text fontSize={{ base: 22, sm: 30 }}>
          Oops😢 <br /> Something went wrong. <br />
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

  return (
    <Container maxW={"container.xl"}>
      <VStack>
        <Heading
          as={"h3"}
          mb={{ base: 1, sm: "5rem" }}
          size={{ base: "xl", lg: "2xl" }}
          bgGradient={"linear(to-br, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
          mt={"10"}
        >
          Favourite Products
        </Heading>

        {favorites && favorites.length === 0 && (
          <VStack>
            <Text fontSize={"1.7rem"} fontWeight={"bold"}>
              No product(s) have been added to favourites.
            </Text>
          </VStack>
        )}

        {prods && prods.length < 0 && (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
            mx={10}
            placeItems={{ base: "center", md: "left" }}
          >
            {prods.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </SimpleGrid>
        )}
        {favorites && favorites.length > 0 && (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
            mx={10}
            placeItems={{ base: "center", md: "left" }}
          >
            {favorites[0].favs.map((favorite) => (
              <ProductCard
                key={favorite.product._id}
                product={favorite.product}
                fav={favorite.product._id}

                // owner={favorite.owner}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
}

export default Favouritepage;
