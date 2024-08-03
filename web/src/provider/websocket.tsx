"use client";
import React, { createContext } from "react";
import { io } from "socket.io-client";

export const WebSocketContext = createContext(null);
const Socket = io("http://localhost:5000/");
function Websocket({ children }) {
  return (
    <WebSocketContext.Provider value={{ Socket }}>
      {children}
    </WebSocketContext.Provider>
  );
}
export default Websocket;
