import { NextRouter } from "next/router";

export interface Episodes {
  Ep: string;
  Code?: string;
  Poster?: string;
  Tg?: string;
  Views?: number;
  Likes?: number;
}
export interface Tags {
  _id: string;
  Name: string;
}
export interface Anime {
  _id: string | undefined;
  Title: string;
  Poster: string | File[];
  Review: string;
  Year: number;
  Rating: number;
  Link: string;
  Complete: boolean;
  Categories: Tags[];
  Themes: Tags[];
  Views: number;
  Likes: number;
  Studio: string;
  Episodes: Episodes[];
  path: string | null | undefined;
}

export interface State {
  data: Anime | null;
  Review: boolean;
  Recommend: Anime[];
  height: number;
}
export interface AnimeSwiperState {
  data: Anime[] | undefined;
  Title: string;
}
export interface searchParams {
  sort: string | null;
  category: string | null;
  year: number | string | null;
  theme: string | null;
  studio: string | null;
  type: string;
  page: number;
}
export interface CategoriesSwiper {
  data: [{ Name: string; _id: string }] | [];
  Title: string;
  searchParams: searchParams;
}
export interface Pagebtn {
  length: number;
  searchParams: searchParams;
}
export interface TagsSwiper {
  data: Array<string | number> | [];
  color: string;
  field: keyof searchParams;
  searchParams: searchParams;
  color2: string;
}
export interface Sort {
  searchParams: searchParams;
}

export interface AnimeState {
  data: { data: [Omit<Anime, "Poster"> & { Poster: string }] | [] } | null;
  Years: [{ Year: number }] | [];
  Categories: [Tags] | [];
  Themes: [Tags] | [];
  Studios: [{ Studio: string }] | [];
}

export interface RouteByid {
  params: {
    id: string;
  };
  searchParams: {
    ep: number & string;
    type: string;
  };
}
export interface ReactSelectOptions {
  value: number | string;
  label: number | string;
}
