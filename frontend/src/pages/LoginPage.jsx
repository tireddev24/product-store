import { useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import Login from '../components/login';

function LoginPage() {

    const {loading, loginUser} = useLogin()

    const [pass, showPass] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()

    const [loginData, setLoginData]  = useState({
        email: '',
        username:'',
        password: ''
    })
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if(loginData.email.includes('@') && loginData.email.includes('.') && loginData.password.length >= 8){
            setDisabled(false)
            return
        } else {
            setDisabled(true)
            return
        }
    }, [loginData])

    const handleSignIn = async () => {

        if(!loginData.email && !loginData.password){
            toast({status: 'warning', position: 'top', description: 'Please fill in a fields!'})
        }

        const{success, message} = await loginUser(loginData)
        
        toast({
                status: success? "success" : "error",
                position:'top',
                duration: 1500, 
                description: message
            })
        
        if(success === true){
            setLoginData({email: '', username:'', password: ''})
            navigate("/")
        }
    }



  return (
    <Login 
    loading={loading}
    pass={pass}
    showPass={showPass}
    loginData = {loginData}
     setLoginData = {setLoginData}
     disabled = {disabled}
     handleSignIn = {handleSignIn}
    
    />
  )
}

export default LoginPage