"use client";

import React, { Component, useContext, useEffect, useState } from "react";

import store from "@/redux/store";
import { Anime, Home as Type } from "@/type";
import Home from "@/components/home";
import Swiper from "@/components/AnimesSwiper";

class page extends Component {
  componentDidMount(): void {
    const {
      state: { socket },
    } = store.getState();
    socket.emit("NewestAnime");
    socket.emit("PopularAnime");
    socket.emit("RandomAnimes");

    socket.on("NewestAnime", (data) => {
      this.setState({ data });
    });
    socket.on("PopularAnime", (data) => {
      this.setState({ PopularAnime: data });
    });
    socket.on("RandomAnimes", (data) => {
      this.setState({ RandomAnimes: data });
    });
  }

  state: Type = {
    data: [],
    PopularAnime: [],
    RandomAnimes: [],
  };
  componentWillUnmount(): void {
    const {
      state: { socket },
    } = store.getState();
    socket.off("find-by-id");
  }
  render() {
    const { data, PopularAnime, RandomAnimes } = this.state;

    return (
      <>
        <Home />
        <Swiper data={data} Title="Recently Uploaded" />
        <Swiper data={PopularAnime} Title="Popular" />
        <Swiper data={RandomAnimes} Title="Random" />
      </>
    );
  }
}

export default page;
