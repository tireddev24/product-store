import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useProductStore, useProfileStore } from "../store/product";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import Create from "../components/create";

const CreatePage = () => {
  const { createProduct } = useProfileStore();
  const navigate = useNavigate();
  const toast = useToast();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const nameref = useRef(null);
  const priceref = useRef(null);
  const imageref = useRef(null);

  const handleAddProduct = async () => {
    if (!newProduct.name && !newProduct.price && !newProduct.image) {
      toast({
        status: "error",
        title: "Please fill in all fields",
      });
      return;
    }

    const { success, message, res } = await createProduct(newProduct);

    if (!success && res && res === 401) {
      toast({ status: "error", description: message });
      return;
    }

    toast({
      status: success ? "success" : "error",
      description: message,
      isClosable: false,
      duration: 2500,
      position: "top",
    });

    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
      navigate(`../`);
    }
  };

  function handleref() {
    if (!newProduct.name && !newProduct.price && !newProduct.image) {
      nameref.current.focus();
    } else if (newProduct.name) {
      priceref.current.focus();
    } else if (newProduct.price) {
      imageref.current.focus();
    }
  }

  return (
    <Create
      handleAddProduct={handleAddProduct}
      setNewProduct={setNewProduct}
      handleref={handleref}
      newProduct={newProduct}
      nameref={nameref}
      priceref={priceref}
      imageref={imageref}
    />
  );
};

export default CreatePage;
