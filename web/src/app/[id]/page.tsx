"use client";
import React, { Component, Suspense } from "react";
import Loading from "@/app/loading";
import store from "@/redux/store";
import Link from "next/link";
import { Anime, RouteByid, State } from "@/type";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";
import SwiperAnime from "@/components/AnimesSwiper";
import { FaTelegram } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { IoMdShareAlt } from "react-icons/io";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "@/style/swiper.css";
import { FreeMode } from "swiper/modules";

class page extends Component<RouteByid> {
  componentDidMount(): void {
    const { id } = this.props.params;
    const {
      state: { socket },
    } = store.getState();
    const { type } = this.props.searchParams;
    socket.emit(id);
    socket.emit("RandomAnimes", type);

    socket.on(id, (data: Anime) => {
      this.setState({ data });
    });
    socket.on("RandomAnimes", (data) => {
      this.setState({ Recommend: data });
    });
    window.addEventListener("resize", (e) => {
      const video = document.getElementById("video");
      this.setState({ height: video?.offsetHeight });
    });
    window.removeEventListener;
  }
  state: State = {
    data: null,
    Review: false,
    Recommend: [],
    height: 0,
  };
  Swiper: null | SwiperRef = null;
  render() {
    const { data, Review, Recommend, height } = this.state;
    const { ep, type } = this.props.searchParams;
    const { id } = this.props.params;
    if (!data) {
      return <Loading />;
    }
    return (
      <Suspense fallback={<Loading />}>
        <main className="p-[2vw]">
          <div className="w-full h-[10svh] bg-white/70" title="Ads mb-5" />
          <section className="md:flex sm:block ">
            <div className="sm:w-full md:w-[60svw] aspect-video " id="video">
              <div
                // src={data.Episodes[ep - 1].Video}
                className="w-full h-full object-fill "
              />
              <div className="w-full h-[20%] bg-slate-400/60 backdrop-blur-xl flex items-center px-5 justify-between">
                <h4 className="font-semibold text-white/80 lg:text-xl sm:text-lg capitalize ">
                  Episode-{ep}
                  {ep != data.Episodes[ep - 1].Ep[0] &&
                    `(${data.Episodes[ep - 1].Ep})`}
                </h4>
                <div className="flex gap-3 [*>&]:cursor-pointer items-center">
                  <div>
                    <CiHeart
                      // color="#ef4444"
                      color="#eb1a1a"
                      size={35}
                    />
                  </div>
                  <Link href={data.Episodes[ep - 1].Tg || ""}>
                    <FaTelegram color="#24A1DE" size={33} />
                  </Link>
                  <div>
                    <IoMdShareAlt color="white" size={33} />
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:w-full md:w-[40svw] grid grid-cols-[170px,calc(100%-170px)] mt-3">
              <div className="w-[120px] sm:w-[120px] md:w-[160px] aspect-photo relative ">
                <Image
                  src={data.Poster as string}
                  alt={data.Title}
                  quality={100}
                  layout="fill"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/Loading.gif"
                />
              </div>

              <section className="flex flex-col gap-3">
                <header>
                  <h1 className="text-white font-bold">{data.Title}</h1>
                </header>
                <section className="w-full">
                  <Swiper
                    watchSlidesProgress={true}
                    slidesPerView="auto"
                    spaceBetween={0}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="capitalize [*>&>*]:cursor-pointer"
                    onSwiper={(e) => e.slideTo(ep - 1)}
                  >
                    <SwiperSlide className="mx-1.5 my-2">
                      <span
                        className={`${
                          data.Complete
                            ? "text-lime-500/80  ring-2 ring-lime-500/80 "
                            : "text-amber-500/80  ring-2 ring-amber-500/80"
                        }  rounded-sm px-2 py-1 `}
                      >
                        {data.Complete ? "Complete" : "Ongoing"}
                      </span>
                    </SwiperSlide>
                    <SwiperSlide className="mx-1.5 my-2">
                      <span className="text-purple-600/80  ring-2 ring-purple-600/80 rounded-sm px-2 py-1 ">
                        {data.Year}
                      </span>
                    </SwiperSlide>
                    <SwiperSlide className="mx-1.5 my-2">
                      <span className="text-fuchsia-600/80  ring-2 ring-fuchsia-600/80 rounded-sm px-2 py-1">
                        {data.Studio}
                      </span>
                    </SwiperSlide>
                    {data.Categories?.map((category) => (
                      <SwiperSlide key={category.Name} className="mx-1.5 my-2">
                        <span
                          className="  text-rose-500/80  ring-2 ring-rose-600/80   rounded-sm px-2 py-1"
                          key={category.Name}
                        >
                          {category.Name}
                        </span>
                      </SwiperSlide>
                    ))}
                    {data.Themes?.map((Themes) => (
                      <SwiperSlide key={Themes.Name} className="mx-1.5 my-2">
                        <span
                          className="  text-cyan-500/80  ring-2 ring-cyan-600/80   rounded-sm px-2 py-1"
                          key={Themes.Name}
                        >
                          {Themes.Name}
                        </span>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </section>
                <footer
                  className=" cursor-pointer ring-2 ring-white/80 px-2 py-1 transition-all duration-1000 ease-out  overflow-scroll"
                  onClick={() => this.setState({ Review: !Review })}
                >
                  <div className="font-semibold flex justify-between text-white/80 items-center flex-1">
                    Review
                    <motion.span
                      animate={{ rotate: Review ? 0 : -90 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <IoMdArrowDropdown size={30} />
                    </motion.span>
                  </div>
                  {!Review && (
                    <span className="w-auto text-white/70 p-2  overflow-hidden ">
                      {data.Review}
                    </span>
                  )}
                </footer>
              </section>
            </div>
          </section>
          <section className="w-full">
            <div className="ml-[2vw] text-white font-bold text-xl my-[2vw]">
              Episodes Lists
            </div>
            <div className="">
              <Swiper
                watchSlidesProgress={true}
                slidesPerView="auto"
                spaceBetween={0}
                freeMode={true}
                modules={[FreeMode]}
                className="Episodes-Swiper"
                onSwiper={(e) => e.slideTo(ep - 1)}
              >
                {data?.Episodes?.map((episode, i) => (
                  <SwiperSlide
                    key={i}
                    className={`${
                      data?.Episodes?.length - 1 == i && "overflow-hidden"
                    }`}
                  >
                    <div className="ml-5 w-[140px] sm:w-[160px] aspect-photo">
                      <Link
                        href={{
                          pathname: id,
                          query: { ep: i + 1, type: type },
                        }}
                        scroll={false}
                        replace={true}
                        prefetch={false}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        <Image
                          src={episode.Poster || (data.Poster as string)}
                          alt=""
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    <div className="flex w-full pl-5 justify-center items-center overflow-hidden">
                      <Link
                        href={`?ep=${i + 1}`}
                        className=" flex text-sm my-3 text-white/80
                     [&>*]:size-8 [&>*]:text-center z-20 cursor-pointer"
                        scroll={false}
                        replace={true}
                        prefetch={false}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        <button className="capitalize">{episode.Ep[0]}</button>
                      </Link>
                      <div className=" absolute w-full  h-2 border border-white border-x-0 -z-10" />
                      <div
                        className={`absolute w-full h-2 border border-white border-x-0 -z-10  ${
                          ep >= i + 1 && "bg-blue-400 "
                        }${ep == i + 1 && "rounded-full  border-r"}`}
                      />
                      <div className="absolute flex gap-1.5 flex-col">
                        <div
                          className={`w-[24px] h-[12px]  semi-circle border border-b-0 border-white ${
                            ep >= i + 1 ? "bg-blue-400" : "bg-[#1d1f23]"
                          }`}
                        />
                        <div
                          className={`w-[24px] h-[12px]  semi-circle border border-b-0 border-white rotate-180 ${
                            ep >= i + 1 ? "bg-blue-400" : "bg-[#1d1f23]"
                          }`}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
          <footer>
            <SwiperAnime data={Recommend} Title="Recommended" />
          </footer>
        </main>
      </Suspense>
    );
  }
}

export default page;
