export interface Episodes {
  Ep: string;
  Code: string;
  Poster: string | undefined;
  Tg: string;
  Views: number;
  Likes: number;
}
export interface Tags {
  _id: string;
  Name: string;
}
export interface Anime {
  _id: string;
  Title: string;
  Poster: string;
  Review: string;
  Year: number;
  Rating: number;
  Link: string;
  Complete: boolean;
  Categories: [Tags];
  Themes: [Tags];
  Views: number;
  Likes: number;
  Studio: string;
  Episodes: [Episodes] | [];
  path: string | null | undefined;
}

export interface State {
  data: Anime | null;
  Review: boolean;
  Recommend: [Anime] | [];
  height: number;
}
export interface AnimeSwiperState {
  data: [Anime] | [];
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
  sort: string;
}
export interface Sort {
  searchParams: searchParams;
}
export interface Home {
  data: [Anime] | [];
  PopularAnime: [Anime] | [];
  RandomAnimes: [Anime] | [];
}

export interface AnimeState {
  data: { data: [Anime] | [] } | null;
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
    ep: number;
    type: string;
  };
}
