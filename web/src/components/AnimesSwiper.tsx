import React, { Component } from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { AnimeState } from "@/type";
export class SwiperAnime extends Component<AnimeState> {
  render() {
    const { data, Title } = this.props;
    return (
      <main className="mx-[3%] mb-[2%]" id={Title}>
        <span className="font-semibold text-[20px] mb-[3%] capitalize text-white ">
          {Title}
        </span>
        <section className="px-[4%] py-[2%]">
          <Swiper
            watchSlidesProgress={true}
            slidesPerView="auto"
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode]}
            className="Card-Swiper"
          >
            {data?.map((data, i) => (
              <SwiperSlide key={i}>
                <Card Anime={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>
    );
  }
}

export default SwiperAnime;
