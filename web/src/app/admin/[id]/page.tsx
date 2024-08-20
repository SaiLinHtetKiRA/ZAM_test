"use client";
import React, { Component } from "react";
import { Anime, RouteByid } from "@/type";
import store from "@/redux/store";
import FormProvider from "@/components/Form";
export default class page extends Component<RouteByid> {
  componentDidMount(): void {
    const { socket, Type } = store.getState().state;
    const { id } = this.props.params;
    socket.emit(id, Type);
    socket.on(id, (data: Anime) => {
      this.setState({ data });
    });
  }
  state: { data: Anime | {} } = {
    data: {},
  };

  render() {
    return (
      <main>
        {Object.keys(this.state.data)?.length && (
          <FormProvider Data={this.state.data} />
        )}
      </main>
    );
  }
}
