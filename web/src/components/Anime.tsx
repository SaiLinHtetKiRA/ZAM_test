"use client";
import { Fetchdata } from "@/function";
import { Anime as type, searchParams } from "@/type";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useFetch } from "@/hook";
export const Anime = React.memo(
  async ({ searchParams }: { searchParams: searchParams }) => {
    const data = useFetch(searchParams);

    return (
      <div className="flex ">
        <div className="flex flex-wrap gap-4 p-5 ">
          {data?.map((anime) => (
            <div key={anime._id}>
              <Card Anime={anime} />
            </div>
          ))}
        </div>
        {data && !data.length && (
          <div className="flex h-fit justify-center  flex-1 w-full">
            <Image
              src="/not found.png"
              width={1000}
              height={1000}
              quality={100}
              alt="Loading..."
              className="w-[80svw] sm:w-[40svw] aspect-square"
            />
          </div>
        )}
      </div>
    );
  }
);
