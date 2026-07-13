import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useColorModeValue } from "./context/ThemeContext";
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
import { cn } from "./lib/cn";

function App() {
  const bg = useColorModeValue("bg-gray-200", "bg-gray-900");

  return (
    <div className={cn("min-h-screen min-w-sm", bg)}>
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
    </div>
  );
}

export default App;
