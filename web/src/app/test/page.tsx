"use client";
import store from "@/redux/store";
import React, { useEffect, useState } from "react";

export default function page() {
  const [x, setx] = useState();
  useEffect(() => {
    const {
      state: { socket },
    } = store.getState();

    socket.emit("all-Animes");
    socket.on("Clicked", () => {
      setx("clicked");
    });
    socket.on("find-by-id", (data) => {
      setx("Yo");
    });
  }, []);
  console.log(x);
  return <div>page</div>;
}
