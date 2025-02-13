import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { BsHouse, BsPlusSquare } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

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
            fontSize={{base: "22", sm: '28', 'lg':"32"}}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
        >
            <Link to={'/'}>Product Store</Link>
        </Text>
        <HStack spacing={1} alignItems={"center"} my={{base:'2px', sm: '0px'}} >
            <Link to={path.includes('/create')? '/' : '/create'}>
                <Button>
                { path.includes('/create')? 
                    <BsHouse fontSize={20} />
                :    <BsPlusSquare fontSize={20} />
                }
                </Button>
            </Link>
            
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
                </Button>
            
        </HStack>
        </Flex>
    </Container>
  )
}

export default Navbar