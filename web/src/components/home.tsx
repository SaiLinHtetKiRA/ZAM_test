import React, { Component } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

export class Home extends Component {
  render() {
    return (
      <motion.div
        // style={{ height: height, opacity: opacity }}
        className="relative w-screen overflow-hidden before:absolute before:bg-gradient-to-t before:w-full before:h-20 before:bottom-0 before:z-10 before:from-black/80 before:to-transparent z-10 "
      >
        <div
          style={{ backgroundImage: "url(/Overload.png)" }}
          className="relative bg-no-repeat bg-right w-full h-[50vh] bg-contain saturate-50 hue-rotate-15 brightness-75 contrast-100 shadow-inner drop-shadow-xl -z-10"
        >
          <div
            className=" ml-7 flex items-center w-[80%] h-full z-10 
        "
          >
            <span className="bg-gradient-to-r w-full from-[0%]  from-transparent via-[5%] via-black/20 to-[70%] to-transparent font-bold text-lg sm:text-3xl text-white/90 p-5  ">
              <div>Hello!</div>
              <span className="text-xs font-normal">
                ကျွန်တော်တို့ channelကို <br /> follow လုပ်ပီး
                supportပေးကြပါအုံး
              </span>
              <span className="flex gap-x-1 mt-1">
                <Link href="https://www.facebook.com/profile.php?id=61558052919767">
                  <FaFacebook className="fill-blue-500 size-5" />
                </Link>
                <Link href="https://t.me/zoninganimemm">
                  <FaTelegram className="fill-blue-600 size-5" />
                </Link>
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default Home;
