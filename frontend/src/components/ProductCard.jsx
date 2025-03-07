import { Box, Modal, Image, Heading, 
    Text, HStack, IconButton, useColorModeValue,
     useToast, useDisclosure, ModalOverlay, 
     ModalContent, ModalHeader, ModalCloseButton, 
     ModalBody, VStack, Input, ModalFooter, Alert,
     AlertIcon, Button,
     Badge,
     LightMode,
      } from "@chakra-ui/react"
import {FiEdit} from "react-icons/fi"
import {FaTrashCan} from "react-icons/fa6"
import { useProductStore } from "../store/product"
import { useState } from "react"
import Deletealert from "./deletealert"
import { time } from "framer-motion"
import Newbadge from './newbadge'
import { GoHeart, GoHeartFill } from "react-icons/go"

const ProductCard = ({product}) => {

    const [updatedProduct, setUpdatedProduct] = useState(product)
    const [isFavourite, setIsFavourite] = useState(product.fav)
    const [favProd, setFavProd] = useState()
    
    const toast = useToast()
    const {updateFav, removeFav} = useProductStore()
    
    const {isOpen, onOpen, onClose } = useDisclosure()
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    
    const { deleteProduct, updateProduct }  = useProductStore()
    
    const handleUpdateProduct = async (pid, updatedProduct ) => {
        const {success, message} = await updateProduct(pid, updatedProduct)
        
        onClose()
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: false
            })
        } else {
            // setUpdatedProduct(updatedProduct)
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
                duration: 3000
            })
        }
    }

    const toggleFav = async (id, favStat)  => {
        setIsFavourite(prevIsFavourite => !prevIsFavourite)
      
        const setFav = async () => {
           const {success, message, data} =  await updateFav(id,{fav: !favStat})
            return {success : success, message: message, data: data}
        }
        
        

        const status =  await setFav()
        
        if(status.data){
            toast({
                position:'top',
                status: "success",
                description: (status).message,
                isClosable: false,
                duration: 3000, 
                variant: 'top-accent',
                colorScheme: "blue"
            })
        } else {
            toast({
                position:'top',
                status: "error",
                description: (status).message,
                isClosable: false,
                duration: 3000, 
                variant: 'top-accent',
                colorScheme: "blue"
            })
        }
    }

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const heart = useColorModeValue('#F6E05E', "#D69E2E")

  return (
    <Box 
    key={product._id}
    w={{base:"20rem", md:'21rem', lg:'full'}}
    position={'relative'}
    bg={bg}
    shadow={'lg'}
    rounded={'lg'}
    overflow={'hidden'}
    transition={'all 0.3s'}
    _hover={{transform: "translateY(-5px)", shadow: "xlvb "}}
    >
        <Newbadge dateCreated={product.createdAt} />
       <Image src={product.image} alt={product.name} h={{base:'8rem', lg:'12rem'}} w={'full'}  
         objectFit={'cover'} 
       /> 
        { isFavourite === true? 
    
        <IconButton position={"absolute"} right={2} fontSize={'30'}
        icon={<GoHeartFill color={heart} />} 
        onClick={() => toggleFav(product._id, isFavourite)} bg={'none'}/>

        : 

        <IconButton position={"absolute"} right={2} fontSize={'30'}
        icon={<GoHeart />} 
        onClick={() => toggleFav(product._id, isFavourite)} bg={'none'}/>
        }

        <Box p={4}>
        <Heading as='h3' size={{base:'md'}} mb={2}>
            {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={{base:'md', lg:'xl'}} color={textColor} mb={8}>
            ${product.price}
        </Text>
        <HStack spacing={2} position={'absolute'} display={{base:'flex', md:''}} bottom={2} right={{base:'', md:'2', lg:'3' }} justify={{base:'space-between'}} minW={{base:'18rem', md:'20rem', lg:'full'}} >
            <IconButton icon={<FiEdit />} ml={{base:'0', md:'auto'}} onClick={onOpen} colorScheme="blue"/>
            <IconButton icon={<FaTrashCan />} onClick={onDeleteOpen} colorScheme="red"/>
            <Deletealert isOpen={isDeleteOpen} onClose={onDeleteClose} product={product} updatedProduct={updatedProduct}/>
        </HStack>    

        </Box>

        {/* update modal */}
        <Modal isOpen={isOpen}  onClose={onClose} isCentered={true} closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent w={{sm: '23rem', md: 'full'}}>
            <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
            <ModalBody>
                <VStack spacing={4}>
                    <Alert status='warning' borderRadius={'0.7rem'}>
                       <AlertIcon />
                        Please fill in all fields
                    </Alert>
                    <Input placeholder='Product Name' name='name' value={updatedProduct.name}
                        required={true}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}

                    />
                    <Input placeholder='Price' name='price in dollars ($)' type="number" value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        required={true}

                    />
                    <Input placeholder='Copy and paste image URL here!' name='image' value={updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        required={true}

                    />
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct )}>
                 Update
                </Button>
                <Button variant={'ghost'} onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </ModalContent>



        </Modal>
        </Box>
  )
}

export default ProductCard