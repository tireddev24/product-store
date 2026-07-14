import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Downtime from "../components/downtime/downtime";

const MAINTENANCE_MODE = false;

const Landing = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const rest = document.getElementById("rest");
    if (!rest) return;
    const hideMenu = () => setShow(false);
    const events = ["keydown", "scroll", "resize"] as const;
    events.forEach((event) => rest.addEventListener(event, hideMenu));
    return () => {
      events.forEach((event) => rest.removeEventListener(event, hideMenu));
    };
  }, []);

  if (MAINTENANCE_MODE) return <Downtime />;

  return (
    <div id="rest" className="min-h-screen relative flex flex-col text-ivory">
      <Navbar show={show} setShow={setShow} />

      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="mt-24  bottom-0 left-0 right-0 border-t border-hairline">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10 text-center md:px-10">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Product / Store</p>
          <p className="text-xs text-mute">
            &copy; {new Date().getFullYear()} — TireDev Development.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
