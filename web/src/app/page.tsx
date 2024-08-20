"use client";

import React, { Component, useContext, useEffect, useState } from "react";

import store from "@/redux/store";
import { searchParams, Home as Type } from "@/type";
import Home from "@/components/home";
import Swiper from "@/components/AnimesSwiper";

class page extends Component<{ searchParams: searchParams }> {
  componentDidMount(): void {
    const {
      state: { socket },
    } = store.getState();
    const { type } = this.props.searchParams;

    socket.emit("NewestAnime", type ? type : "Anime");
    socket.emit("PopularAnime", type ? type : "Anime");
    socket.emit("RandomAnimes", type ? type : "Anime");

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
  componentDidUpdate(
    prevProps: Readonly<{ searchParams: searchParams }>
  ): void {
    if (prevProps.searchParams.type != this.props.searchParams.type) {
      const {
        state: { socket },
      } = store.getState();
      const { type } = this.props.searchParams;

      socket.emit("NewestAnime", type ? type : "Anime");
      socket.emit("PopularAnime", type ? type : "Anime");
      socket.emit("RandomAnimes", type ? type : "Anime");
    }
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
