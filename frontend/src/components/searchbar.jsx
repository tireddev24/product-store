import { Container, Input, Icon, Box, Text, useColorModeValue } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchval, products, sortKey, getSortedProducts, setSearchVal }) => {

  const searchbg = useColorModeValue('white', "blue.900")

  return (
    <Container position={'relative'} w={{ base: '17rem', sm: '22rem' }} >
      <Input
        variant={'flushed'}
        placeholder='Product Name'
        onChange={(e) => setSearchVal(e.target.value)}
        name='search'
        value={searchval}
        borderBottomColor={'cyan.700'}
        p={2}
        
        // border={'1px solid #00B5D8'}
      />
      <Icon position={'absolute'} fontSize={'2xl'} right={6} top={2} >
        <FaSearch />
      </Icon>
      <Box position={'absolute'} zIndex={2} w={'20rem'}
        borderRadius={'0.2rem'} bg={searchbg} >
        {searchval && getSortedProducts(products, searchval, sortKey).map((product) => {
          if (!product) {
            console.log(1)
            return (
              <Box>
                <Text>No products found!</Text>
              </Box>
            )
          } else {
            return (
              <Box p={2.5} _hover={{ bg: useColorModeValue('gray.100', 'cyan.500') }} borderRadius={'0.1rem'} cursor={'text'} textAlign={"left"}>
                <Text fontWeight={'bold'}>{product.name}</Text>
              </Box>
            )
          }
        })}

      </Box>
    </Container>
  )
}

export default SearchBar