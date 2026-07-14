import { Check, Heart, Pencil, Plus, Trash2, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/auth";
import { useCartStore, useFavStore, useProfileStore } from "../store/product";
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

type ProductCardProps = {
  product: any;
  fav?: boolean | string;
  handleRemoveFromCart?: (pid: string) => void;
  cartItemId?: string;
};

const ProductCard = ({
  product,
  fav,
  handleRemoveFromCart,
  cartItemId,
}: ProductCardProps) => {
  const func = useAuth();
  const isAuthenticated = func?.isAuthenticated!;
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

  const handleCart = async (pid: string) => {
    if (!isAuthenticated) {
      toast({ status: "warning", description: "Please login first" });
      return;
    }
    const addToCartPromise = new Promise((resolve, reject) => {
      addToCart(pid).then(({ success }: { success: boolean }) => {
        success && setInCart(true);
        success ? resolve(undefined) : reject();
      });
    });

    toast.promise(addToCartPromise, {
      success: { title: `Added ${product.name} to cart`, duration: 1500 },
      error: {
        title: "An unexpected error occurred",
        description: "Please try again later",
      },
      loading: {
        title: `Adding ${product.name} to cart`,
        description: "Please wait",
      },
    });
  };

  useEffect(() => {
    const update = (e: KeyboardEvent) => {
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

  const handleUpdateProduct = async (pid: string, updated: any) => {
    const { success, message } = await updateProduct(pid, updated);
    onClose();
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
    });
    setIsLoading(false);
  };

  const toggleFav = async (pid: string) => {
    if (!isAuthenticated) {
      toast({ status: "warning", description: "Please login first" });
      return;
    }

    const action = fav ? removeFromFavorites : addToFavorites;
    const verb = fav ? "Removed" : "Added";
    const verbing = fav ? "Removing" : "Adding";
    const prep = fav ? "from" : "to";

    const promise = new Promise((resolve, reject) => {
      action(pid).then(({ success }: { success: boolean }) => {
        getFavorites().then(() => (success ? resolve(undefined) : reject()));
      });
    });

    toast.promise(promise, {
      success: {
        title: `${verb} ${product.name} ${prep} favourites`,
        duration: 1500,
      },
      error: {
        title: "An unexpected error occurred",
        description: "Please try again later",
      },
      loading: {
        title: `${verbing} ${product.name} ${prep} favourites`,
        description: "Please wait",
      },
    });
  };

  return (
    <article
      className="group fade-up relative flex flex-col overflow-hidden border border-hairline bg-noir-2 transition-all duration-500 hover:border-gold/60"
      key={product._id}
    >
      <Newbadge dateCreated={product.createdAt} />

      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-noir">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-transparent opacity-70" />

        {!pathname.includes("/profile") && (
          <IconButton
            className="absolute top-3 left-3 size-9 border border-hairline bg-noir/60 backdrop-blur-sm hover:border-gold"
            onClick={() => toggleFav(product._id)}
            aria-label="Toggle favourite"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                fav && isAuthenticated
                  ? "fill-gold text-gold"
                  : "text-ivory group-hover:text-gold",
              )}
              strokeWidth={1.5}
            />
          </IconButton>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 border-t border-hairline p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold tracking-tight text-ivory">
              {product.name}
            </h3>
            {product.owner?.username && !pathname.includes("profile") && (
              <div className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-mute">
                <UserRound className="size-3 text-gold/70" />
                {product.owner.username.substr(0, 15)}
                {product.owner.username.length > 15 && "…"}
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.25em] text-mute">
              Price
            </p>
            <p className="text-base font-semibold tracking-tight text-gold">
              ${product.price}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-2">
          {!pathname.includes("profile") &&
            !pathname.includes("/viewcart") &&
            (inCart && isAuthenticated ? (
              <Button
                disabled
                leftIcon={<Check className="size-4" />}
                className="w-full"
              >
                Added
              </Button>
            ) : (
              <Button
                variant="outline"
                leftIcon={<Plus className="size-4" />}
                className="w-full"
                onClick={() => handleCart(product._id)}
              >
                Add to cart
              </Button>
            ))}

          {isAuthenticated && pathname.includes("/profile") && (
            <div className="flex gap-2">
              <IconButton
                variant="default"
                onClick={onOpen}
                aria-label="Edit product"
                className="flex-1"
              >
                <Pencil className="size-4" />
              </IconButton>
              <IconButton
                variant="danger"
                onClick={onDeleteOpen}
                aria-label="Delete product"
                className="flex-1"
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
              variant="danger"
              className="w-full"
              onClick={() => handleRemoveFromCart?.(cartItemId!)}
            >
              {loading ? <Spin className="h-4" /> : "Remove from cart"}
            </Button>
          )}
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        id="update"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalHeader>Update product</ModalHeader>
        <ModalCloseButton onClose={onClose} />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Alert status="warning">
              <AlertIcon />
              Please fill in all fields
            </Alert>
            <Input
              placeholder="Product name"
              name="name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              required
            />
            <Input
              placeholder="Price ($)"
              name="price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
              required
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={loading}
            onClick={() => {
              setIsLoading(true);
              handleUpdateProduct(product._id, updatedProduct);
            }}
          >
            {loading ? <Spin className="h-4" /> : "Update"}
          </Button>
        </ModalFooter>
      </Modal>
    </article>
  );
};

export default ProductCard;
