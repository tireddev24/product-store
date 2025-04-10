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
    const { isAuthenticated, userData, url } = useAuth()
    const { loading, error, registerUser} = useSignUp()

    const {signUp, checkUsername} = useLoginStore()

    const toast = useToast()
    const [pass, showPass] = useState(false)
    const [SignUpData, setSignUpData] = useState({
        firstname: "",
        lastname:"",
        email:"",
        username:"",
        password:"",
        confirmPassword:""
    })

    const [disabled, setDisabled] = useState(true)
    const [invalid, setInvalid] = useState({
        password: false,
        email: false,
    })

    useEffect(() => {

        
        // if(SignUpData.password && (SignUpData.password !== SignUpData.confirmPassword)){
        //     setInvalid({...invalid, password: true})
        // } else if(!SignUpData.password){
        //     setInvalid({...invalid, password: false})
        // } else {
        //     setInvalid({...invalid, password: true})
        // }
        
        if(SignUpData.email && SignUpData.username.length>=8 && SignUpData.password.length >= 8 && SignUpData.confirmPassword.length >= 8 && SignUpData.firstname && SignUpData.lastname && SignUpData.password === SignUpData.confirmPassword){
            setDisabled(false) 
        } else {
            setDisabled(true)
        }



        
    },[SignUpData])

    const [userName, setUserName] = useState({success: false, message: "Enter a username"})

    useEffect(() => {

        if(SignUpData.email.includes('@') && SignUpData.email.includes('.')){
            setInvalid({...invalid, email: false})
        } else if (SignUpData.email === ''){
            setInvalid({...invalid, email: false})
        }else {
            setInvalid({...invalid, email: true})
        }

        if(!SignUpData.username){
            setUserName({success: false, message: "Enter a username"})
            return
        }
        const checkUsername = async () => {
            const res = await fetch(`${url}/api/users/checkusername`, {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(SignUpData)
            })
            const data = await res.json()

            setUserName(data)
        }

        checkUsername()

        
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

            <Stack mt={2} w={'full'} direction={{base: 'column', md: 'row'}} >

            <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input placeholder='User Name' type='text' value={SignUpData.username} isRequired={true} onChange={(e) =>{ setSignUpData({...SignUpData, username: e.target.value}); }} />
                {SignUpData.username && SignUpData.username.length >= 8 && <FormHelperText ml={1} fontSize={12} fontWeight={'bold'} wordBreak={'keep-all'} fontFamily={'monospace'} color={userName.success? 'green.600' : 'red.500'} textAlign={'left'}>{userName.message}</FormHelperText>}
                {SignUpData.username && SignUpData.username.length < 8 && <FormHelperText ml={1} fontSize={12} fontWeight={'bold'} wordBreak={'keep-all'} fontFamily={'monospace'} color={'red.500'} textAlign={'left'} >Username must be up to 8 characters!</FormHelperText>}
            </FormControl>
    
            <FormControl isRequired isInvalid={invalid.email} >
            <FormLabel>Email</FormLabel>
                <Input type='email' placeholder='Email' value={SignUpData.email} onChange={(e) => setSignUpData({...SignUpData, email: e.target.value})}  />
                <FormErrorMessage mb={-5} >Please enter a valid email!</FormErrorMessage>
            </FormControl>
            </Stack>


            <FormControl isRequired isInvalid={invalid.password}>
                <FormLabel>Password</FormLabel>
                <HStack w={'full'} position={'relative'}>
                    <Input placeholder="Password" type={pass? 'text' : 'password'} value={SignUpData.password} minLength={8} maxLength={16}  isRequired={true}  required onChange={(e) => setSignUpData({...SignUpData, password:e.target.value})} />
                    <Button bg={'transparent'} _active={'transparent'} pos={'absolute'} borderLeft={'1px solid #A0AEC0'} borderLeftRadius={0} zIndex={2} right={0} onClick={() => showPass(prevPass => !prevPass)}>
                        {pass? <BsEyeSlash size={20} /> : <BsEyeFill  size={20} />}
                    </Button>
                </HStack>                                   
            </FormControl>

            <FormControl isRequired isInvalid={invalid.password} >
                <FormLabel>Confirm Password</FormLabel>
                <HStack w={'full'} position={'relative'}>
                <Input placeholder="Confirm password" type={pass? 'text' : 'password'} value={SignUpData.confirmPassword} minLength={8} maxLength={16}  isRequired={true}  required onChange={(e) => setSignUpData({...SignUpData, confirmPassword:e.target.value})} />
                <Button bg={'transparent'} _active={'transparent'} pos={'absolute'} borderLeft={'1px solid #A0AEC0'} borderLeftRadius={0} zIndex={2} right={0} onClick={() => showPass(prevPass => !prevPass)}>
                  {pass? <BsEyeSlash size={20} /> : <BsEyeFill  size={20} />}
               </Button>
                </HStack>                                   
                <FormErrorMessage ml={1}>Passwords do not match!</FormErrorMessage>
                <FormHelperText ml={1} float={'left'}>Password must be up to 8 characters</FormHelperText>

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