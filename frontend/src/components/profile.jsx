import {  Button, Container, Heading,SimpleGrid,Text, VStack } from '@chakra-ui/react'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'


const Profile = ({profileProducts, userData }) => {
  return (
    <Container maxW={'container.xl'} minH={'100vh'} mt={'10vh'}>
      <VStack spacing={10}>
      <Heading as={'h1'} mt={'-1.5rem'} h={'max-content'} size={{base: 'xl', md:'2xl'}} 
        bgGradient={"linear(to-tr, cyan.400, blue.500)"} bgClip={"text"} textAlign={"center"}>
        Welcome to your profile, {userData.firstname}!
      </Heading>
      <Link to={`/profile/${userData.email}/create`}><Button alignSelf={{ base:'center', md: 'flex-end'}} colorScheme='blue' cursor={'pointer'} mr={{base:0, md:10}}>Add New</Button></Link>
      {profileProducts.length > 0 && <Text float={'right'} fontFamily={'monospace'} fontSize={'1.2rem'} fontWeight={'bold'}>You own {profileProducts.length} product(s). </Text>}
      {profileProducts.length > 0 && <SimpleGrid  columns={{base: 1, md: 2, lg: 3, }} spacing={10} w={'full'} mx={10} placeItems={{base:'center', md:'left'}} >
        {  
          profileProducts.map((product) => {
            return (
            <ProductCard key={product._id} product={product} />
          )}
        )
      }
      </SimpleGrid>}

      {profileProducts.length === 0 && 
                <VStack minH={'50vh'} justify={'center'}>
                  <Text fontSize={{base: '1.2rem', md:'1.7rem'}} fontWeight={'bold'}>You have not created any product(s).</Text>           
                </VStack>
                  }
      </VStack>
    
    </Container>
  )
}

export default Profile