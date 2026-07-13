import {
  Check,
  Heart,
  Pencil,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth";
import { useCartStore, useFavStore, useProfileStore } from "../store/product";
import { useColorModeValue } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import { useDisclosure } from "../hooks/useDisclosure";
import Deletealert from "./deletealert";
import Newbadge from "./newbadge";
import Spin from "./spinner";
import { Button, IconButton } from "./ui/Button";
import { Input } from "./ui/Input";
import {
  Alert,
  AlertIcon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "./ui/Modal";
import { cn } from "../lib/cn";

const ProductCard = ({ product, fav, handleRemoveFromCart, cartItemId }) => {
  const { isAuthenticated } = useAuth();
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
  const { addToCart } = useCartStore();
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

    const addToCartPromise = new Promise((resolve, reject) => {
      addToCart(pid).then(({ success }) => {
        success && setInCart(true);
        success ? resolve(undefined) : reject();
      });
    });

    toast.promise(addToCartPromise, {
      success: {
        title: "Added " + product.name + " to cart",
        description: "",
        duration: 1500,
      },
      error: {
        title: "An unexpected error occurred",
        description: "Please try again later",
      },
      loading: {
        title: "Adding " + product.name + "to cart",
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
    isOpen && updateTrigger?.addEventListener("keydown", update);

    return () => {
      isOpen && updateTrigger?.removeEventListener("keydown", update);
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
      const removeFromFavPromise = new Promise((resolve, reject) => {
        removeFromFavorites(pid).then(({ success }) => {
          getFavorites().then(() => {
            success ? resolve(undefined) : reject();
          });
        });
      });

      toast.promise(removeFromFavPromise, {
        success: {
          title: "Removed " + product.name + " from favourites ",
          description: "",
          duration: 1500,
        },
        error: {
          title: "An unexpected error occurred",
          description: "Please try again later",
        },
        loading: {
          title: "Removing " + product.name + " from favourites",
          description: "Please wait",
        },
      });

      return;
    }

    const addToFavPromise = new Promise((resolve, reject) => {
      addToFavorites(pid).then(({ success }) => {
        getFavorites().then(() => {
          success ? resolve(undefined) : reject();
        });
      });
    });

    toast.promise(addToFavPromise, {
      success: {
        title: "Added " + product.name + " to Favorites",
        description: "",
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
  };

  const textColor = useColorModeValue("text-gray-600", "text-gray-200");
  const bg = useColorModeValue("bg-white", "bg-gray-800");
  const heartColor = useColorModeValue("#D69E2E", "#ECC94B");

  return (
    <div
      key={product._id}
      className={cn(
        "relative min-w-80 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        bg,
      )}
    >
      <Newbadge dateCreated={product.createdAt} />
      <img
        src={product.image}
        alt={product.name}
        className="h-32 w-full object-cover lg:h-48"
      />

      {!pathname.includes("/profile") && (
        <IconButton
          className="absolute top-2 right-2 bg-transparent text-3xl shadow-none hover:bg-transparent"
          onClick={() => toggleFav(product._id)}
          aria-label="Toggle favourite"
        >
          {fav && isAuthenticated ? (
            <Heart className="size-7" style={{ color: heartColor, fill: heartColor }} />
          ) : (
            <Heart className="size-7" />
          )}
        </IconButton>
      )}

      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
        <p className={cn("mb-8 text-base font-bold lg:text-xl", textColor)}>
          ${product.price}
        </p>

        <div className="flex items-center justify-between">
          {product.owner.username && !pathname.includes("profile") && (
            <div className="flex items-center gap-1">
              <ShoppingBag className="size-5 text-cyan-500" />
              <span className="font-bold">
                {product.owner.username.substr(0, 12)}
                {product.owner.username.length > 15 && "..."}
              </span>
            </div>
          )}

          {!pathname.includes("profile") &&
            !pathname.includes("/viewcart") &&
            !inCart && (
              <Button
                leftIcon={<Plus className="size-4" />}
                className="ml-auto"
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
                leftIcon={<Check className="size-4" />}
                className="ml-auto cursor-not-allowed"
              >
                Added to cart
              </Button>
            )}

          {isAuthenticated && pathname.includes("/profile") && (
            <div className="ml-auto flex gap-2">
              <IconButton variant="blue" onClick={onOpen} aria-label="Edit product">
                <Pencil className="size-4" />
              </IconButton>
              <IconButton
                variant="red"
                onClick={onDeleteOpen}
                aria-label="Delete product"
              >
                <Trash2 className="size-4" />
              </IconButton>
              <Deletealert
                isOpen={isDeleteOpen}
                onClose={onDeleteClose}
                product={product}
              />
            </div>
          )}

          {isAuthenticated && pathname.includes("viewcart") && (
            <Button
              variant={loading ? "ghost" : "red"}
              onClick={() => handleRemoveFromCart(cartItemId)}
            >
              {loading ? <Spin /> : "Remove from cart"}
            </Button>
          )}
        </div>
      </div>

      <Modal
        id="update"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton onClose={onClose} />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Alert status="warning" className="rounded-xl">
              <AlertIcon />
              Please fill in all fields
            </Alert>
            <Input
              placeholder="Product Name"
              name="name"
              value={updatedProduct.name}
              required
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
              required
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
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant={loading ? "ghost" : "blue"}
            className="mr-3"
            onClick={() => {
              setIsLoading(true);
              handleUpdateProduct(product._id, updatedProduct);
            }}
          >
            {loading ? <Spin /> : "Update"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProductCard;
