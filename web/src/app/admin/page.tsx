"use client";
import React, { Component } from "react";
import store from "@/redux/store";
import { Anime, searchParams } from "@/type";
import Card from "@/components/Card";
import Link from "next/link";
export default class page extends Component<{ searchParams: searchParams }> {
  componentDidMount(): void {
    const { socket, Type } = store.getState().state;
    socket.emit("all-Animes", Type);
    socket.on("all-Animes", (data) => {
      this.setState({ data });
    });
  }
  componentDidUpdate(prevProps: { searchParams: searchParams }): void {
    if (prevProps.searchParams.type == this.props.searchParams.type) {
      const { socket, Type } = store.getState().state;
      socket.emit("all-Animes", Type);
    }
  }
  state: { data: Array<Omit<Anime, "Poster"> & { Poster: string }> | [] } = {
    data: [],
  };
  render() {
    const { data } = this.state;
    return (
      <main>
        <h1 className="text-white/80 text-lg">Anime</h1>
        <section className="py-[5svh] flex flex-wrap gap-3">
          {data?.map((data) => (
            <Link href={{ pathname: `admin/${data._id}` }} key={data._id}>
              <Card Anime={{ ...data, path: "admin/" }} />
            </Link>
          ))}
        </section>
      </main>
    );
  }
}
