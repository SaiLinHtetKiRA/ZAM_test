"use client";

import React, { Component, Suspense, useEffect, useState } from "react";
import { searchParams, Anime } from "@/type";
import Home from "@/components/home";
import Swiper from "@/components/AnimesSwiper";
import { useSelector } from "react-redux";

const Page = ({ searchParams }: { searchParams: searchParams }) => {
  const [data, setData] = useState<Anime[]>();
  const [PopularAnime, setPopularAnime] = useState<Anime[]>();
  const [RandomAnimes, setRandomAnimes] = useState<Anime[]>();

  const { Type, socket } = useSelector((state: any) => state.state);
  useEffect(() => {
    socket.emit("NewestAnime", Type);
    socket.emit("PopularAnime", Type);
    socket.emit("RandomAnimes", Type);

    socket.on("NewestAnime", (data: Anime[]) => {
      setData(data);
    });
    socket.on("PopularAnime", (data: Anime[]) => {
      setPopularAnime(data);
    });
    socket.on("RandomAnimes", (data: Anime[]) => {
      setRandomAnimes(data);
    });
  }, [Type]);

  return (
    <>
      <Home />
      <Swiper data={data} Title="Recently Uploaded" />
      <Swiper data={PopularAnime} Title="Popular" />
      <Swiper data={RandomAnimes} Title="Random" />
    </>
  );
};

export default Page;
