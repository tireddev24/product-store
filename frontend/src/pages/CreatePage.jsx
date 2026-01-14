import { useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Create from "../components/create";
import { useProfileStore } from "../store/product";

const CreatePage = () => {
  const { createProduct } = useProfileStore();
  const navigate = useNavigate();
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const nameref = useRef(null);
  const priceref = useRef(null);
  const imageref = useRef(null);

  //add this function to "choose file" component
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_use"); // replace with your upload preset
    data.append("cloud_name", "dpebuzpo4");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dpebuzpo4/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();
    setNewProduct({ ...newProduct, image: result.secure_url });

    setLoading(false);

    return result.secure_url;
  };

  const handleAddProduct = async () => {
    setLoad(true);

    // return;
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setLoad(false);
      toast({
        status: "error",
        title: "Please fill in all fields",
      });
      return;
    }

    const { success, message, res } = await createProduct(newProduct);

    if (!success && res && res === 401) {
      toast({ status: "error", description: message });
      setLoad(false);
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
      setLoad(false);
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
    } else {
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
      load={load}
      handleFileUpload={handleFileUpload}
      loading={loading}
    />
  );
};

export default CreatePage;
