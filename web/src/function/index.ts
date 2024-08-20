import { searchParams } from "@/type";
import axios, { AxiosProgressEvent } from "axios";
import store from "@/redux/store";

export const Fetchdata = async (query: searchParams) => {
  const { category, page, sort, year, theme, studio, type } = query;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/anime?Categories=${category}&Year=${year}&sort=${sort}&page=${page}&Themes=${theme}&Studio=${studio}&type=${type}`
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const CreateTags = async (inputValue: string, tags: string) => {
  try {
    const {
      state: { Type },
    } = store.getState();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/${tags}?type=${Type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: inputValue.toLowerCase() }),
      }
    );
    if (res.ok) {
      const { info } = await res.json();
      return info;
    }
  } catch (error) {
    console.log(error);
  }
};
