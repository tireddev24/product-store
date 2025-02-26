/* eslint-disable react/prop-types */
import { Button, Container,  Heading, Menu, 
   MenuButton,  MenuItem,  MenuList, 
    Radio,  RadioGroup,  Select,  SimpleGrid, 
     Stack,  StatArrow,  Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { params } from '../store/sortparameters'

const Homepage = () => {

  const { fetchProducts, products} = useProductStore()


  const filterOptions = () => {

  }

  const sortstatus = useRef("Newest")

  function handleRef (status){
    sortstatus.current = status
  }

  const [sortKey, setSortKey] = useState({key:'createdAt', direction: 'desc'})

  function getSortedProducts(product){
    if(sortKey.direction === 'asc'){
      if(sortKey.key === 'name' || sortKey.key === 'createdAt'){
        return product.sort((a,b) => a[sortKey.key].localeCompare(b[sortKey.key]))
      }
    return product.sort((a,b) => a[sortKey.key] - b[sortKey.key])
    } 
    return sortKey.key === 'name' || sortKey.key === 'createdAt'?
     product.sort((a,b) => b[sortKey.key].localeCompare(a[sortKey.key]))    
    :
     product.sort((a,b) => b[sortKey.key] - a[sortKey.key])

  }


  useEffect(() => { fetchProducts() }, [fetchProducts])

  return (
    <Container maxW='container.xl' py={12} pos={'relative'} >
     <VStack spacing={10}>
      <Heading as={'h1'}
        size={{base: 'xl', lg:'2xl'}} 
        bgGradient={"linear(to-tr, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}>
        Current Products 
      </Heading>
      {products.length > 0 && 

      <Menu>
        <MenuButton as={Button} my={'-1.5rem'} display={'flex'} size={'xl'} colorScheme='blue' p={2} alignItems={'center'} iconSpacing={{base:0, sm:1}} rightIcon={<IoIosArrowDown />} >
          <Text display={{base:'none',sm:'inline'}} fontWeight={'bold'}>Sort by: <Text display={'inline'} fontFamily={'Times-New-Roman'} fontWeight={'thin'}>{sortstatus.current}</Text></Text>
        </MenuButton>
        <MenuList bgColor={'blue.300'}>
          <RadioGroup defaultValue='1'>
            <Stack p={2}>
          {
            params.map((p) => 
              <Radio value={p.value}><Text  onClick={() => {handleRef(p.title); setSortKey({key:p.key, direction: p.direction})}}>{p.title}</Text></Radio>  
              // <MenuItem onClick={() => {handleRef(p.title); setSortKey({key:p.key, direction: p.direction})}}>{p.title}</MenuItem>  
            ) 
          }
          </Stack>
          </RadioGroup>
      </MenuList>
      </Menu>
      }
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg:3
        }}
        spacing={10}
        w={'full'}
        mx={10}
        placeItems={{base:'center', md:'left'}}
      >
        {getSortedProducts(products).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>


        {products.length === 0 && 
          <Text fontSize={'xl'} textAlign={"center"} fontWeight={'bold'} color={'gray.500'} >
        No Products Found {" "}
        <Link to={"/create"}>
          <Text as={'span'} color='blue.500' _hover={{textDecoration: "underline"}}>
            Create a product
          </Text>
        </Link>
      </Text>}
 

     </VStack>
    
      </Container>
  )
}

export default Homepage