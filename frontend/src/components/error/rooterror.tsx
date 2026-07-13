import { Button, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { MdError } from "react-icons/md";

const Rooterror = ({}) => {
  return (
    <VStack minH={"90vh"} spacing={10} justifyContent={"center"}>
      <Icon boxSize={"150px"} color={"red"} fontSize={"2xl"}>
        <MdError />
      </Icon>
      <VStack spacing={8}>
        <Heading as={"h2"} size={{ base: "lg", md: "2xl" }}>
          <Text>An unexpected error occured.</Text>
        </Heading>
        <Button
          size={"lg"}
          colorScheme="red"
          onClick={() => window.location.reload()}
        >
          Try Again?
        </Button>
      </VStack>
    </VStack>
  );
};

export default Rooterror;
