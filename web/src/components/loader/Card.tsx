import { FaImdb } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { Component } from "react";
import Image from "next/image";
import store from "@/redux/store";
export default class Card extends Component {
  render() {
    return (
      <div className=" backdrop-blur-sm bg-gray-500/50 drop-shadow-lg shadow-lg shadow-white/5 pb-4 cursor-pointer  sm:w-[140px] md:w-[160px] aspect-photo">
        <div className="relative w-full h-full">
          <Image
            src="/Loading.gif"
            alt=""
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL="../Loading.gif"
            loading="lazy"
            className="object-cover w-full h-full"
          />

          <span className="absolute bottom-2 right-3  w-fit  backdrop-blur-md bg-gradient-to-r from-80% from-white/90  to-transparent flex gap-x-1 items-center bg-clip-text pr-3 justify-center">
            <FaImdb className="animate-pulse fill-[#F5C518] bg-black/50 " />
          </span>
          <span className="absolute top-2 right-3 animate-pulse  px-1.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-transparent" />
        </div>

        <div className="flex flex-col p-2 py-1">
          <span className="animate-pulse w-full p-2 mb-1 bg-black/60 backdrop-blur-md rounded-full"></span>
          <span className="animate-pulse w-[50%] p-1  bg-black/60 backdrop-blur-md rounded-full" />
        </div>
      </div>
    );
  }
}
