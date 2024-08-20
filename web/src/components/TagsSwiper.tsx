import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "@/style/swiper.css";
import { FreeMode } from "swiper/modules";
import { TagsSwiper as type } from "@/type";
import Link from "next/link";

export default class TagsSwiper extends Component<type> {
  render() {
    const { data, searchParams, color, field, color2 } = this.props;

    return (
      <section key={field}>
        <h1 className="text-white/80 lg:text-[30px] sm:text-[20px] font-semibold capitalize">
          {field + "s"}
        </h1>
        <div className="px-3 py-1">
          <Swiper
            watchSlidesProgress={true}
            slidesPerView="auto"
            spaceBetween={0}
            freeMode={true}
            modules={[FreeMode]}
          >
            {data?.map((data, i) => (
              <SwiperSlide key={data}>
                <div className="m-3">
                  <Link
                    href={{
                      pathname: "",
                      query: {
                        ...searchParams,
                        [field]: data == searchParams[field] ? "" : data,
                      },
                    }}
                    scroll={false}
                    prefetch={false}
                    replace={true}
                    className={`${
                      data == searchParams[field] ? ` ${color} ` : ` ${color2} `
                    }   ring-2   cursor-pointer capitalize font-bold text-sm rounded-sm px-2 py-1 transition-all duration-300 ease-out `}
                  >
                    {data}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }
}
