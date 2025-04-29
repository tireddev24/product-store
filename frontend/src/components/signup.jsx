import {
  Alert,
  AlertIcon,
  Button,
  Container,
  DarkMode,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import Spin from "../components/spinner";

const SignUp = ({
  SignUpData,
  disabled,
  invalid,
  handleRegister,
  loading,
  pass,
  showPass,
  setSignUpData,
  userName,
}) => {
  useEffect(() => {
    const signUp = (e) => {
      if (e.key === "Enter" && !disabled) {
        handleRegister();
      }
    };
    window.addEventListener("keydown", signUp);

    return () => {
      window.removeEventListener("keydown", signUp);
    };
  });

  return (
    <Container maxW={"2xl"} mt={{ base: "2rem", md: "15vh" }}>
      <VStack
        spacing={4}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"2xl"}
        p={4}
      >
        <Heading
          as={"h2"}
          my={1}
          size={{ base: "lg", md: "xl" }}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          Sign up to Product Store
        </Heading>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          minW={{ base: "17rem", md: "xl" }}
          columnGap={10}
          mt={2}
          gap={8}
        >
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              variant={"flushed"}
              placeholder="Enter your first name"
              required
              value={SignUpData.firstname}
              isRequired={true}
              onChange={(e) =>
                setSignUpData({ ...SignUpData, firstname: e.target.value })
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              variant={"flushed"}
              placeholder="Enter your last name"
              type="text"
              required
              value={SignUpData.lastname}
              isRequired={true}
              onChange={(e) =>
                setSignUpData({ ...SignUpData, lastname: e.target.value })
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              variant={"flushed"}
              placeholder="Enter your user name"
              type="text"
              value={SignUpData.username}
              isRequired={true}
              onChange={(e) => {
                setSignUpData({ ...SignUpData, username: e.target.value });
              }}
            />
            {SignUpData.username && SignUpData.username.length >= 8 && (
              <FormHelperText
                ml={1}
                fontSize={12}
                fontWeight={"bold"}
                wordBreak={"keep-all"}
                fontFamily={"monospace"}
                color={userName.success ? "green.600" : "red.500"}
                textAlign={"left"}
              >
                {userName.message}
              </FormHelperText>
            )}
            {SignUpData.username && SignUpData.username.length < 8 && (
              <FormHelperText
                ml={1}
                fontSize={12}
                fontWeight={"bold"}
                fontFamily={"monospace"}
                color={"red.500"}
                textAlign={"left"}
              >
                Username must be up to 8 characters!
              </FormHelperText>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={invalid.email}>
            <FormLabel>Email</FormLabel>
            <Input
              variant={"flushed"}
              type="email"
              placeholder="Enter your email"
              value={SignUpData.email}
              onChange={(e) =>
                setSignUpData({ ...SignUpData, email: e.target.value })
              }
            />
            <FormErrorMessage mb={-5}>
              Please enter a valid email!
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={invalid.password}>
            <FormLabel>Password</FormLabel>
            <HStack w={"full"} position={"relative"}>
              <Input
                variant={"flushed"}
                placeholder="Enter your password"
                type={pass ? "text" : "password"}
                value={SignUpData.password}
                minLength={8}
                maxLength={16}
                isRequired={true}
                required
                onChange={(e) =>
                  setSignUpData({ ...SignUpData, password: e.target.value })
                }
              />
              <Button
                variant={"unstyled"}
                alignItems={"center"}
                pos={"absolute"}
                zIndex={2}
                right={0}
                onClick={() => showPass((prevPass) => !prevPass)}
              >
                {pass ? <BsEyeSlash size={20} /> : <BsEyeFill size={20} />}
              </Button>
            </HStack>
            <FormHelperText ml={1} float={"left"}>
              Password must be up to 8 characters
            </FormHelperText>
          </FormControl>

          <FormControl isRequired isInvalid={invalid.password}>
            <FormLabel>Confirm Password</FormLabel>
            <HStack w={"full"} position={"relative"}>
              <Input
                variant={"flushed"}
                placeholder="Confirm your password"
                type={pass ? "text" : "password"}
                value={SignUpData.confirmPassword}
                minLength={8}
                maxLength={16}
                isRequired={true}
                required
                onChange={(e) =>
                  setSignUpData({
                    ...SignUpData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <Button
                variant={"unstyled"}
                pos={"absolute"}
                zIndex={2}
                right={0}
                onClick={() => showPass((prevPass) => !prevPass)}
              >
                {pass ? <BsEyeSlash size={20} /> : <BsEyeFill size={20} />}
              </Button>
            </HStack>
            <FormErrorMessage ml={1}>Passwords do not match!</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        {loading ? (
          <Spin />
        ) : (
          <Button
            disabled={disabled}
            variant={"outline"}
            mt={5}
            colorScheme="blue"
            onClick={handleRegister}
          >
            Sign up
          </Button>
        )}

        <VStack my={5}>
          <Text>Already have an account?</Text>
          <Link to={"/login"}>
            <Text
              bgGradient={"linear(to-r, cyan.400, blue.500)"}
              bgClip={"text"}
              cursor={"pointer"}
              fontWeight={"bold"}
              fontSize={{ base: 18 }}
              textDecoration={"underline"}
            >
              {" "}
              Login Here
            </Text>
          </Link>
        </VStack>
      </VStack>
    </Container>
  );
};

export default SignUp;
