import React, { Component, Suspense } from "react";
import Card from "./Card";
import Loader from "./loader/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "@/style/swiper.css";
import { FreeMode } from "swiper/modules";
import { AnimeSwiperState } from "@/type";

export class SwiperAnime extends Component<AnimeSwiperState> {
  render() {
    const { data, Title } = this.props;
    return (
      <main className="px-[3vw] pt-[2vw] lg:px-[2vw] lg:py-[1vw]" id={Title}>
        <span className="font-semibold text-[20px] mb-[3%] capitalize text-white ">
          {Title}
        </span>
        <section className="px-[4vw] py-[2vw] lg:px-[2vw] lg:py-[1vw]">
          <Swiper
            watchSlidesProgress={true}
            slidesPerView="auto"
            spaceBetween={0}
            freeMode={true}
            modules={[FreeMode]}
            className="Card-Swiper"
          >
            {data?.map((data, i) => (
              <SwiperSlide key={data._id} className="mr-5">
                <Card Anime={data} />
              </SwiperSlide>
            ))}
            {!data.length &&
              Array.from({ length: 10 }).map((_, i) => (
                <SwiperSlide key={i} className="mr-5">
                  <Loader />
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      </main>
    );
  }
}

export default SwiperAnime;
