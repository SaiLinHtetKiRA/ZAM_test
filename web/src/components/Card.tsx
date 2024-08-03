import { FaImdb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { Component } from "react";
import { Anime, AnimeState } from "@/type";
export default class Card extends Component<Anime> {
  render() {
    const { _id, Poster, Title, Rating, Episodes } = this.props.Anime;

    return (
      <Link href={_id}>
        <div className="backdrop-blur-sm bg-gray-500/50 drop-shadow-lg shadow-lg shadow-white/5 pb-4 cursor-pointer  w-[140px] sm:w-[160px]">
          <div className="relative">
            <img
              src={Poster}
              alt={Title}
              className="object-cover w-full h-[200px]  sm:h-[220px]"
            />

            <span className="absolute bottom-0 right-0 mb-2 mr-3 w-fit  backdrop-blur-md bg-gradient-to-r from-80% from-white/90  to-transparent flex gap-x-1 items-center bg-clip-text pr-3 justify-center">
              <FaImdb className="fill-[#F5C518] bg-black " />
              <span className="font-bold text-[10px] text-transparent">
                {Rating}
              </span>
            </span>
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
