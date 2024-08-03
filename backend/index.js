import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import admin from "./routes/admin.js";
import mongoosDB from "./config/db.js";
import dotenv from "dotenv";
import {
  fetchData,
  fetchByID,
  PopularAnime,
  NewestAnime,
  RandomAnimes,
} from "./function/index.js";

dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // credentials: true
  },
});
app.use(cors());
mongoosDB();
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("all-Animes", () => {
    fetchData().then((data) => socket.emit("all-Animes", data));
  });
  fetchData().then((data) =>
    data.map((Anime) =>
      socket.on(Anime._id, () =>
        fetchByID(Anime._id).then((data) => io.emit(Anime._id, data))
      )
    )
  );

  socket.on("NewestAnime", (id) => {
    NewestAnime().then((data) => io.emit("NewestAnime", data));
  });

  socket.on("RandomAnimes", (id) => {
    RandomAnimes().then((data) => io.emit("RandomAnimes", data));
  });

  socket.on("PopularAnime", (id) => {
    PopularAnime().then((data) => io.emit("PopularAnime", data));
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use("/admin", admin);
const PORT = 5000;
server.listen(PORT, () => console.log("connected"));
