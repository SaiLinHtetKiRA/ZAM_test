"use client";
import React, { Suspense, ReactNode } from "react";
import Nav from "@/components/Nav";
function Template({ children }: { children: ReactNode }) {
  return (
    <main className="bg-gray-500 bg-gradient-to-tr from-black/80 to-black/60 w-full h-fit min-h-screen">
      <Nav />
      {children}
    </main>
  );
}

export default Template;
