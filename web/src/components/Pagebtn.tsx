import React, { Component } from "react";
import Link from "next/link";
import { Pagebtn as type } from "@/type";
export default class Pagebtn extends Component<type> {
  render() {
    const { length, searchParams } = this.props;

    const Btn = () => {
      const btn = [];
      for (let i = 0; i == length + 1; i++) {
        btn.push(
          <Link
            href={`?category=${searchParams.category}&year=${searchParams.year}&sort=${searchParams.sort}&page=${i}`}
            scroll={false}
            prefetch={false}
            replace={true}
            key={"btn-" + i}
            className=" flex my-7 text-white  [&>*]:border [&>*]:border-white [&>*]:rounded-full justify-center [&>*]:size-8 [&>*]:text-center"
          >
            {i + 1}
          </Link>
        );
      }
      return btn;
    };
    return <footer>{Btn()}</footer>;
  }
}
