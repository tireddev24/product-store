import { VStack, Spinner } from "@chakra-ui/react"

const Spin = () => {
  return (
     <VStack h={'50px'} justifyContent={'center'}  >
        <Spinner thickness='4px' speed='0.55s' emptyColor='gray.600' color='blue.500' size='xl' />
    </VStack>
  )
}

export default Spin