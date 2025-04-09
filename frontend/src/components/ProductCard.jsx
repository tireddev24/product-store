import { Box, Modal, Image, Heading, 
    Text, HStack, IconButton, useColorModeValue,
     useToast, useDisclosure, ModalOverlay, 
     ModalContent, ModalHeader, ModalCloseButton, 
     ModalBody, VStack, Input, ModalFooter, Alert,
     AlertIcon, Button,
     Badge,
     LightMode,
     Tooltip,
      } from "@chakra-ui/react"
import {FiEdit} from "react-icons/fi"
import {FaPlus, FaTrash, FaMinus} from "react-icons/fa6"
import {IoMdCheckmark} from 'react-icons/io'
import { useCartStore, useProductStore, useProfileStore } from "../store/product"
import { useEffect, useState } from "react"
import Deletealert from "./deletealert"
import Newbadge from './newbadge'
import { GoHeart, GoHeartFill } from "react-icons/go"
import { useLocation} from "react-router-dom"
import { useAuth } from "../auth/auth"

const ProductCard = ({product, count, setCount, handleRemoveFromCart}) => {

    const { isAuthenticated, userData } = useAuth()
    const { updateProduct }  = useProfileStore()
    const {updateFav} = useProductStore()
    const {isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const location = useLocation()
    const {addToCart, fetchCart, cart} = useCartStore()
    const [inCart, setInCart] = useState(false)
    const storedData = JSON.parse(sessionStorage.getItem('user_data'))
    

    const pathname = location.pathname

    const [updatedProduct, setUpdatedProduct] = useState(product)
    const [isFavourite, setIsFavourite] = useState(product.fav)
    pathname.s

    const handleCart = async (pid) => {

        const cartProd = {
            productId: pid,
            prodownerId: product.owner._id,
            cartownerId: userData._id
        }

        const {success, message} = await addToCart(cartProd)
        if(success){ setInCart(true)}
        toast({
            status: success? 'success' : 'error',
            description: message,
            duration: 1500,
            variant: 'left-accent',
            position: 'top'
        })

    }
    
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

        if(!isAuthenticated){
            toast({
                status:'warning',
                description: 'Please login first'
            })
            return
        }

        
        
        const {success, message, data} =  await updateFav(id,{fav: !favStat})
        success && setIsFavourite(prevIsFavourite => !prevIsFavourite)
                
        toast({
            position:'top',
            status: "info",
            description: message, 
            colorScheme: "blue"
            })
    }

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")
    const heart = useColorModeValue('#D69E2E', "#ECC94B")

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
       <Image src={product.image} alt={product.name} h={{base:'8rem', lg:'12rem'}} w={'full'}  objectFit={'cover'} /> 
    
        {!pathname.includes('/profile') &&
        <IconButton position={"absolute"} right={2} fontSize={'30'}
        icon={isFavourite === true && isAuthenticated? <GoHeartFill color={heart} /> : <GoHeart />} 
        onClick={() => toggleFav(product._id, isFavourite)} bg={'none'}/> }


        <Box p={4}>
        <Heading as='h3' size={{base:'md'}} mb={2}>
            {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={{base:'md', lg:'xl'}} color={textColor} mb={8}>
            ${product.price}
        </Text>

        {/* {session._id && pathname.includes(`/profile/${session.username}`) && 
        <HStack spacing={2} position={'absolute'} display={{base:'flex', md:''}} bottom={2} right={{base:'', md:'2', lg:'3' }} justify={{base:'space-between'}} minW={{base:'18rem', md:'20rem', lg:'full'}} >
            <IconButton icon={<FiEdit />} ml={{base:'0', md:'auto'}} onClick={onOpen} colorScheme="blue"/>
            <IconButton icon={<FaTrash />} onClick={onDeleteOpen} colorScheme="red"/>
            <Deletealert isOpen={isDeleteOpen} onClose={onDeleteClose} product={product} updatedProduct={updatedProduct}/>
        </HStack>    
        } */}

        
       {!isAuthenticated && <Tooltip fontWeight={'600'} fontFamily={'monospace'} borderRadius={'0.5rem'} hasArrow={true} label='Login to add products to cart' placement="top" openDelay={-100}> 
        <Button disabled mb={5} leftIcon={<FaPlus />} float={'right'}>Add to cart</Button>
        </Tooltip>
        }
        <HStack justify={'space-between'}>
        <Text float={'left'} fontWeight={'bold'} >By: {product.owner.firstname + ' ' + product.owner.lastname}</Text>
        {isAuthenticated && !pathname.includes('profile') && !pathname.includes('/viewcart') && !inCart && <Button leftIcon={<FaPlus />} float={'right'} onClick={() => handleCart(product._id)}>Add to cart</Button>}
        {isAuthenticated && !pathname.includes('profile') && !pathname.includes('/viewcart') && inCart && <Button disabled cursor={'not-allowed'} leftIcon={<IoMdCheckmark />}  _disabled={{brightness: 100}} float={'right'} >Added to cart</Button>}
        {isAuthenticated && pathname.includes(`/profile`) && 
            <HStack spacing={2} position={''} float={'right'}>
            <IconButton icon={<FiEdit />} onClick={onOpen} colorScheme="blue"/>
            <IconButton icon={<FaTrash />} onClick={onDeleteOpen} colorScheme="red"/>
            <Deletealert isOpen={isDeleteOpen} onClose={onDeleteClose} product={product} updatedProduct={updatedProduct}/>
            </HStack>    
        }
        {isAuthenticated && pathname.includes('viewcart') && 
        <HStack spacing={-10}>
            <Button colorScheme="red" onClick={() => handleRemoveFromCart(product.cartItemId)}>Remove from cart</Button>

        {/* <IconButton icon={<FaMinus />} disabled={count === 0} onClick={() => setCount(count - 1)} />
        <Button colorScheme="blue" disabled _disabled={{brightness: 100}}>{count}</Button>
        <IconButton icon={<FaPlus />} onClick={() => setCount(count + 1)} /> */}
        </HStack>
        }
        {/* {isAuthenticated && pathname.includes('/') && inCart &&
        <HStack spacing={-10}>
        <IconButton icon={<FaMinus />} disabled={count === 0} onClick={() => setCount(count - 1)} />
        <Button colorScheme="blue" disabled _disabled={{brightness: 100}}>{count}</Button>
        <IconButton icon={<FaPlus />} onClick={() => setCount(count + 1)} />
        </HStack>
        } */}
    
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