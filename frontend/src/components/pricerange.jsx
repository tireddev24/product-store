import {  RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb,
          VStack, Text, Box, useColorModeValue, HStack, Input, Button  } from "@chakra-ui/react"
import { FaDollarSign } from "react-icons/fa";


const PriceRange = ({handleSliderChange, handleSlider, rangeVal, setRangeVal}) => {

  const rangeIcon = useColorModeValue('cyan.500', 'cyan.800')

  return (
    <VStack >
        <Text fontWeight={'bold'}>Price Range</Text>
      <RangeSlider colorScheme='blue' w={{base: '16rem', sm:'20rem', md:'23rem'}} 
      aria-label={['min', 'max']} defaultValue={rangeVal} min={0} max={10000000}
       onChange={(val) => handleSliderChange(val)}>
      <RangeSliderTrack>
      <RangeSliderFilledTrack />
      </RangeSliderTrack>
      <RangeSliderThumb boxSize={6} index={0} ><Box color={rangeIcon} as={FaDollarSign} /></RangeSliderThumb>
      <RangeSliderThumb boxSize={6} index={1}><Box color={rangeIcon} as={FaDollarSign} /></RangeSliderThumb>
      </RangeSlider>
      <HStack mt={'2'} pos={'relative'}>
        <Input value={rangeVal[0]} type='number' onChange={(e) => setRangeVal([rangeVal[0]=e.target.value, rangeVal[1]])}  w={{base:'6rem', sm:'7rem'}} />
        <Input value={rangeVal[1]} type='number' onChange={(e) => setRangeVal([rangeVal[0], rangeVal[1]=e.target.value])}  w={{base:'6rem', sm:'7rem'}} />
        <Button onClick={() => handleSlider()} colorScheme='cyan'>Apply</Button>
      </HStack>
      </VStack>
  )
}

export default PriceRange