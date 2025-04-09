
import { Box } from '@chakra-ui/react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useColorModeValue } from '@chakra-ui/react'
import Navbar from './components/navbar'
import Homepage from './pages/HomePage.jsx'
import Favouritepage from './pages/FavouritePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Createpage from './components/createpage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import Cart from './components/cart.jsx'
import SignUp from './components/signup.jsx'
import Settings from './pages/Settings.jsx'



function App() {

  

  return (
    <Box  marginX={{base:'-2' , lg:'0'}} minW={'sm'} minH={'100vh'} bg={useColorModeValue("gray.200", "gray.900")}>
      {/* // <Container minW={'1920px'}> */}
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/fav' element={<Favouritepage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='/profile/:id/create' element={<Createpage />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/profile/:id/settings' element={<Settings />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/:id/viewcart' element={<Cart />} />
      </Routes>
      {/* </Container> */}
     </Box> 
  ) 
}

export default App
