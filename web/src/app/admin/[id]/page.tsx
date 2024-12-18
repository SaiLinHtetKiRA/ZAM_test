"use client";
import React, { Component } from "react";
import { Anime, RouteByid } from "@/type";
import store from "@/redux/store";
import FormProvider from "@/components/Form";
export default class page extends Component<RouteByid> {
  componentDidMount(): void {
    const { socket, Type } = store.getState().state;
    const { id } = this.props.params;
    socket.emit(id);
    socket.on(id, (data: Anime) => {
      this.setState({ data });
    });
  }
  state: { data?: Anime } = {
    data: undefined,
  };

  render() {
    if (!this.state.data) {
      return <div>Loading...</div>;
    }
    return (
      <main>
        {Object.entries(this.state.data).length && (
          <FormProvider Data={this.state.data} />
        )}
      </main>
    );
  }
}
