import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { BsTools } from "react-icons/bs";

const Downtime = () => {
  return (
    <Box>
      <VStack minH={"80vh"} justifyContent={"center"} align={"center"} p={4}>
            <BsTools fontSize={'10rem'}  color="#DD6B20" />
        <Heading size={"2xl"} color={"orange.500"}>
          Under Maintenance
        </Heading>
        <Text fontSize={"xl"} textAlign={"center"}>
          We are currently undergoing maintenance.
          <br />
          Please check back later.
        </Text>
      </VStack>
    </Box>
  );
};

export default Downtime;