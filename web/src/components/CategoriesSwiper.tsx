import React, { Component } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "@/style/swiper.css";
import { FreeMode } from "swiper/modules";
import { CategoriesSwiper as type } from "@/type";
import Link from "next/link";
export default class CategoriesSwiper extends Component<type> {
  render() {
    const { data, Title, searchParams } = this.props;

    return (
      <section>
        <h1 className="text-white/80 lg:text-[30px] sm:text-[20px] font-semibold">
          {Title}
        </h1>
        <div className="">
          <Swiper
            watchSlidesProgress={true}
            slidesPerView="auto"
            spaceBetween={20}
            freeMode={true}
            modules={[FreeMode]}
            className="List-Swiper [*>&>div]:p-3 "
          >
            {data?.map((data, i) => (
              <SwiperSlide key={i}>
                <Link
                  href={`?category=${
                    data.Name.toLowerCase() == searchParams.category
                      ? ""
                      : data.Name.toLowerCase()
                  }&year=${searchParams.year}&sort=${searchParams.sort}&page=${
                    searchParams.page
                  }`}
                  scroll={false}
                  prefetch={false}
                  replace={true}
                  className={`${
                    data.Name.toLowerCase() == searchParams.category
                      ? "bg-rose-600/80 text-gray-600/80"
                      : "text-rose-500/80 "
                  } ring-2 ring-rose-600/80 font-bold cursor-pointer capitalize  text-sm rounded-sm px-2 py-1 transition-all duration-300 ease-out`}
                >
                  {data.Name}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }
}
