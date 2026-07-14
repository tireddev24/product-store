import { useState } from "react";
import { useToast } from "../context/ToastContext";
import { useProfileStore } from "../store/product";
import Spin from "./spinner";
import { Button } from "./ui/Button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./ui/Modal";

type Product = { _id: string; name?: string };

type DeletealertProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

function Deletealert({ product, isOpen, onClose }: DeletealertProps) {
  const toast = useToast();
  const [loading, setIsLoading] = useState(false);
  const { deleteProduct } = useProfileStore();

  const handleDeleteProduct = async (pid: string) => {
    setIsLoading(true);
    const { success, message } = await deleteProduct(pid);
    toast({ status: success ? "success" : "error", description: message });
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Delete product</ModalHeader>
      <ModalBody>
        <p className="text-sm text-ivory/80">
          Are you sure? You can&apos;t undo this action afterwards.
          {product?.name && (
            <>
              <br />
              <span className="mt-3 inline-block text-[11px] uppercase tracking-widest text-mute">
                {product.name}
              </span>
            </>
          )}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDeleteProduct(product._id)}
          disabled={loading}
        >
          {loading ? <Spin className="h-4" /> : "Delete"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Deletealert;
