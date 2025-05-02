/* eslint-disable react/prop-types */
import {
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useCartStore, useFavStore, useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { Link, Outlet } from "react-router-dom";
import { params, priceRange } from "../store/sortparameters";
import { getSortedProducts } from "../functions/handlers";
import { useAuth } from "../auth/auth";
import SortMenu from "../components/sortmenu";
import PriceRange from "../components/pricerange";
import SearchBar from "../components/searchbar";
import Spin from "../components/spinner";
import Navbar from "../components/navbar";

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();
  const { favorites, getFavorites } = useFavStore();
  const { cart } = useCartStore();
  const { isAuthenticated, userData } = useAuth();
  const toast = useToast();
  const [value, setValue] = useState("1");
  const [sortKey, setSortKey] = useState(params[0]);
  const [searchval, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rangeVal, setRangeVal] = useState([100, 100000]);

  const sortstatus = useRef("Newest");

  function handleRef(status) {
    sortstatus.current = status;
  }

  function handleClick(t, k, d, v) {
    handleRef(t);
    setSortKey({ key: k, direction: d });
    setValue(v);
  }

  //fetchdata
  useEffect(() => {
    const get = async () => {
      try {
        isAuthenticated && (await getFavorites());
        await fetchProducts();
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      get();
    }, 1500);
  }, []);

  function handleSliderChange(val) {
    handleRef(params[1].title);
    setSortKey(params[1]);
    setRangeVal(val);
  }

  function handleSlider() {
    handleRef("Price Range");
    setSortKey(priceRange);

    toast({
      position: "top",
      status: "success",
      description: "Price range filter applied",
      variant: "top-accent",
      colorScheme: "blue",
      duration: 1500,
    });
  }

  //loading
  if (isLoading) {
    return (
      <VStack minH={"100vh"} justify={"center"}>
        {" "}
        <Spin />{" "}
      </VStack>
    );
  }

  //unable to reach server error
  if (error) {
    return (
      <VStack minH={"70vh"} justifyContent={"center"}>
        <Text fontSize={{ base: 22, sm: 30 }}>
          Oops😢 <br /> Something went wrong. <br />{" "}
          <Link
            style={{ textDecoration: "underline" }}
            onClick={() => window.location.reload()}
          >
            Try again?
          </Link>
        </Text>
      </VStack>
    );
  }

  return (
    <Container maxW={"container.2xl"} px={10} py={1} pos={"relative"}>
      <VStack spacing={10}>
        <Heading
          as={"h1"}
          mt={"1.5rem"}
          size={{ base: "xl", md: "2xl" }}
          bgGradient={"linear(to-tr, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Heading>

        <SearchBar
          searchval={searchval}
          sortKey={sortKey}
          products={products}
          getSortedProducts={getSortedProducts}
          setSearchVal={setSearchVal}
        />

        {products.length > 0 && (
          <PriceRange
            handleSliderChange={handleSliderChange}
            handleSlider={handleSlider}
            rangeVal={rangeVal}
            setRangeVal={setRangeVal}
          />
        )}

        {products.length > 0 && (
          <SortMenu
            handleClick={handleClick}
            params={params}
            sortstatus={sortstatus}
            value={value}
            setValue={setValue}
          />
        )}

        {products && (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            w={"full"}
            spacing={10}
            minChildWidth={"20rem"}
            placeItems={{ base: "center", md: "left" }}
          >
            {getSortedProducts(products, searchval, sortKey, rangeVal).map(
              (product) => {
                const isFavourite =
                  favorites &&
                  favorites[0]?.favs.some(
                    (fav) => fav.product._id === product._id
                  );

                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    fav={isFavourite && isFavourite}
                  />
                );
              }
            )}
          </SimpleGrid>
        )}

        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No Products Found {"😢"}
            <Link to={"/create"}>
              <Text
                as={"span"}
                ml={2}
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Homepage;
