import { Box, Button, Container, Heading,
     Input,useToast,useColorModeValue, 
     VStack } from "@chakra-ui/react";
import { useState } from "react"
import { useProductStore } from "../store/product";

const Createpage = () => {
const [newProduct, setNewProduct] = useState({
    name:"",
    price:"",
    image:""
});

const toast = useToast()


const { createProduct } = useProductStore()
const handleAddProduct = async () => {
    const {success, message } = await createProduct(newProduct)
    console.log("Success: ", success) 
    console.log("Message: ", message)

    if(!success){
        toast({
            title: "Error",
            description: message,
            status: "error",
            isClosable: false
        })
    } else {
        toast({
            title: "Success",
            description: message,
            status: "success",
            isClosable: true,
            duration: 3000
        })
    }
    setNewProduct({name:"", price:"", image:""})
}




  return (
    <Container maxW={"container.sm"} mt={8}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={{base:'lg', sm:'xl' ,lg:"2xl"}} textAlign={'center'}  mb={6}>
                Create New Product
            </Heading>
            <Box w={'full'}  bg={useColorModeValue("white", 'gray.800')} p={6} rounded={'lg'} shadow={'md'}
                >
                <VStack spacing={6}>
                    <Heading as={"h4"} size={{base:'md', sm:"lg"}}>Enter Product Details</Heading>
                    <Input 
                        placeholder="Name"
                        name="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                    <Input
                        placeholder="Price"
                        name="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                    <Input
                        placeholder="Image URL"
                        name="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    />
                    <Button colorScheme="blue" onClick={handleAddProduct}>
                        Add New Product
                    </Button>

                </VStack>
            </Box>
        </VStack>
    </Container>
  )
}

export default Createpage