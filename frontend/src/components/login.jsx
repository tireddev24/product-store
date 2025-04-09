import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Box, Button, Container, FormControl, FormLabel, Heading, HStack, Input, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import Spin from '../components/spinner';


const Login = ({loading, pass, showPass, loginData, setLoginData, disabled, handleSignIn}) => {

  return (
    <Container maxW={'xl'} minH={'100vh'} mt={'10vh'}>
        <VStack pos={'relative'}  w={'full'} spacing={4}  bg={useColorModeValue("white", 'gray.800')} p={6} borderRadius={'md'}>
            <Heading as={'h3'} size={'xl'} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
                LOGIN TO PRODUCT STORE
            </Heading>
            <Box w={'sm'}>
                <Heading as={'h4'} size={'lg'}>
                    Enter Login Details
                </Heading>
            <VStack p={6}>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type='text' placeholder='Email' value={loginData.email} onChange={(e) => setLoginData({...loginData, email : e.target.value})} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <HStack w={'full'} position={'relative'}>
                    <Input autoComplete='current_password' type={pass? 'text' : 'password'} placeholder='Password' value={loginData.password}
                     onChange={(e) => setLoginData({...loginData, password : e.target.value})} minLength={8} maxLength={16}/>
                    <Button bg={'transparent'} _active={'transparent'} pos={'absolute'} borderLeft={`1px solid ${useColorModeValue('#A0AEC0','#4A5568')}`} borderLeftRadius={0} zIndex={2} right={0} onClick={() => showPass(prevPass => !prevPass)}>
                    {pass? <BsEyeSlash size={20} /> : <BsEyeFill  size={20} />}
                    </Button>
                </HStack>
                </FormControl>
                
            {loading? <Spin /> : 
               <Button disabled={disabled} w={'10rem'} mt={5} variant={'outline'} fontWeight={'bold'} alignItems={'center'} colorScheme='blue' onClick={() => handleSignIn()}>
                Login
                </Button>
            }
            </VStack>
            </Box>

            <VStack mt={-5} ><Text >New to Product Store?</Text>
            <Link to={'/signup'} >
            <Text   bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"} cursor={'pointer'} fontWeight={'bold'} fontSize={{base: 18}} textDecoration={'underline'} > Sign up Here</Text>
            </Link>
             </VStack>
            
        </VStack>

    </Container>
  )
}

export default Login