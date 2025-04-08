import { Box, Button, Container, Heading,
    Input,useColorModeValue, 
    VStack, 
    Tooltip,
    Alert,
    AlertIcon,
    DarkMode} from "@chakra-ui/react";


const Createpage = ({handleAddProduct,setNewProduct,handleref, newProduct, nameref, priceref, imageref}) => {

  return (
    <Container maxW={"container.sm"} mt={8}>
    <VStack spacing={8}>
        <Heading as={"h1"} size={{base:'lg', sm:'xl' ,lg:"2xl"}} textAlign={'center'}  mb={6}>
            Create New Product
        </Heading>
        <Box w={'full'}  bg={useColorModeValue("white", 'gray.800')} p={6} rounded={'lg'} shadow={'md'}
            >
                {/* create modal */}
            <VStack spacing={6}>
                <Heading as={"h4"} size={{base:'md', sm:"lg"}}>Enter Product Details</Heading>
                <DarkMode>
                <Alert status='warning' fontFamily={'mono'} borderRadius={'0.7rem'}>
                    <AlertIcon />
                    Please fill in all fields
                </Alert>
                </DarkMode>
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
                    placeholder="Copy and paste URL here!"
                    name="image"
                    ref={imageref}
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    // _before={{content: '"jsjs"', display:'inline-block', color: 'red', h:'full', mr:'2'}}
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

export default Createpage