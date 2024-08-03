"use client";

import React, { Component, useContext, useEffect, useState } from "react";
import { Router } from "next/router";
import store from "@/redux/store";
import Link from "next/link";
import { Anime, RouteByid, State } from "@/type";
class page extends Component<RouteByid> {
  componentDidMount(): void {
    const { id } = this.props.params;
    const {
      state: { socket },
    } = store.getState();
    socket.emit(id);
    socket.on(id, (data: Anime) => {
      this.setState({ data });
    });
  }
  state: State = {
    data: null,
  };

  render() {
    const { data } = this.state;

    if (!data) {
      return <>Loading</>;
    }
    return <div>{data.Title}</div>;
  }
}

export default page;
