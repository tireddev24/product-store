import { Box, Button, Container, Heading,
    Input,useColorModeValue, 
    VStack, 
    Tooltip,
    Alert,
    AlertIcon,
    DarkMode} from "@chakra-ui/react";


const Create = ({handleAddProduct, setNewProduct, handleref, newProduct, nameref, priceref, imageref}) => {

  return (
    <Container maxW={"container.sm"} mt={0}>
    <VStack spacing={8}>
        <Heading as={"h1"} size={{base:'lg', sm:'xl' ,lg:"2xl"}} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"} textAlign={'center'}>
            Create New Product
        </Heading>
        <Box w={'full'}  bg={useColorModeValue("white", 'gray.800')} p={6} rounded={'lg'} shadow={'md'}
            >
                {/* create modal */}
            <VStack spacing={6}>
                <Heading as={"h4"} size={{base:'md', sm:"lg"}}>Enter Product Details</Heading>
                
                <Alert status='info' fontFamily={'mono'} w={'max-content'} rounded={'md'}>
                    <AlertIcon />
                    Please fill in all fields
                </Alert>
                
                <Tooltip fontWeight={'900'} fontFamily={'monospace'} borderRadius={'0.5rem'} hasArrow={true} label='Enter the name of your product' placement="bottom-start" openDelay={500}>
                <Input 
                    placeholder="Product name"
                    name="name"
                    ref={nameref}
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                </Tooltip>
                <Tooltip fontWeight={'900'} fontFamily={'monospace'} borderRadius={'0.5rem'} hasArrow={true} label='Enter price in dollars ($)' placement="bottom-start" openDelay={500}>
                <Input
                    placeholder="Price in dollars ($)"
                    name="price"
                    ref={priceref}
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                </Tooltip>
                <Tooltip w={'10rem'} fontWeight={'900'} fontFamily={'monospace'} borderRadius={'0.5rem'} label='Copy image url from an external site and paste here!' hasArrow={true} placement="bottom-start" openDelay={500} closeDelay={'200'}>
                <Input
                    placeholder="Copy and paste IMAGE URL here!"
                    name="image"
                    ref={imageref}
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
                </Tooltip>
              
                
                    <Button colorScheme="blue" onClick={() => {handleAddProduct(); handleref()}} >
                    Add New Product
                    </Button>
                

            </VStack>
        </Box>
    </VStack>
</Container>
  )
}

export default Create