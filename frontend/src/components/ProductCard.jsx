import {
  Box,
  Modal,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  ModalFooter,
  Alert,
  AlertIcon,
  Button,
  Badge,
  LightMode,
  Tooltip,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { FaPlus, FaTrash, FaMinus } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { useCartStore, useFavStore, useProfileStore } from "../store/product";
import { useEffect, useState } from "react";
import Deletealert from "./deletealert";
import Newbadge from "./newbadge";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth";
import Spin from "./spinner";

const ProductCard = ({ product, fav, handleRemoveFromCart, cartItemId }) => {
  const { isAuthenticated, userData } = useAuth();
  const { updateProduct } = useProfileStore();
  const { addToFavorites, removeFromFavorites, getFavorites } = useFavStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const location = useLocation();
  const { addToCart, cart } = useCartStore();
  const [inCart, setInCart] = useState(false);

  const pathname = location.pathname;

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleCart = async (pid) => {
    if (!isAuthenticated) {
      toast({
        status: "warning",
        description: "Please Login First",
      });
      return;
    }

    const addToCartPromise = new Promise(async (resolve, reject) => {
      const { success, message } = await addToCart(pid);
      success && setInCart(true);
      success ? resolve() : reject();
    });

    toast.promise(addToCartPromise, {
      success: {
        title: "Added " + product.name + " to cart",
        description: "",
        colorScheme: "purple",
        duration: 1500,
      },
      error: {
        title: "An unexpected error occured",
        description: "Please try again later",
      },
      loading: {
        title: "Adding to " + product.name + "favourites",
        description: "Please wait",
      },
    });
  };
  useEffect(() => {
    const update = (e) => {
      if (e.key === "Enter" && isOpen) {
        handleUpdateProduct(product._id, updatedProduct);
      }
    };
    const updateTrigger = document.getElementById("update");
    isOpen && updateTrigger.addEventListener("keydown", update);

    return () => {
      isOpen && updateTrigger.removeEventListener("keydown", update);
    };
  }, []);

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: false,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    }
    setIsLoading(false);
  };

  const toggleFav = async (pid) => {
    if (!isAuthenticated) {
      toast({
        status: "warning",
        description: "Please Login First",
      });
      return;
    }

    if (fav) {
      // const { success, message } = await removeFromFavorites(pid);

      const removeFromFavPromise = new Promise(async (resolve, reject) => {
        const { success, message } = await removeFromFavorites(pid);
        await getFavorites();
        success ? resolve() : reject();
      });

      toast.promise(removeFromFavPromise, {
        success: {
          title: "Removed " + product.name + " from favourites ",
          description: "",
          duration: 1500,
        },
        error: {
          title: "An unexpected error occured",
          description: "Please try again later",
        },
        loading: {
          title: "Removing " + product.name + " from favourites",
          description: "Please wait",
        },
      });

      return;
    }

    const addToFavPromise = new Promise(async (resolve, reject) => {
      const { success, message } = await addToFavorites(pid);
      await getFavorites();
      success ? resolve() : reject();
    });

    let mes = toast.promise(addToFavPromise, {
      success: {
        title: "Added " + product.name + " to Favorites",
        description: "",
        colorScheme: "purple",
        duration: 1500,
      },
      error: {
        title: "An Unexpected Error Occurred",
        description: "Please try again later",
      },
      loading: {
        title: "Adding " + product.name + " to favorites",
        description: "Please wait",
      },
    });

    return;
  };

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const heart = useColorModeValue("#D69E2E", "#ECC94B");

  return (
    <Box
      key={product._id}
      minW={{ base: "20rem", md: "21rem" }}
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
            fav && fav && isAuthenticated ? (
              <GoHeartFill color={heart} />
            ) : (
              <GoHeart />
            )
          }
          onClick={() => toggleFav(product._id)}
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
          {product.owner.username && !pathname.includes("profile") && (
            <Text fontWeight={"bold"}>
              By: {product.owner.username.substr(0, 15)}
              {product.owner.username.length > 15 && "..."}
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
          {isAuthenticated && pathname.includes(`/profile`) && (
            <HStack spacing={2} position={""} float={"right"}>
              <IconButton
                icon={<FiEdit />}
                onClick={onOpen}
                colorScheme="blue"
              />
              <IconButton
                icon={<FaTrash />}
                onClick={onDeleteOpen}
                colorScheme="red"
              />
              <Deletealert
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                product={product}
                updatedProduct={updatedProduct}
              />
            </HStack>
          )}
          {isAuthenticated && pathname.includes("viewcart") && (
            <HStack spacing={-10}>
              <Button
                colorScheme={loading ? "none" : "red"}
                onClick={() => {
                  handleRemoveFromCart(cartItemId);
                }}
              >
                {loading ? <Spin /> : "Remove from cart"}
              </Button>
            </HStack>
          )}
        </HStack>
      </Box>

      {/* update modal */}
      <Modal
        id="update"
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent w={{ sm: "23rem", md: "full" }}>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Alert status="warning" borderRadius={"0.7rem"}>
                <AlertIcon />
                Please fill in all fields
              </Alert>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                required={true}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price in dollars ($)"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
                required={true}
              />
              <Input
                placeholder="Copy and paste image URL here!"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
                required={true}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              // disabled={loading}
              colorScheme={loading ? "none" : "blue"}
              mr={3}
              onClick={() => {
                setIsLoading(true);
                handleUpdateProduct(product._id, updatedProduct);
              }}
            >
              {loading ? <Spin /> : "Update"}
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
