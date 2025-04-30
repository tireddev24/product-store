import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsHouse, BsPlusSquare } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { GoHeartFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/auth";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../store/product";
import { FaUnlockAlt } from "react-icons/fa";

const Navbar = ({ show, setShow }) => {
  const { isAuthenticated, userData, logout } = useAuth();
  const { cart, fetchCart } = useCartStore();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();
  const [path, setPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const getCart = async () => {
        const { success, message, res } = await fetchCart();
        if (!success && res && res === 401) {
          toast({
            status: "error",
            description: message,
          });
          await logout();
          navigate("/login");
        }
        cart && setCount(cart.length);
      };
      getCart();
    }
  }, [isAuthenticated, cart && cart.length]);

  useEffect(() => {
    const l_path = location.pathname;
    setPath(l_path);
  }, [location.pathname]);

  const handleLogOut = async () => {
    await logout();

    toast({
      status: "info",
      icon: <FaUnlockAlt />,
      title: "Logged Out",
      duration: 2500,
    });

    navigate("/");
  };

  const dropdown = useColorModeValue("gray.300", "gray.700");

  return (
    <Container minW={"full"} px={4}>
      <Flex
        h={16}
        flexShrink={0}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text
          fontSize={{ base: "26", sm: "28", lg: "32" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          // textAlign={"center"}
          mx={-2}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack
          spacing={2}
          alignItems={"center"}
          justify={{ base: "space-between", sm: "normal" }}
          mx={{ base: 2, sm: 0 }}
          my={{ base: "0px", sm: "0px" }}
        >
          <Link to={"/"}>
            <Button display={{ base: "none", md: "block" }}>
              <BsHouse fontSize={20} />
            </Button>
          </Link>

          {isAuthenticated && (
            <Link to={"/fav"}>
              <Button display={{ base: "none", md: "block" }}>
                {" "}
                <GoHeartFill size={"20"} />
              </Button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to={`profile/create`}>
              <Button display={{ base: "none", md: "block" }}>
                <BsPlusSquare fontSize={20} />
              </Button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to={`viewcart`}>
              <Button
                className="bg-red-600"
                display={{ base: "none", md: "block" }}
                _after={{
                  bg: dropdown,
                  top: "-3",
                  justifyContent: "center",
                  h: "22px",
                  w: "22px",
                  rounded: "full",
                  right: "-2",
                  fontWeight: "bold",
                  pos: "absolute",
                  content: `"${count}"`,
                }}
              >
                <FaShoppingCart fontSize={20} />
              </Button>
            </Link>
          )}

          {!path.includes("signup") && !isAuthenticated && (
            <Link to={"signup"}>
              <Button
                display={{ base: "none", md: "block" }}
                minW={"6.5rem"}
                _hover={{ textDecoration: "underline" }}
              >
                Sign up
              </Button>
            </Link>
          )}
          {!path.includes("login") && !isAuthenticated && (
            <Link to={`login`}>
              <Button
                display={{ base: "none", sm: "block" }}
                minW={"6.5rem"}
                colorScheme="cyan"
                _hover={{ textDecoration: "underline" }}
              >
                Login
              </Button>
            </Link>
          )}

          <Button
            onClick={toggleColorMode}
            display={{ base: "none", md: "block" }}
          >
            {" "}
            {colorMode === "light" ? (
              <IoMoon size={"20"} />
            ) : (
              <LuSun size="20" />
            )}
          </Button>

          {isAuthenticated && (
            <Button
              display={{ base: "none", sm: "block" }}
              colorScheme="red"
              onClick={handleLogOut}
              _hover={{ textDecoration: "underline" }}
            >
              Log Out
            </Button>
          )}

          <Box position={"relative"}>
            <Box
              display={{ base: "block", sm: "none" }}
              onClick={() => setShow((prevShow) => !prevShow)}
            >
              <Link>
                {isAuthenticated && userData._id && (
                  <Avatar
                    size={{ base: "md", sm: "xl" }}
                    zIndex={2}
                    name={userData.firstname + " " + userData.lastname}
                  >
                    <AvatarBadge
                      boxSize="1rem"
                      borderWidth={"2px"}
                      bg={!navigator.onLine ? "green.500" : "red.400"}
                    />
                  </Avatar>
                )}
                {!isAuthenticated && (
                  <Avatar size={"md"} zIndex={2} name={""} />
                )}
              </Link>
            </Box>
            <Box display={{ base: "none", sm: "block" }}>
              {isAuthenticated && userData._id && (
                <Link to={`profile`}>
                  <Avatar
                    size={{ base: "sm", sm: "md" }}
                    zIndex={2}
                    name={userData.firstname + " " + userData.lastname}
                  >
                    <AvatarBadge
                      boxSize="1rem"
                      borderWidth={"2px"}
                      bg={!navigator.onLine ? "green.500" : "red.400"}
                    />
                  </Avatar>
                </Link>
              )}
              {/* <Link to={'/login'}> */}
              {!isAuthenticated && (
                <Avatar size={{ base: "sm", sm: "md" }} zIndex={2} name={""} />
              )}
              {/* </Link> */}
            </Box>

            {!isAuthenticated && (
              <Box
                display={{ base: show ? "block" : "none", sm: "none" }}
                position={"absolute"}
                zIndex={2}
                right={2}
                w={{ base: "10rem", sm: "10rem" }}
                h={"max-content"}
                bg={dropdown}
                rounded={"md"}
              >
                <VStack my={5} onClick={() => setShow(false)}>
                  <Link>
                    <Button
                      onClick={toggleColorMode}
                      minW={"6.5rem"}
                      placeItems={"center"}
                      display={{ base: "block", md: "none" }}
                    >
                      {colorMode === "light" ? (
                        <IoMoon size={"20"} />
                      ) : (
                        <LuSun size="26" />
                      )}
                    </Button>
                  </Link>
                  {!path.includes("login") && (
                    <Link to={`login`}>
                      <Button
                        display={{ base: "block", sm: "none" }}
                        minW={"6.5rem"}
                        colorScheme="cyan"
                        _hover={{ textDecoration: "underline" }}
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                  {!path.includes("signup") && (
                    <Link to={"signup"}>
                      <Button
                        display={{ base: "block", sm: "none" }}
                        minW={"6.5rem"}
                        _hover={{ textDecoration: "underline" }}
                      >
                        Sign up
                      </Button>
                    </Link>
                  )}
                </VStack>
              </Box>
            )}
            {isAuthenticated && (
              <Box
                display={{ base: show ? "block" : "none", lg: "none" }}
                position={"absolute"}
                zIndex={2}
                right={2}
                w={{ base: "10rem", sm: "10rem" }}
                h={"max-content"}
                bg={dropdown}
                rounded={"md"}
              >
                <VStack my={5} onClick={() => setShow(false)}>
                  <Link>
                    <Button
                      onClick={toggleColorMode}
                      minW={"6.5rem"}
                      placeItems={"center"}
                      display={{ base: "block", md: "none" }}
                    >
                      {colorMode === "light" ? (
                        <IoMoon size={"20"} />
                      ) : (
                        <LuSun size="26" />
                      )}
                    </Button>
                  </Link>

                  <Link to={`/`}>
                    <Button minW={"6.5rem"} colorScheme="cyan">
                      Home
                    </Button>
                  </Link>

                  <Link to={`fav`}>
                    <Button minW={"6.5rem"} colorScheme="purple">
                      Favourites
                    </Button>
                  </Link>

                  <Link to={`viewcart`}>
                    <Button minW={"6.5rem"} colorScheme={"yellow"}>
                      View Cart
                    </Button>
                  </Link>

                  <Link to={`profile`}>
                    <Button minW={"6.5rem"} colorScheme="blue">
                      Profile
                    </Button>
                  </Link>

                  <Button
                    minW={"6.5rem"}
                    colorScheme="red"
                    onClick={handleLogOut}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Log Out
                  </Button>
                </VStack>
              </Box>
            )}
          </Box>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
