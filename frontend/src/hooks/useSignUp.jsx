import { useState } from 'react'
import {useAuth} from '../auth/auth'

const useSignUp = () => {
  
    const {login} = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const registerUser = async (values) => {
        if(values.password !== values.confirmPassword){
            setError("Passwords do not match")
        }

        try{
            setError(null)
            setLoading(true)
            const res = await fetch('http://localhost:8002/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values)
            })
            if(!res){
                setError("Unable to communicate with server")
                return {success: false, message:"Unable to communicate with server" }
            }
            
            const data = await res.json()


            if(res.status===201){
                login(data.token, data.user, data.expire)

                return {success: data.success, message: data.message}
            } else if (res.status === 400) {
                setError(data.message)

                return {success: data.success, message: data.message}
            } else {
                setError("Registration failed")

                return {success: data.success, message: "Registration failed!"}
            }

        } catch (error){
            setError(error.message)
            return {success: false, message:"Unable to communicate with server" }

        } finally {
            setLoading(false)
        }
    }

    return { loading, error, registerUser}
}

export default useSignUp