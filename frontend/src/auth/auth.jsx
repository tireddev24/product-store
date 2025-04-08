import { useToast } from '@chakra-ui/react';
import { useContext, createContext, useState, useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom';

const AuthContext =  createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [sessionTime, setSessionTime] = useState(null)
    const storedData = JSON.parse(sessionStorage.getItem('user_data'))

    useEffect(() => {
        if(storedData){
            const {userToken, user} = storedData
            setUserData(user)
            setToken(userToken)
            setIsAuthenticated(true)

        }
    },[])

    const login = (newToken, newData, expireTime) => {
        sessionStorage.setItem('user_data', JSON.stringify({
           userToken: newToken,
            user: newData
        }))

        setToken(newToken)
        setUserData(newData)
        setIsAuthenticated(true)
        setSessionTime(expireTime)
    }

    const logout = () => {
        sessionStorage.removeItem('user_data')
        setToken(null)
        setUserData(null)
        setIsAuthenticated(false)
    }


    return <AuthContext.Provider value={{token, isAuthenticated, login, logout, userData, sessionTime}}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => useContext(AuthContext)