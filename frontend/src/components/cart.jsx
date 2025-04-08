import { Center, Container, Heading, SimpleGrid, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { useCartStore } from '../store/product'
import Spin from './spinner'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/auth'

const Cart = ({}) => {

  const {cart, fetchCart, removeFromCart} = useCartStore()
  const {isAuthenticated, userData} = useAuth()
  const [count, setCount] = useState(1)
  const toast = useToast()


  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const storedData = JSON.parse(sessionStorage.getItem('user_data'))

  useEffect(() => {
    if(count === 0){
      //run remove from cart function

    }

    if(count > 1) {toast({
      status: count === 0? "success" : 'info',
      description: count === 0? 'Item removed from cart' : 'Added',
      
    })}

  },[count])

  useEffect(() => {
    const getCart = async () => {

      try{
        await fetchCart(storedData.user._id)
      } catch (err){
        setError(err)        
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {  getCart() }, 1500)

    // clearTimeout(delay)
    
  },[])

  const handleRemoveFromCart = async (pid) => {
      const {success, message} = await removeFromCart(pid)
      toast({
        status: success? 'success' : 'error',
        description: message,
        
      })
  }

  if(!isAuthenticated){
    return (
      <VStack minH={'70vh'} justify={'center'} >
        <Link to={'/login'} ><Text _hover={{textDecoration: 'underline'}}>
        Login to View Cart
        </Text>
      </Link>
      </VStack>
    )
  }

  
  if(isLoading){ return  <VStack minH={'60vh'} justify={'center'}><Spin /></VStack> }

  if(error){
    return ( 
    <VStack minH={'50vh'}  justifyContent={'center'}  >
      <Text fontSize={{base: 22, sm:30}}>Oops😢 <br /> Something went wrong. <br /> <Link style={{textDecoration: "underline"}} onClick={() => window.location.reload()}>Try again?</Link></Text>   
    </VStack>     
      ) 
    
  }

  return (
    <Container maxW='container.xl' py={12} pos={'relative'} >
      <VStack spacing={10}>
       <Heading as={'h1'} mt={'-1.5rem'} h={'max-content'} size={{base: 'xl', md:'2xl'}} 
              bgGradient={"linear(to-br, cyan.400, blue.500)"} bgClip={"text"} textAlign={"center"}>
              Welcome to your Cart, {userData.firstname}!
        </Heading>
        {cart.length > 0 && <Text float={'right'}>You have {cart.length} item(s) in your cart</Text>}
        {cart.length > 0 &&   <SimpleGrid columns={{base: 1, md: 2, lg: 3, }} spacing={10} w={'full'} mx={10} placeItems={{base:'center', md:'left'}}  >
          {cart.map(product => (
            <ProductCard  key={product.cartItemId} product={product} handleRemoveFromCart={handleRemoveFromCart} count={count} setCount={setCount}  />
          ) ) }
        </SimpleGrid>
        }
      
        {cart.length === 0 && 
          <VStack minH={'50vh'} justify={'center'}>
            <Text fontSize={{base: '1.2rem', md:'1.7rem'}} fontWeight={'bold'}>No product(s) have been added to cart.</Text>           
          </VStack>
            }
      </VStack>
    </Container>
  )
}

export default Cart