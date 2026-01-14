import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Spin from "./spinner";
import DragAndDropUpload from "./draganddrop";

const Create = ({
  handleAddProduct,
  setNewProduct,
  handleref,
  newProduct,
  nameref,
  priceref,
  handleFileUpload,
  load,
}) => {
  return (
    <Container maxW={"container.sm"} mt={0}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={{ base: "lg", sm: "xl", lg: "2xl" }}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          {/* create modal */}
          <VStack spacing={6}>
            <Heading as={"h4"} size={{ base: "md", sm: "lg" }}>
              Enter Product Details
            </Heading>
            <Alert
              status="info"
              fontFamily={"mono"}
              w={"max-content"}
              rounded={"md"}
            >
              <AlertIcon />
              Please fill in all fields
            </Alert>

            <FormControl>
              <FormLabel fontWeight={"bold"}>Name</FormLabel>
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
                placeholder="Price in dollars ($)"
                name="price"
                ref={priceref}
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight={"bold"}>Image</FormLabel>
              <DragAndDropUpload handleFileUpload={handleFileUpload} />
            </FormControl>

            <Button
              colorScheme={load ? "grey" : "blue"}
              onClick={() => {
                handleAddProduct();
                handleref();
              }}
            >
              {load ? <Spin /> : "Add New Product"}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Create;
