import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import Downtime from "../components/downtime/downtime";

const Landing = () => {
  //maintenance
  if (false) {
    return (
      <>
        <Downtime />
      </>
    );
  }

  const [show, setShow] = useState(false);

  useEffect(() => {
    const rest = document.getElementById("rest");

    // document.getElementById("rest").addEventListener('click', () => {setShow(false)})
    // document.getElementById("rest").addEventListener('mousemove', () => {setShow(false)})

    const events = ["keydown", "scroll", "resize"];

    events.forEach((event) => {
      rest.addEventListener(event, () => setShow(false));
    });

    return () => {
      events.forEach((event) => {
        rest.removeEventListener(event, () => setShow(false));
      });
    };
  }, []);

  return (
    <Box minH={"100vh"} pt={1} pb={10}>
      <div id="rest">
        <Navbar show={show} setShow={setShow} />
        <Outlet />
      </div>
    </Box>
  );
};

export default Landing;
