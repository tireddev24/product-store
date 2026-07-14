import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Favouritepage from "./pages/FavouritePage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import ProfilePage from "./pages/ProfilePage";
import Cart from "./components/cart";
import Settings from "./pages/Settings";
import Rooterror from "./components/error/rooterror";
import Landing from "./pages/LandingPage";
import Nopage from "./components/error/nopage";
import SignUpPage from "./pages/SignUpPage";
import Protected from "./utils/protected";

function App() {
  return (
    <div className="relative min-h-dvh bg-noir text-ivory antialiased">
      <div className="grain-overlay" aria-hidden="true" />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Landing />} errorElement={<Rooterror />}>
            <Route path="" element={<Homepage />} errorElement={<Rooterror />} />
            <Route path="signup" element={<SignUpPage />} errorElement={<Rooterror />} />
            <Route path="login" element={<LoginPage />} errorElement={<Rooterror />} />
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
            </Route>
            <Route path="settings" element={<Settings />} errorElement={<Rooterror />} />
          </Route>
          <Route path="*" element={<Nopage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
