import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useCartStore, useFavStore } from "../store/product";
import Spin from "./spinner";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth";

const Cart = ({}) => {
  const { cart, fetchCart, removeFromCart } = useCartStore();
  const { getFavorites, favorites } = useFavStore();
  const { isAuthenticated, userData } = useAuth();
  const toast = useToast();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        await getFavorites();
        const { success, message, res } = await fetchCart();
        if (!success) {
          toast({
            status: "error",
            description: message,
          });
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    const delay = setTimeout(() => {
      getCart();
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  const handleRemoveFromCart = async (pid) => {
    let mes = "error";
    const remove = new Promise((resolve, reject) => {
      setTimeout(async () => {
        const { success, message } = resolve(await removeFromCart(pid));
        mes = message;
        reject(!success);
      }, 1500);
    });

    toast.promise(remove, {
      success: { title: " Removed item from cart", description: "" },
      error: { title: "Error", description: mes },
      loading: { title: "Working", description: "Please wait" },
    });
  };

  if (!isAuthenticated) {
    return (
      <VStack minH={"70vh"} justify={"center"}>
        <Link to={"/login"}>
          <Text _hover={{ textDecoration: "underline" }}>
            Login to View Cart
          </Text>
        </Link>
      </VStack>
    );
  }

  if (isLoading) {
    return (
      <VStack minH={"60vh"} justify={"center"}>
        <Spin />
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack minH={"50vh"} justifyContent={"center"}>
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

  return (
    <Container maxW="container.xl" py={12} pos={"relative"}>
      <VStack spacing={10}>
        <Heading
          as={"h1"}
          mt={"-1.5rem"}
          h={"max-content"}
          size={{ base: "xl", md: "2xl" }}
          bgGradient={"linear(to-br, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Welcome to your Cart, {userData.firstname}!
        </Heading>
        {cart && cart.length > 0 && (
          <Text float={"right"}>
            You have {cart.length} item(s) in your cart
          </Text>
        )}
        {cart && cart.length > 0 && (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            w={"full"}
            spacing={10}
            minChildWidth={"20rem"}
            placeItems={{ base: "center", md: "left" }}
          >
            {cart.map((cart) => {
              const isFavourite =
                favorites &&
                favorites[0]?.favs.some(
                  (fav) => fav.product._id === cart.product._id
                );
              return (
                <ProductCard
                  key={cart.cartItemId}
                  cartItemId={cart._id}
                  product={cart.product}
                  handleRemoveFromCart={handleRemoveFromCart}
                  fav={isFavourite && isFavourite}
                />
              );
            })}
          </SimpleGrid>
        )}

        {cart && cart.length === 0 && (
          <VStack minH={"50vh"} justify={"center"}>
            <Text
              fontSize={{ base: "1.2rem", md: "1.7rem" }}
              fontWeight={"bold"}
            >
              No product(s) have been added to cart.
            </Text>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Cart;
