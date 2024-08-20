import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import admin from "./routes/admin.js";
import anime from "./routes/anime.js";
import mongoosDB from "./config/db.js";
import dotenv from "dotenv";
import {
  fetchData,
  fetchByID,
  PopularAnime,
  NewestAnime,
  RandomAnimes,
  getCategories,
  getYears,
  getThemes,
  getStudios,
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

  socket.on("all-Animes", (type) => {
    fetchData(type).then((data) => socket.emit("all-Animes", data));
  });
  fetchData("Anime").then((data) =>
    data.map((Anime) =>
      socket.on(Anime._id, (Type) =>
        fetchByID(Anime._id, Type).then((data) => io.emit(Anime._id, data))
      )
    )
  );
  fetchData("Hentai").then((data) =>
    data.map((Anime) =>
      socket.on(Anime._id, (Type) =>
        fetchByID(Anime._id, Type).then((data) => io.emit(Anime._id, data))
      )
    )
  );
  //For Home
  socket.on("NewestAnime", (type) => {
    NewestAnime(type).then((data) => io.emit("NewestAnime", data));
  });

  socket.on("RandomAnimes", (type) => {
    RandomAnimes(type).then((data) => io.emit("RandomAnimes", data));
  });

  socket.on("PopularAnime", (type) => {
    PopularAnime(type).then((data) => io.emit("PopularAnime", data));
  });
  //For Animes
  socket.on("getCategories", (type) => {
    getCategories(type).then((data) => io.emit("getCategories", data));
  });
  socket.on("getThemes", (type) => {
    getThemes(type).then((data) => io.emit("getThemes", data));
  });
  socket.on("getYears", (type) => {
    getYears(type).then((data) => io.emit("getYears", data));
  });
  socket.on("getStudios", (type) => {
    getStudios(type).then((data) => io.emit("getStudios", data));
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use(express.json());
app.use("/admin", admin);
app.use("/anime", anime);

const PORT = 5000;
server.listen(PORT, () => console.log("connected"));
