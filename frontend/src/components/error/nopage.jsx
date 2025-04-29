import { Box, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { TbFaceIdError } from "react-icons/tb";
import Navbar from "../navbar";

const Nopage = () => {
  return (
    <Box>
      <Navbar />
      <VStack minH={"70vh"} justifyContent={"center"} mx={"auto"} p={4}>
        <Icon boxSize={"150px"} color={"gray.500"} fontSize={"2xl"}>
          <TbFaceIdError />
        </Icon>
        <VStack spacing={10}>
          <Heading size={{ base: "lg", md: "xl", lg: "2xl" }} color={"red"}>
            PAGE NOT FOUND
          </Heading>
          <Text>The page you are looking for does not exist.</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Nopage;
