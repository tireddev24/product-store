
import { Box } from '@chakra-ui/react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Createpage from './pages/createpage.jsx'
import Homepage from './pages/homepage.jsx'
import Navbar from './components/navbar'
import { useColorModeValue } from '@chakra-ui/react'




function App() {


  return (
    <Box minW={'md'} marginX={{sm:'0', lg:'-5', xl:'-10'}} minH={'100vh'} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <Homepage />} />
        <Route path='/create' element={<Createpage />} />
      </Routes>
    </Box>
  )
}

export default App
