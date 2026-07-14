import { Info } from "lucide-react";
import type { RefObject } from "react";
import Spin from "./spinner";
import DragAndDropUpload from "./draganddrop";
import { Button } from "./ui/Button";
import { FormControl, FormLabel } from "./ui/Form";
import { Input } from "./ui/Input";
import { Kicker } from "./ui/Layout";

type CreateProps = {
  handleAddProduct: () => void;
  setNewProduct: (p: any) => void;
  handleref: () => void;
  newProduct: { name: string; price: string; image: string };
  nameref: RefObject<HTMLInputElement>;
  priceref: RefObject<HTMLInputElement>;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<string | undefined>;
  load: boolean;
};

const Create = ({
  handleAddProduct,
  setNewProduct,
  handleref,
  newProduct,
  nameref,
  priceref,
  handleFileUpload,
  load,
}: CreateProps) => {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pt-8 pb-16">
      <div className="mb-10 flex flex-col items-start gap-3 border-b border-hairline pb-8">
        <Kicker>New listing</Kicker>
        <h1 className="display-serif text-3xl md:text-5xl">
          Create a <span className="text-gold">new product</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.05fr_1fr]">
        {/* Image */}
        <div className="border border-hairline bg-noir-2 p-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-mute">
            Product image
          </p>
          <DragAndDropUpload handleFileUpload={handleFileUpload} />
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-6 border border-hairline bg-noir-2 p-6">
          <div className="flex items-start gap-2 border-l-2 border-l-gold bg-gold/5 px-4 py-3">
            <Info className="size-4 shrink-0 text-gold" />
            <p className="text-[11px] uppercase tracking-widest text-gold">
              Please fill in all fields
            </p>
          </div>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Product name"
              name="name"
              ref={nameref}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </FormControl>

          <FormControl>
            <FormLabel>Price ($)</FormLabel>
            <Input
              placeholder="Price in dollars"
              name="price"
              ref={priceref}
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </FormControl>

          <Button
            variant="primary"
            className="mt-2 w-full"
            disabled={load}
            onClick={() => {
              handleAddProduct();
              handleref();
            }}
          >
            {load ? <Spin className="h-4" /> : "Add new product"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
