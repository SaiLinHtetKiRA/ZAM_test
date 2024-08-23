"use client";
import React, { Component, Suspense, useEffect, useState } from "react";
import store from "@/redux/store";
import { AnimeState, Tags } from "@/type";
import CategoriesSwiper from "@/components/CategoriesSwiper";
import TagsSwiper from "@/components/TagsSwiper";
import Sort from "@/components/Sort";
import { searchParams } from "@/type";
import { Fetchdata } from "@/function";
import Card from "@/components/Card";
import Pagebtn from "@/components/Pagebtn";
import { Anime } from "@/components/Anime";
import { AnimepageLoader } from "@/components/loader/Animepage";
import { useSelector } from "react-redux";
const Page: React.FC<{
  searchParams: searchParams;
}> = ({ searchParams }) => {
  const [Years, setYears] = useState<{ Year: string }[]>([]);
  const [Categories, setCategories] = useState<Tags[]>([]);
  const [Themes, setThemes] = useState<Tags[]>([]);
  const [Studios, setStudios] = useState<{ Studio: string }[]>([]);
  const { Type, socket } = useSelector((state: any) => state.state);

  useEffect(() => {
    socket.emit("getCategories", Type);
    socket.emit("getYears", Type);
    socket.emit("getThemes", Type);
    socket.emit("getStudios", Type);

    socket.on("getCategories", (data: Tags[]) => {
      setCategories(data);
    });
    socket.on("getYears", (data: { Year: string }[]) => {
      setYears(data);
    });
    socket.on("getStudios", (data: { Studio: string }[]) => {
      setStudios(data);
    });
    socket.on("getThemes", (data: Tags[]) => {
      setThemes(data);
    });
  }, [searchParams, Type]);
  // useEffect(() => {
  //   Fetchdata(searchParams).then((data) => setData(data));
  //   socket.emit("getCategories", Type);
  //   socket.emit("getYears", Type);
  //   socket.emit("getThemes", Type);
  //   socket.emit("getStudios", Type);

  //   socket.on("getCategories", (data: Tags[]) => {
  //     setCategories(data);
  //   });
  //   socket.on("getYears", (data: { Year: string }[]) => {
  //     setYears(data);
  //   });
  //   socket.on("getStudios", (data: Tags[]) => {

  //     setThemes(data);
  //   });
  //   socket.on("getThemes", (data: { Studio: string }[]) => {
  //     setStudios(data);
  //   });
  // }, []);

  return (
    <main className="px-[4%] sm:py-[9svh] sm:px-[6svh] py-[3%] ">
      <div className="w-full h-[5svh] bg-white/50 text-center rounded-xl">
        ADS Here
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 mt-2">
        <TagsSwiper
          field="year"
          data={[...new Set(Years.map((data) => data.Year))]}
          searchParams={searchParams}
          color=" ring-purple-600/80 bg-purple-600/80 text-white/80"
          color2=" ring-purple-600/80 bg-transparent text-purple-500/80 "
        />

        <TagsSwiper
          field="category"
          data={Categories.map((data) => data.Name)}
          searchParams={searchParams}
          color=" ring-rose-600/80 bg-rose-600/80 text-white/80"
          color2=" ring-rose-600/80 bg-transparent text-rose-500/80 "
        />

        <TagsSwiper
          field="theme"
          data={Themes.map((data) => data.Name)}
          searchParams={searchParams}
          color=" ring-cyan-600/80 bg-cyan-600/80 text-white/80"
          color2=" ring-cyan-600/80 bg-transparent text-cyan-500/80 "
        />

        <TagsSwiper
          field="studio"
          data={[...new Set(Studios.map((data) => data.Studio))]}
          searchParams={searchParams}
          color=" ring-fuchsia-600/80 bg-fuchsia-600/80 text-white/80"
          color2=" ring-fuchsia-600/80 bg-transparent text-fuchsia-500/80 "
        />
      </section>
      <section className="md:my-[3vh] sm:my-[3vh] ">
        <Sort searchParams={searchParams} />
        <div className="py-[1vh] px-[2vw]">
          <h1 className="text-white/90 font-bold text-4xl">Animes</h1>
          <Suspense fallback={<AnimepageLoader />}>
            <Anime searchParams={searchParams} />
          </Suspense>
        </div>
        {/* <Pagebtn length={data?.length} {...searchParams} /> */}
      </section>
    </main>
  );
};
export default Page;
