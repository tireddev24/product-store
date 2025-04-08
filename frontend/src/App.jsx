
import { Box, Container } from '@chakra-ui/react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Create from './pages/Create.jsx'
import Homepage from './pages/HomePage.jsx'
import Navbar from './components/navbar'
import { useColorModeValue } from '@chakra-ui/react'
import Favouritepage from './pages/Favourite.jsx'
import Login from './pages/login.jsx'
import Cart from './components/cart.jsx'
import SignUp from './components/signup.jsx'
import UserProfile from './pages/profile.jsx'
import Settings from './pages/Settings.jsx'



function App() {

  

  return (
    <Box  marginX={{base:'-2' , lg:'0'}} minW={'sm'} minH={'100vh'} bg={useColorModeValue("gray.200", "gray.900")}>
      {/* // <Container minW={'1920px'}> */}
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/fav' element={<Favouritepage />} />
        <Route path='login' element={<Login />} />
        <Route path='/profile/:id/create' element={<Create />} />
        <Route path='/profile/:id' element={<UserProfile />} />
        <Route path='/profile/:id/settings' element={<Settings />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:id/viewcart' element={<Cart />} />
      </Routes>
      {/* </Container> */}
     </Box> 
  ) 
}

export default App
