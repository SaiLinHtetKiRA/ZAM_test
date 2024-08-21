import React, { Component, createElement } from "react";
import { AtoZ, Heart, Reward, Eye } from "@/svg";
import Link from "next/link";
import { Sort as type } from "@/type";
export default class Sort extends Component<type> {
  Label = (text: string) => {
    if (text === "AtoZ") {
      return "A to Z";
    } else if (text === "Heart") {
      return "Likes";
    } else if (text === "Reward") {
      return "Ratings";
    } else if (text === "Eye") {
      return "Views";
    }
  };
  render() {
    const Sorter = [AtoZ, Heart, Reward, Eye];
    const { searchParams } = this.props;

    return (
      <main className="flex gap-3 items-center justify-evenly [*>&]:cursor-pointer ring-1 ring-white/80 rounded-2xl sm:p-3 lg:p-5 mx-3">
        {Sorter.map((svg) => (
          <Link
            // href={`?category=${searchParams.category}&year=${
            //   searchParams.year
            // }&sort=${
            //   svg.name.toLowerCase() == searchParams.sort
            //     ? ""
            //     : svg.name.toLowerCase()
            // }&page=${searchParams.page}`}
            href={{
              pathname: "",
              query: {
                ...searchParams,
                sort:
                  svg.name.toLowerCase() == searchParams.sort
                    ? ""
                    : svg.name.toLowerCase(),
              },
            }}
            scroll={false}
            prefetch={false}
            replace={true}
            className="flex items-center gap-1 p-3"
            key={svg.name}
          >
            {createElement(svg, {
              className: `sm:size-15 size-7 ${
                searchParams.sort == svg.name.toLowerCase()
                  ? "fill-white/80"
                  : "stroke-white/60 fill-none stroke-1"
              } transition-all duration-300 ease-out`,
              active: searchParams.sort == svg.name.toLowerCase(),
            })}
            <span
              className={`${
                searchParams.sort == svg.name.toLowerCase()
                  ? "text-white/80"
                  : "text-white/60"
              } font-bold text-xl hidden sm:block transition-all duration-400 ease-out`}
            >
              {this.Label(svg.name)}
            </span>
          </Link>
        ))}
      </main>
    );
  }
}
