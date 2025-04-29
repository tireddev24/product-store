import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { FaPlus, FaTrash, FaMinus } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import {
  useCartStore,
  useProductStore,
  useProfileStore,
} from "../store/product";
import { useEffect, useState } from "react";
import Deletealert from "./deletealert";
import Newbadge from "./newbadge";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth";

const FavCard = ({ product, id, handleRemoveFromCart }) => {
  const { isAuthenticated, userData } = useAuth();

  const { updateFav } = useProductStore();
  const toast = useToast();

  const location = useLocation();
  const { addToCart, fetchCart, cart } = useCartStore();
  const [inCart, setInCart] = useState(false);

  const pathname = location.pathname;

  const [isFavourite, setIsFavourite] = useState(product.fav);

  const handleCart = async (pid) => {
    if (!isAuthenticated) {
      toast({
        status: "warning",
        description: "Please Login First",
      });
      return;
    }
    const cartProd = {
      productId: pid,
      prodownerId: owner._id,
      cartownerId: userData._id,
    };

    const { success, message } = await addToCart(cartProd);
    success && setInCart(true);

    toast({
      status: success ? "success" : "error",
      description: message,
      duration: 1500,
      variant: "left-accent",
      position: "top",
    });
  };

  const toggleFav = async (id, favStat) => {
    if (!isAuthenticated) {
      toast({
        status: "warning",
        description: "Please Login First",
      });
      return;
    }

    const { success, message, data } = await updateFav(id, { fav: !favStat });
    success && setIsFavourite((prevIsFavourite) => !prevIsFavourite);

    toast({
      position: "top",
      status: "info",
      description: message,
      colorScheme: "blue",
    });
  };

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const heart = useColorModeValue("#D69E2E", "#ECC94B");

  return (
    <Box
      w={{ base: "20rem", md: "21rem", lg: "full" }}
      position={"relative"}
      bg={bg}
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xlvb " }}
    >
      <Newbadge dateCreated={product.createdAt} />
      <Image
        src={product.image}
        alt={product.name}
        h={{ base: "8rem", lg: "12rem" }}
        w={"full"}
        objectFit={"cover"}
      />

      {!pathname.includes("/profile") && (
        <IconButton
          position={"absolute"}
          right={2}
          fontSize={"30"}
          icon={
            isFavourite === true && isAuthenticated ? (
              <GoHeartFill color={heart} />
            ) : (
              <GoHeart />
            )
          }
          onClick={() => toggleFav(product._id, isFavourite)}
          bg={"none"}
        />
      )}

      <Box p={4}>
        <Heading as="h3" size={{ base: "md" }} mb={2}>
          {product.name}
        </Heading>
        <Text
          fontWeight={"bold"}
          fontSize={{ base: "md", lg: "xl" }}
          color={textColor}
          mb={8}
        >
          ${product.price}
        </Text>

        <HStack justify={"space-between"}>
          {owner.username && !pathname.includes("profile") && (
            <Text fontWeight={"bold"}>
              By: {owner.username.substr(0, 15)}
              {owner.username.length > 15 && "..."}
            </Text>
          )}
          {!pathname.includes("profile") &&
            !pathname.includes("/viewcart") &&
            !inCart && (
              <Button
                leftIcon={<FaPlus />}
                float={"right"}
                onClick={() => handleCart(product._id)}
              >
                Add to cart
              </Button>
            )}
          {isAuthenticated &&
            !pathname.includes("profile") &&
            !pathname.includes("/viewcart") &&
            inCart && (
              <Button
                disabled
                cursor={"not-allowed"}
                leftIcon={<IoMdCheckmark />}
                _disabled={{ brightness: 100 }}
                float={"right"}
              >
                Added to cart
              </Button>
            )}

          {isAuthenticated && pathname.includes("viewcart") && (
            <HStack spacing={-10}>
              <Button
                colorScheme="red"
                onClick={() => handleRemoveFromCart(product.cartItemId)}
              >
                Remove from cart
              </Button>
            </HStack>
          )}
        </HStack>
      </Box>
    </Box>
  );
};

export default FavCard;
