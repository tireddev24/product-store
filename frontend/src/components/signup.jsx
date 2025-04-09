import { Alert, AlertIcon, Button, Container, DarkMode, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Stack, Text, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { useLoginStore } from '../store/login.js'
import { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import useSignUp from '../hooks/useSignUp.jsx'
import { useAuth } from '../auth/auth.jsx'
import Spin from '../components/spinner';



const SignUp = () => {

    const navigate = useNavigate()
    const { isAuthenticated, userData } = useAuth()
    const { loading, error, registerUser} = useSignUp()

    const {signUp, checkUsername} = useLoginStore()

    const toast = useToast()
    const [pass, showPass] = useState(false)
    const [SignUpData, setSignUpData] = useState({
        firstname: "",
        lastname:"",
        email:"",
        // username:"",
        password:"",
        confirmPassword:""
    })

    const [disabled, setDisabled] = useState(true)
    const [invalid, setInvalid] = useState(false)

    useEffect(() => {
        
        if(SignUpData.email && SignUpData.password.length >= 8 && SignUpData.confirmPassword.length >= 8 && SignUpData.firstname && SignUpData.lastname){
            setDisabled(false)
    
        } else {
            setDisabled(true)
        }

        
    },[SignUpData])

    const handleRegister = async () => {

        const {success, message} = await registerUser(SignUpData)

        toast({
            position: 'top',
            status: success? 'success' : 'error',
            description: message,
            isClosable: false,
            duration: 1500,
        })
        
        if(success === true){
            setSignUpData({firstname: "", lastname:"", email:"", username:"", password:"",  confirmPassword:""})
            navigate('/')
        }
    }


  return (
    <Container maxW={'xl'} minH={'100vh'} mt={'10vh'}>
        <VStack spacing={4} bg={useColorModeValue('whiteAlpha.800')} rounded={'md'} p={6}>
          <Heading as={'h2'} my={1} size={'2xl'} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
            Sign up to Product Store
            </Heading>
             <DarkMode>
              <Alert status='warning' fontFamily={'mono'} borderRadius={'0.7rem'}>
                <AlertIcon /> 
                    Please fill in all fields
                </Alert>
            </DarkMode>

            <Stack mt={2} w={'full'} direction={{base: 'column', md: 'row'}} >

            <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input placeholder='First Name' required value={SignUpData.firstname} isRequired={true} onChange={(e) => setSignUpData({...SignUpData, firstname:e.target.value})} />
            </FormControl>
            
            <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Last Name" type='text' required value={SignUpData.lastname} isRequired={true} onChange={(e) => setSignUpData({...SignUpData, lastname:e.target.value})} />
            </FormControl>
            </Stack>

            <HStack w={'full'}>

            {/* <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input placeholder='User Name' required value={SignUpData.username} isRequired={true} onChange={(e) =>{ setSignUpData({...SignUpData, username: e.target.value}); }} />
                {SignUpData.username && <FormHelperText ml={1} color={userName.success? 'green.600' : 'red.500'} textAlign={'left'} >{userName.message}</FormHelperText> }
            </FormControl> */}
    
            <FormControl isRequired >
            <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='Email' value={SignUpData.email} onChange={(e) => setSignUpData({...SignUpData, email: e.target.value})} />
            </FormControl>
            </HStack>

            <FormControl isRequired isInvalid={invalid}>
                <FormLabel>Password</FormLabel>
                <HStack w={'full'} position={'relative'}>
                    <Input placeholder="Password" type={pass? 'text' : 'password'} value={SignUpData.password} minLength={8} maxLength={16}  isRequired={true}  required onChange={(e) => setSignUpData({...SignUpData, password:e.target.value})} />
                    <Button bg={'transparent'} _active={'transparent'} pos={'absolute'} borderLeft={'1px solid #A0AEC0'} borderLeftRadius={0} zIndex={2} right={0} onClick={() => showPass(prevPass => !prevPass)}>
                        {pass? <BsEyeSlash size={20} /> : <BsEyeFill  size={20} />}
                    </Button>
                </HStack>                                   
                <FormErrorMessage ml={1}>Password do not match!</FormErrorMessage>   
            </FormControl>

            <FormControl isRequired isInvalid={invalid} >
                <FormLabel>Confirm Password</FormLabel>
                <HStack w={'full'} position={'relative'}>
                <Input placeholder="Confirm password" type={pass? 'text' : 'password'} value={SignUpData.confirmPassword} minLength={8} maxLength={16}  isRequired={true}  required onChange={(e) => setSignUpData({...SignUpData, confirmPassword:e.target.value})} />
                <Button bg={'transparent'} _active={'transparent'} pos={'absolute'} borderLeft={'1px solid #A0AEC0'} borderLeftRadius={0} zIndex={2} right={0} onClick={() => showPass(prevPass => !prevPass)}>
                  {pass? <BsEyeSlash size={20} /> : <BsEyeFill  size={20} />}
               </Button>
                </HStack>                                   
                <FormErrorMessage ml={1}>Password do not match!</FormErrorMessage>
                <FormHelperText float={'left'}>Password must be up to 8 characters</FormHelperText>

            </FormControl>


                {loading? <Spin /> :
                   <Button disabled={disabled} variant={'outline'} mt={5} colorScheme='blue' onClick={handleRegister}>
                     Sign up
                </Button>
                }

            
            <VStack mt={5} ><Text >Already have an account?</Text>
            <Link to={'/login'} >
            <Text  bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"} cursor={'pointer'} fontWeight={'bold'} fontSize={{base: 18}} textDecoration={'underline'} > Login Here</Text>
            </Link>
             </VStack>
        </VStack>
    </Container>
  )
}

export default SignUp