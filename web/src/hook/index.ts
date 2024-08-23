import { Fetchdata } from "@/function";
import { Anime, searchParams } from "@/type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetch = (searchParams: searchParams) => {
  const [data, setData] = useState<Anime[]>();
  const { Type } = useSelector((state: any) => state.state);
  useEffect(() => {
    Fetchdata({ ...searchParams, type: Type }).then(({ data }) =>
      setData(data)
    );
  }, [searchParams, Type]);

  return data;
};
