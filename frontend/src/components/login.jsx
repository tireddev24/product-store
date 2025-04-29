import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Spin from "../components/spinner";
import { useEffect } from "react";

const Login = ({
  loading,
  pass,
  showPass,
  loginData,
  setLoginData,
  disabled,
  handleSignIn,
  invalid,
}) => {
  useEffect(() => {
    const signin = (e) => {
      if (e.key === "Enter" && !disabled) {
        handleSignIn();
      }
    };
    window.addEventListener("keydown", signin);

    return () => {
      window.removeEventListener("keydown", signin);
    };
  });

  return (
    <Container
      maxW={"xl"}
      justifyContent={"center"}
      //   mt={{ base: "15vh", md: "5rem" }}
      mt={"15vh"}
      px={4}
    >
      <VStack
        pos={"relative"}
        w={"full"}
        spacing={4}
        bg={useColorModeValue("white", "gray.800")}
        p={6}
        rounded={"2xl"}
      >
        <Heading
          as={"h3"}
          size={{ base: "lg", md: "xl" }}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          LOGIN TO PRODUCT STORE
        </Heading>
        <Box w={"sm"}>
          <Heading as={"h4"} size={"lg"}>
            Enter Login Details
          </Heading>
          <VStack spacing={5} p={6} mx={{ base: "2rem", md: "0" }}>
            <FormControl isRequired isInvalid={invalid.email}>
              <FormLabel>Email</FormLabel>
              <Input
                mt={-2}
                variant={"flushed"}
                type="text"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value.toLowerCase(),
                  })
                }
              />
              <FormErrorMessage>Please enter a valid email</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <HStack mt={-2} w={"full"} position={"relative"}>
                <Input
                  variant={"flushed"}
                  autoComplete="current_password"
                  type={pass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <Button
                  variant={"unstyled"}
                  pos={"absolute"}
                  right={-2}
                  zIndex={2}
                  float={"right"}
                  onClick={() => showPass((prevPass) => !prevPass)}
                >
                  {pass ? <BsEyeSlash size={20} /> : <BsEyeFill size={20} />}
                </Button>
              </HStack>
            </FormControl>

            {loading ? (
              <Spin />
            ) : (
              <Button
                disabled={disabled}
                w={"10rem"}
                mt={5}
                variant={"outline"}
                fontWeight={"bold"}
                alignItems={"center"}
                colorScheme="blue"
                onClick={() => handleSignIn()}
              >
                Login
              </Button>
            )}
          </VStack>
        </Box>

        <VStack mt={-5}>
          <Text>New to Product Store?</Text>
          <Link to={"/signup"}>
            <Text
              bgGradient={"linear(to-r, cyan.400, blue.500)"}
              bgClip={"text"}
              cursor={"pointer"}
              fontWeight={"bold"}
              fontSize={{ base: 18 }}
              textDecoration={"underline"}
            >
              {" "}
              Sign up Here
            </Text>
          </Link>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Login;
