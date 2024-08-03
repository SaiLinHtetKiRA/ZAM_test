import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center h-full">
      <img src="../Loading.gif" alt="Loading" className="w-[30vh]" />
    </div>
  );
}

export default Loading;
