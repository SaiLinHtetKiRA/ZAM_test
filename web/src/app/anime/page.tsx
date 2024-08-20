"use client";
import React, { Component } from "react";
import store from "@/redux/store";
import { AnimeState, Tags } from "@/type";
import CategoriesSwiper from "@/components/CategoriesSwiper";
import TagsSwiper from "@/components/TagsSwiper";
import Sort from "@/components/Sort";
import { searchParams } from "@/type";
import { Fetchdata } from "@/function";
import Card from "@/components/Card";
import Pagebtn from "@/components/Pagebtn";
export default class page extends Component<{ searchParams: searchParams }> {
  componentDidMount(): void {
    const {
      state: { socket },
    } = store.getState();
    const { type } = this.props.searchParams;
    Fetchdata(this.props.searchParams).then((data) => this.setState({ data }));
    socket.emit("getCategories", type);
    socket.emit("getYears", type);
    socket.emit("getThemes", type);
    socket.emit("getStudios", type);

    socket.on("getCategories", (data) => {
      this.setState({ Categories: data });
    });
    socket.on("getYears", (data) => {
      this.setState({ Years: data });
    });
    socket.on("getStudios", (data) => {
      this.setState({ Studios: data });
    });
    socket.on("getThemes", (data) => {
      this.setState({ Themes: data });
    });
  }
  componentDidUpdate(
    prevProps: Readonly<{ searchParams: searchParams }>,
    prevState,
    snapshot
  ): void {
    if (prevProps.searchParams != this.props.searchParams) {
      Fetchdata(this.props.searchParams).then((data) =>
        this.setState({ data })
      );
    }
    if (prevProps.searchParams.type != this.props.searchParams.type) {
      const {
        state: { socket },
      } = store.getState();
      const { type } = this.props.searchParams;
      socket.emit("getCategories", type);
      socket.emit("getYears", type);
      socket.emit("getThemes", type);
      socket.emit("getStudios", type);
    }
  }

  state: AnimeState = {
    data: null,
    Years: [],
    Categories: [],
    Themes: [],
    Studios: [],
  };
  render() {
    const { data, Years, Categories, Themes, Studios } = this.state;
    return (
      <main className="px-[4%] sm:py-[9svh] sm:px-[6svh] py-[3%] ">
        <div className="w-full h-[5svh] bg-white/50 text-center rounded-xl">
          ADS Here
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 mt-2">
          <TagsSwiper
            field="year"
            data={[...new Set(Years.map((data) => data.Year))]}
            {...this.props}
            color=" ring-purple-600/80 bg-purple-600/80 text-white/80"
            color2=" ring-purple-600/80 bg-transparent text-purple-500/80 "
          />

          <TagsSwiper
            field="category"
            data={Categories.map((data) => data.Name)}
            {...this.props}
            color=" ring-rose-600/80 bg-rose-600/80 text-white/80"
            color2=" ring-rose-600/80 bg-transparent text-rose-500/80 "
          />

          <TagsSwiper
            field="theme"
            data={Themes.map((data) => data.Name)}
            {...this.props}
            color=" ring-cyan-600/80 bg-cyan-600/80 text-white/80"
            color2=" ring-cyan-600/80 bg-transparent text-cyan-500/80 "
          />

          <TagsSwiper
            field="studio"
            data={Studios.map((data) => data.Studio)}
            {...this.props}
            color=" ring-fuchsia-600/80 bg-fuchsia-600/80 text-white/80"
            color2=" ring-fuchsia-600/80 bg-transparent text-fuchsia-500/80 "
          />
        </section>
        <section className="md:my-[3vh] sm:my-[3vh] ">
          <Sort {...this.props} />
          <div className="py-[1vh] px-[2vw]">
            <h1 className="text-white/90 font-bold text-4xl">Animes</h1>
            <div className="flex ">
              <div className="flex flex-wrap gap-4 p-5 ">
                {data?.data?.map((anime) => (
                  <Card Anime={anime} />
                ))}
              </div>
            </div>
          </div>
          <Pagebtn length={data?.length} {...this.props} />
        </section>
      </main>
    );
  }
}
