import {MenuButton, Menu, MenuList, Container, Text, RadioGroup, Radio, Heading, MenuDivider, Stack, Button} from '@chakra-ui/react'
import { IoIosArrowDown } from "react-icons/io";


const SortMenu = ({handleClick, params, sortstatus, value, setValue}) => {
  return (
      <Menu >
            <MenuButton w={{base:'10rem', sm:'15rem'}} textAlign={'left'} as={Button} mb={'-3rem'} display={'flex'} size={'xl'} colorScheme='blue' p={2} alignItems={'center'} iconSpacing={{base:0, sm:1}} rightIcon={<IoIosArrowDown />} >
              <Text display={{base:'none',sm:'inline'}} fontWeight={'bold'}>Sort by: </Text>
              <Text display={'inline'} fontFamily={'Times-New-Roman'} fontWeight={'thin'}>{sortstatus.current}</Text>
            </MenuButton>
              <RadioGroup defaultValue={value} onChange={setValue} value={value}>
                <Stack p={2}>
                  <MenuList flexDirection={'column'} w={''} >
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
  )
}

export default SortMenu