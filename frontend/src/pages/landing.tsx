import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar";
import Downtime from "../components/downtime/downtime";

const Landing = () => {
  // Maintenance mode
  if (false) {
    return <Downtime />;
  }

  const [show, setShow] = useState(false);

  useEffect(() => {
    const rest = document.getElementById("rest");

    if (!rest) return;

    const hideMenu = () => setShow(false);

    const events = ["keydown", "scroll", "resize"];

    events.forEach((event) => {
      rest.addEventListener(event, hideMenu);
    });

    return () => {
      events.forEach((event) => {
        rest.removeEventListener(event, hideMenu);
      });
    };
  }, []);

  return (
    <div className="min-h-screen pt-1 pb-10">
      <div id="rest">
        <Navbar show={show} setShow={setShow} />
        <Outlet />
      </div>
    </div>
  );
};

export default Landing;