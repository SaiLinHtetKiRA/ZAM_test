"use client";
import React, { ReactNode, Suspense } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
export default function Redux({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
