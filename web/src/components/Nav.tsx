"use client";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { IoReturnUpBack } from "react-icons/io5";
import { Home, Boxs, Search, Cross, About, Menu } from "@/svg";

import { setType } from "@/redux/state";
import { useDispatch, useSelector } from "react-redux";
const Nav: React.FC = () => {
  "use strict";
  const router = useRouter();
  const Pathname = usePathname();
  const { Type } = useSelector(
    (state: { state: { Type: string } }) => state.state
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const [search, setSearch] = useState<string>();
  const [scrolling, setScrolling] = useState<boolean>(true);
  useEffect(() => {
    window.addEventListener("scroll", () => setScrolling(false));
    window.addEventListener("scrollend", () => setScrolling(true));
    return () => {
      window.removeEventListener("scroll", () => {
        setScrolling(true);
      });
      window.addEventListener("scrollend", () => setScrolling(true));
    };
  }, []);

  const OnToggle = (e: BaseSyntheticEvent) => {
    dispatch(setType(e.target.checked ? "Hentai" : "Anime"));
    console.log(Pathname);
    if (Pathname == "/anime") {
      router.push(`?category=&studio=&theme=&year=&sort=&page=1`);
    }
  };
  return (
    <>
      {scrolling && (
        <nav className="fixed flex justify-center w-screen z-20 ">
          <section className="flex px-6 py-1.5 backdrop-blur-lg bg-black/30 items-center gap-3 w-fit justify-between mt-3  rounded-full mx-[10svw]">
            <div className="flex gap-1 items-center">
              {id && (
                <IoReturnUpBack
                  className="cursor-pointer object-fill size-10 stroke-white/80 "
                  onClick={() => router.back()}
                />
              )}

              <Image
                src={"/Logo.png"}
                alt="Logo"
                width={100}
                height={100}
                className="size-6 sm:size-10 cursor-pointer object-cover"
                onClick={() => router.push(`../`)}
              />
            </div>
            <div className="relative w-full  ">
              <input
                type="text"
                value={search}
                placeholder="Search something...."
                className="md:w-[55svw] sm:w-[30svw] rounded-full bg-white/10 backdrop-blur-lg  outline-none text-white/80 px-10 py-1 text-sm font-semibold peer"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="size-5 fill-white/60 peer-focus:fill-white absolute top-1 left-2 transition-all duration-300 ease-out" />
              <Cross
                className="size-5 stroke-white/60 peer-focus:stroke-white absolute top-1 right-2.5 transition-all duration-300 ease-out cursor-pointer peer-placeholder-shown:hidden"
                onClick={() => setSearch("")}
              />
            </div>
            <section className="relative group">
              <div className="rotate-90 sm:block md:hidden ">
                <Menu className={"size-7 stroke-white/80 "} />
              </div>
              <div
                className="hidden group-hover:flex sm:flex sm:relative absolute -left-5 top-11 flex-col sm:flex-row items-center gap-5  [*>&]:cursor-pointer backdrop-blur-xl
              sm:bg-transparent sm:backdrop-blur-none bg-black/70 p-3 rounded-xl sm:rounded-none sm:p-0 sm:top-0 sm:left-0"
              >
                <label className="inline-flex items-center  cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={OnToggle}
                    defaultChecked={Type == "Hentai" ? true : false}
                  />
                  <div className="relative w-11 h-6 bg-white/10 rounded-full peer   dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px]  after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white/20 backdrop-blur-lg after:bg-[url('/White.png')] peer-checked:after:bg-[url('/Black.png')]  peer-checked:after:bg-white after-bg-white after:bg-contain"></div>
                </label>
                <Home
                  className="size-6 stroke-white fill-none"
                  strokeWidth={24}
                  onClick={() => router.push(`../`)}
                />
                <Boxs
                  className="size-7 stroke-white fill-none"
                  onClick={() =>
                    router.push(
                      `../anime?category=&studio=&theme=&year=&sort=&page=1`
                    )
                  }
                />
                <About className="size-7 fill-white" />
              </div>
            </section>
          </section>
        </nav>
      )}
    </>
  );
};

export default Nav;
