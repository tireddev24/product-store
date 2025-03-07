/* eslint-disable react/prop-types */
import { Box, Button, chakra, Container, Flex, Heading, HStack, Icon, IconButton, Input, Menu, 
   MenuButton,  MenuDivider,  MenuList, 
    Radio,  RadioGroup, SimpleGrid, 
     SlideFade, 
     Spinner, Stack,  Text, textDecoration, useColorMode, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
     import {
      RangeSlider,
      RangeSliderTrack,
      RangeSliderFilledTrack,
      RangeSliderThumb,
    } from '@chakra-ui/react'
    import { FaDollarSign } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { params } from '../store/sortparameters'

const Homepage = () => {
  
  const {fetchProducts, products} = useProductStore()
  const toast = useToast()
  const [value, setValue] = useState('1')
  const [searchval, setSearchVal] = useState('')
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  const searchbg = useColorModeValue('white', "blue.900")

  const sortstatus = useRef("Newest")

  function handleRef (status){
    sortstatus.current = status
  }

  function handleClick(t,k,d,v){
    handleRef(t); 
    setSortKey({key:k, direction: d})
    setValue(v)
  }

  const [sortKey, setSortKey] = useState(params[1])

  const [rangeVal, setRangeVal] = useState([150, 100000]) 

  //sort products
  function getSortedProducts(product){
    if(searchval){
      const p =  product.filter(p => p.name.toLowerCase().includes(searchval.toLowerCase()))
      return p
    }
    if(sortKey.key === 's_price'){
      const p = product.filter(p => p.price >= rangeVal[0] && p.price <= rangeVal[1])
      return p
    }
  
    if(sortKey.key === 'fav'){
      return product.filter(p => p.fav === true)
    }
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


  //fetchdata
  useEffect(() => { 
    const get = async () => {

      try {
        await fetchProducts()
      } catch (e){
        setError(e)
      } finally {
        setIsLoading(false) 
      }
    }

    const timeout = setTimeout(() => {
      get()
      }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  function handleSliderChange(val){
    handleRef(params[1].title)
    setSortKey(params[1])
    setRangeVal(val)
  }

  function handleSlider(){
    handleRef('Price Range')
    setSortKey({key: 's_price', direction: 'asc'})
    toast({
      position: 'top',
      status: "success",
      description: 'Price range filter applied',
      variant: 'top-accent',
      colorScheme: 'blue',
      duration: 1500
    })
  }

  const rangeIcon = useColorModeValue('cyan.500', 'cyan.800')

  //loading
  if(isLoading){
    return (<VStack minH={'70vh'} justifyContent={'center'}  >
      <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
      />
      </VStack>     
    ) 
  }

  //unable to reach server error
  if(error){
    return ( 
    <VStack minH={'70vh'}  justifyContent={'center'}  >
      <Text fontSize={{base: 22, sm:30}}>Oops😢 <br /> Something went wrong. <br /> <Link style={{textDecoration: "underline"}} onClick={() => window.location.reload()}>Try again?</Link></Text>   
    </VStack>     
      ) 
    
  }

  return  (
    <Container maxW='container.xl' py={12} pos={'relative'} >
     <VStack spacing={10}>
      <Heading as={'h1'}
        size={{base: 'xl', lg:'2xl'}} 
        bgGradient={"linear(to-tr, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}>
        Current Products 
      </Heading>
      {/* search */}
      <Container position={'relative'} w={'22rem'} >
      <Input 
        placeholder='Search'
        onChange={(e) => setSearchVal(e.target.value)}
        name='search'
        value={searchval}
        border={'1px solid #00B5D8'}
        />
        <Icon position={'absolute'} fontSize={'2xl'} right={6} top={2} >
          <FaSearch />
        </Icon>
        <Box position={'absolute'} zIndex={2} w={'20rem'} 
        borderRadius={'0.2rem'} bg={searchbg} >

        {searchval && getSortedProducts(products).map((product) => {
          if(!product){
            console.log(1)
            return (
              <Box>
              <Text>No products found!</Text>
            </Box>
            )
          } else {
          return (
            <Box p={2.5} _hover={{bg: useColorModeValue('gray.100', 'cyan.500')}} borderRadius={'0.1rem'} cursor={'text'} textAlign={"left"}>
              <Text fontWeight={'bold'}>{product.name}</Text>
            </Box>
          )
        }} )}
      
        </Box>

      </Container>
      <RangeSlider colorScheme='blue' w={{base: '18rem', sm:'22rem', md:'25rem'}} 
      aria-label={['min', 'max']} defaultValue={rangeVal} min={0} max={100000}
       onChange={(val) => handleSliderChange(val)}>
      <RangeSliderTrack>
      <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={6} index={0} ><Box color={rangeIcon} as={FaDollarSign} /></RangeSliderThumb>
      <RangeSliderThumb boxSize={6} index={1}><Box color={rangeIcon} as={FaDollarSign} /></RangeSliderThumb>
      </RangeSlider>
      <HStack mt={5} pos={'relative'}>
        <Button onClick={() => handleSlider()} top={'-12'} right={0} position={'absolute'}>Apply</Button>
        <Input value={rangeVal[0]} type='number' onChange={(e) => setRangeVal([rangeVal[0]=e.target.value, rangeVal[1]])}  w={'10rem'} />
        <Input value={rangeVal[1]} type='number' onChange={(e) => setRangeVal([...rangeVal, rangeVal[1]=e.target.value])}  w={'10rem'} />
      </HStack>
      {products.length > 0 && 
      
      <Menu >
        <MenuButton w={{base:'10rem', sm:'15rem'}} textAlign={'left'} as={Button} my={'-1.5rem'} display={'flex'} size={'xl'} colorScheme='blue' p={2} alignItems={'center'} iconSpacing={{base:0, sm:1}} rightIcon={<IoIosArrowDown />} >
          <Text display={{base:'none',sm:'inline'}} fontWeight={'bold'}>Sort by: </Text>
          <Text display={'inline'} fontFamily={'Times-New-Roman'} fontWeight={'thin'}>{sortstatus.current}</Text>
        </MenuButton>
          <RadioGroup defaultValue={value} onChange={setValue} value={value}>
            <Stack p={2}>
              <MenuList mr={{base:'8rem', sm:0}} flexDirection={'column'} w={''} >
          {
            params.map((p) => 
              <Container  key={p.value}  onClick={() => handleClick(p.title, p.key, p.direction, p.value)} >
              <Radio p={{base:1, sm:1.2}} pb={'0'} value={p.value}  display={'flex'} alignItems={'center'} > 
              <Heading size={{base:'sm', sm:'sm'}}   key={p.value} justifyItems={'left'} w={''} >
              <Text _hover={{textDecoration: 'underline'}} >{p.title}</Text>
              </Heading>
              </Radio>  
              <MenuDivider  />
              </Container>
            ) 
          }
          </MenuList>
          </Stack>
          </RadioGroup>
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
        {
          getSortedProducts(products).map((product) => {
          return (
            <ProductCard key={product._id} product={product} />
          )}
        )
          
        }
      </SimpleGrid>


        {products.length === 0 && 
          <Text fontSize={'xl'} textAlign={"center"} fontWeight={'bold'} color={'gray.500'} >
          No Products Found {"😢"}
          <Link to={"/create"}>
          <Text as={'span'} ml={2} color='blue.500' _hover={{textDecoration: "underline"}}>
          Create a product
          </Text>
        </Link>
      </Text>}
 

     </VStack>
    
      </Container>
  )
}

export default Homepage