import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Create from "../components/create";
import { useToast } from "../context/ToastContext";
import { useProfileStore } from "../store/product";

const CreatePage = () => {
  const { createProduct } = useProfileStore();
  const navigate = useNavigate();
  const toast = useToast();
  const [load, setLoad] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const nameref = useRef<HTMLInputElement>(null);
  const priceref = useRef<HTMLInputElement>(null);
  const imageref = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_use");
    data.append("cloud_name", "dpebuzpo4");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dpebuzpo4/image/upload",
      { method: "POST", body: data },
    );
    const result = await response.json();
    setNewProduct((p) => ({ ...p, image: result.secure_url }));
    return result.secure_url as string;
  };

  const handleAddProduct = async () => {
    setLoad(true);
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      setLoad(false);
      toast({ status: "error", title: "Please fill in all fields" });
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
      duration: 2500,
    });

    if (success) {
      setLoad(false);
      setNewProduct({ name: "", price: "", image: "" });
      navigate(`../`);
    }
  };

  function handleref() {
    if (!newProduct.name && !newProduct.price && !newProduct.image) {
      nameref.current?.focus();
    } else if (newProduct.name) {
      priceref.current?.focus();
    } else if (newProduct.price) {
      imageref.current?.focus();
    }
  }

  return (
    <Create
      handleAddProduct={handleAddProduct}
      setNewProduct={setNewProduct}
      handleref={handleref}
      newProduct={newProduct}
      nameref={nameref as any}
      priceref={priceref as any}
      handleFileUpload={handleFileUpload}
      load={load}
    />
  );
};

export default CreatePage;
