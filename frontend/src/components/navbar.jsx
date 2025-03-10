import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { BsHouse, BsPlusSquare } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";

const Navbar = () => {

    const {colorMode, toggleColorMode} = useColorMode()
    
    const location = useLocation()
    const path = location.pathname

  return (
    <Container pt={2} maxW={'1240px'} px={4} >
        <Flex 
            h={16}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexDir={{
                base: "column",
                sm: "row",
            }}

        >
        <Text 
            fontSize={{base: "26", sm: '28', 'lg':"32"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            mt={{base:12,sm:'0'}}
        >
            <Link to={'/'}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"} position={{base:'absolute', sm: "relative"}} 
        justify={{base:'space-between', sm:'normal'}} w={{base:'22rem', sm:'10rem'}} 
        mx={{base:-2, sm:0}}  my={{base:'2px', sm: '0px'}} >
            <Link to={'/fav'}>
            <Button>
                <GoHeartFill size={'20'}/>
            </Button>
            </Link>

            <Link to={path.includes('/create')? '/' : '/create'}>
                <Button>
                { path.includes('/create')? 
                    <BsHouse fontSize={20} />
                :    <BsPlusSquare fontSize={20} />
                }
                </Button>
            </Link>
            <Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon size={'20'}/> : <LuSun size='20' />}
                </Button>
            </Link>
            
        </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar
