import { Box } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import Homepage from "./pages/HomePage.jsx";
import Favouritepage from "./pages/FavouritePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Cart from "./components/cart.jsx";
import Settings from "./pages/Settings.jsx";
import Rooterror from "./components/error/rooterror.jsx";
import Landing from "./pages/landing.jsx";
import Nopage from "./components/error/nopage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Protected from "./utils/protected.jsx";

function App() {
  return (
    <Box
      minW={"sm"}
      minH={"100vh"}
      bg={useColorModeValue("gray.200", "gray.900")}
    >
      <Routes>
        <Route path="/" element={<Landing />} errorElement={<Rooterror />}>
          <Route path="" element={<Homepage />} errorElement={<Rooterror />} />
          <Route
            path="signup"
            element={<SignUpPage />}
            errorElement={<Rooterror />}
          />
          <Route
            path="login"
            element={<LoginPage />}
            errorElement={<Rooterror />}
          />
          <Route
            path="viewcart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
            errorElement={<Rooterror />}
          />
          <Route
            path="fav"
            element={
              <Protected>
                <Favouritepage />
              </Protected>
            }
            errorElement={<Rooterror />}
          />
          <Route
            path="profile"
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
            errorElement={<Rooterror />}
          >
            <Route
              path="create"
              element={
                <Protected>
                  <CreatePage />
                </Protected>
              }
              errorElement={<Rooterror />}
            />
            <Route
              path="settings"
              element={<Settings />}
              errorElement={<Rooterror />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Box>
  );
}

export default App;
