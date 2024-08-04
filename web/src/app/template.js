"use client";
import React, { Suspense } from "react";

function Template({ children }) {
  return (
    <main className="bg-gray-500 bg-gradient-to-tr from-black/80 to-black/60 ">
      {children}
    </main>
  );
}

export default Template;
