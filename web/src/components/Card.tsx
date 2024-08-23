import { FaImdb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { Component } from "react";
import { Anime } from "@/type";
import Image from "next/image";
import store from "@/redux/store";
export default class Card extends Component<{
  Anime: Anime;
}> {
  render() {
    const { _id, Poster, Title, Rating, Episodes, Complete, path } =
      this.props.Anime;

    return (
      <Link
        href={{
          pathname: path ? path + _id : _id,
          query: { ep: 1, type: store.getState().state.Type },
        }}
      >
        <div className="backdrop-blur-sm bg-gray-500/50 drop-shadow-lg shadow-lg shadow-white/5 pb-4 cursor-pointer w-[120px] sm:w-[120px] md:w-[160px] aspect-photo">
          <div className="relative w-full h-full">
            <Image
              src={Poster as string}
              alt={Title}
              width={1000}
              height={1000}
              quality={100}
              placeholder="blur"
              blurDataURL="../Loading.gif"
              loading="lazy"
              className="object-cover w-full h-full"
            />

            <span className="absolute bottom-2 right-3  w-fit  backdrop-blur-md bg-gradient-to-r from-80% from-white/90  to-transparent flex gap-x-1 items-center bg-clip-text pr-3 justify-center">
              <FaImdb className="fill-[#F5C518] bg-black/50 " />
              <span className="font-bold text-[10px] text-transparent">
                {Rating}
              </span>
            </span>
            {/* <span
              className={`absolute top-2 right-3 text-white ${
                Complete ? "bg-lime-500/80" : "bg-amber-500/80"
              } px-1.5 py-1 rounded-lg text-transparent `}
            >
              {Complete ? "C" : "O"}
            </span> */}
            <span
              className={`absolute top-2 right-3  px-1.5 py-1 ${
                Complete ? "bg-lime-500" : "bg-amber-500"
              } backdrop-blur-xl rounded-lg z-100`}
            />
          </div>

          <div className="flex flex-col pl-2 py-1">
            <span className="font-bold text-white/70 text-[15px] truncate">
              {Title}
            </span>
            <span className="text-xs text-white/50">
              Epiosde 1-{Episodes.length}
            </span>
          </div>
        </div>
      </Link>
    );
  }
}
