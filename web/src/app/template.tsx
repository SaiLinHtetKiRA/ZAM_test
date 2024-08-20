import React, { Suspense, ReactNode } from "react";

function Template({ children }: { children: ReactNode }) {
  return (
    <main className="bg-gray-500 bg-gradient-to-tr from-black/80 to-black/60 w-full h-fit min-h-screen">
      {children}
    </main>
  );
}

export default Template;
