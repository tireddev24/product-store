import { Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {  useProfileStore } from '../store/product'
import { useAuth } from '../auth/auth'
import Spin from '../components/spinner'
import { Link } from 'react-router-dom'
import Profile from '../components/profile'


const ProfilePage = () => {

  const {userData, isAuthenticated} = useAuth()
  const {profileProducts, fetchPersonalProfile} = useProfileStore()

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const storedData = JSON.parse(sessionStorage.getItem('user_data'))
  

  useEffect(() => { 
    const get = async () => {
      try {
        await fetchPersonalProfile(storedData.user._id)
      } catch (e){
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(() => {  get() }, 1500)

  },[profileProducts])


  if(!isAuthenticated){
    return (
      <VStack minH={'100vh'}><Link to={'/login'}>
        Login to View Profile
      </Link>
      </VStack>
    )
  }

  if(error){
    return ( 
    <VStack minH={'70vh'}  justifyContent={'center'}  >
      <Text fontSize={{base: 22, sm:30}}>Oops😢 <br /> Something went wrong. <br /> <Link style={{textDecoration: "underline"}} onClick={() => window.location.reload()}>Try again?</Link></Text>   
    </VStack>     
      ) 
    
  }
  
  if(isLoading){ return  <VStack minH={'80vh'} justify={'center'}><Spin /></VStack> }

  return (
    <Profile 
    profileProducts={profileProducts}
    userData={userData}
    />
  )
}

export default ProfilePage