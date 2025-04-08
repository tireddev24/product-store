import { Avatar, Box, Button, Container, Flex, HStack, Icon, Text, useColorMode, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsHouse, BsPlusSquare } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { useLoginStore } from "../store/login";
import { useAuth } from "../auth/auth";
import { FaShoppingCart} from 'react-icons/fa'
import { useCartStore } from "../store/product";

const Navbar = () => {


    const { isAuthenticated, userData, logout, sessionTime } = useAuth()
    const {cart, fetchCart} = useCartStore()
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const toast = useToast()
    const [show, setShow] = useState(false)

    const storedData = JSON.parse(localStorage.getItem('user_data'))

    const {colorMode, toggleColorMode} = useColorMode()
    const [path, setPath] = useState('')
    const location = useLocation()

    
    useEffect(() => {
        if(isAuthenticated){
            const getCart = async () => {
                const {success, message, cartLength} = await fetchCart(storedData.user._id)
                setCount(cartLength)
            }
            getCart()
            return
        } 
    },[isAuthenticated, cart.length])


    useEffect(() => {

        if(isAuthenticated){

           const sessionExpired =  setTimeout(() => {
                logout()
                toast({
                    status: 'info',
                    description: `Session Expired. You have been logged out!`,
                    position: 'top',
                    variant: 'left-accent',
                 })
             }, 36000)
             navigate('/')
             clearTimeout(sessionExpired)
        }
            
    },[isAuthenticated])


    useEffect(() => {
        const l_path = location.pathname
        setPath(l_path)
        // setInterval(() => {setPath(l_path)},60000)

        // clearInterval()
    },[location.pathname])

    const handleLogOut = async  () => {
        await logout()

        toast({
            status: "info",
            description: "Logged Out",
            duration: 2500,
            variant: 'left-accent',
            position: "top-left",
            colorScheme: 'blue'
        })
        
        navigate('/')
        
        }

    const dropdown = useColorModeValue('gray.300', 'gray.700')

  return (
    <Container pt={2} maxW={'8xl'} px={4}  >
        <Flex  h={16} alignItems={'center'} justifyContent={'space-between'}
        
        >
        <Text 
            fontSize={{base: "26", sm: '28', 'lg':"32"}}    fontWeight={"bold"}
            textTransform={"uppercase"} textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}
        >
            <Link to={'/'}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"} 
        justify={{base:'space-between', sm:'normal'}}
        mx={{base:2, sm:0}}  my={{base:'0px', sm: '0px'}} >
            
            {path === '/' && isAuthenticated &&
            <Link to={isAuthenticated? '/fav' : '/login'}>
            <Button>    <GoHeartFill size={'20'}/>
            </Button>
            </Link> }
        
            {/* {(path.includes('create') || path.includes('fav')) && <Link to={'/'}><Button><BsHouse fontSize={20} /></Button></Link> } */}
            {/* {path.includes('login') && <Link to={'/'}><Button><BsHouse fontSize={20} /></Button></Link> } */}
            {isAuthenticated && !path.includes('/profile') && <Link to={`/${userData.username}/viewcart`} ><Button _after={{bg:useColorModeValue('gray.300','gray.600'),  top:'-3', justifyContent:'center', h:'22px', w: '22px', rounded:'full', right:'-2', fontWeight:'bold', pos:'absolute', content:`"${count}"`}}><FaShoppingCart fontSize={20}/></Button></Link>}
            {path.includes('/profile') && <Link to={`/profile/${userData.username}/create`}><Button><BsPlusSquare fontSize={20} /></Button></Link> }
            
            {!path.includes('signup') && !isAuthenticated && <Link to={'/signup'} ><Button display={{base: "none", lg: "block"}} minW={'6rem'}  _hover={{textDecoration: 'underline'}}>Sign up</Button></Link>}
            {!path.includes('login') && !isAuthenticated && <Link to={`/login`} ><Button display={{base: "none", lg: "block"}} minW={'rem'} colorScheme="cyan" _hover={{textDecoration: 'underline'}}>Login</Button></Link>}
            
            
            <Button onClick={toggleColorMode} display={{base: 'none', md: 'block'}}>  {colorMode === "light" ? <IoMoon size={'20'}/> : <LuSun size='20' />}</Button>
            
            {isAuthenticated &&<Button display={{base: "none", lg:"block"}} colorScheme="red" onClick={handleLogOut}  _hover={{textDecoration: 'underline'}}>Log Out</Button>}
            
            <Box position={'relative'}>
                <Box display={{base: "block", lg:"none"}} onClick={() => setShow(prevShow => !prevShow)} >
                    <Link>
                        {isAuthenticated && userData._id && <Avatar size={{base: 'sm', sm: 'md'}} zIndex={2} name={userData.firstname + " " + userData.lastname} /> }
                        {!isAuthenticated && <Avatar size={{base: 'sm', sm: 'md'}} zIndex={2} name={''} />}
                    </Link>
                </Box>
                <Box display={{base: "none", lg:"block"}}>
                    {isAuthenticated && userData._id && 
                    <Link to={`/profile/${userData.username}`}>
                    <Avatar size={{base: 'sm', sm: 'md'}} zIndex={2} name={userData.firstname + " " + userData.lastname} /> 
                    </Link>
                    }
                    <Link to={'/login'}>
                    {!isAuthenticated && <Avatar size={{base: 'sm', sm: 'md'}} zIndex={2} name={''} />}
                    </Link>
                </Box> 
                
                {!isAuthenticated && 
                    <Box display={{base:show? 'block' : 'none', lg:"none"}} position={'absolute'} zIndex={2} right={2} w={{base: '10rem', sm: '10rem'}} h={'max-content'} bg={dropdown} rounded={'md'}>
                        <VStack my={5} onClick={() => setShow(false)}>
                       <Link><Button onClick={toggleColorMode}  minW={'6.5rem'} placeItems={'center'} display={{base: 'block', md: 'none'}}>{colorMode === "light" ? <IoMoon size={'20'}/> : <LuSun size='26' />}</Button></Link>
                       {!path.includes('login') && <Link to={`/login`} ><Button  display={{base: "block", lg: "none"}} minW={'6.5rem'} colorScheme="cyan" _hover={{textDecoration: 'underline'}}>Login</Button></Link>}
                       {!path.includes('signup') && <Link to={'/signup'} ><Button display={{base: "block", lg: "none"}} minW={'6.5rem'}  _hover={{textDecoration: 'underline'}}>Sign up</Button></Link>}
                        </VStack>
                    </Box>
                }
                {isAuthenticated && <Box display={{base:show? 'block' : 'none', lg:"none"}} position={'absolute'} zIndex={2} right={2} w={{base: '10rem', sm: '10rem'}} h={'max-content'}  bg={dropdown} rounded={'md'}>
                    <VStack my={5} onClick={() => setShow(false)}>
                       <Link><Button onClick={toggleColorMode} minW={'6.5rem'} placeItems={'center'} display={{base: 'block', md: 'none'}}>{colorMode === "light" ? <IoMoon size={'20'}/> : <LuSun size='26' />}</Button></Link>
                        {path.includes('profile') &&  <Link to={`/`} ><Text _hover={{textDecoration: 'underline'}}><Button minW={'6.5rem'} colorScheme="purple" >Home</Button></Text></Link>}
                        {!path.includes('/viewcart') && <Link to={`/${userData.username}/viewcart`}><Button minW={'6.5rem'} colorScheme={"yellow"}>View Cart</Button></Link>}
                        {!path.includes('profile') &&  <Link to={`/profile/${userData.username}`} ><Button minW={'6.5rem'} colorScheme="blue" >My Profile</Button></Link>}
                        <Button minW={'6.5rem'} colorScheme="red" onClick={handleLogOut}  _hover={{textDecoration: 'underline'}}>Log Out</Button>
                    </VStack>
                </Box>
                }
            </Box>
        </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
