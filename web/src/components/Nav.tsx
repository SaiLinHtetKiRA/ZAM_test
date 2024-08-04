import React from "react";
import Image from "next/image";
function Nav() {
  return (
    <nav className="fixed flex justify-center w-full  z-20 ">
      <section className="flex px-6 py-1.5 backdrop-blur-lg bg-black/30 items-center w-[80%] justify-between mt-3  rounded-full justify-items-center ">
        <div className="size-10 cursor-pointer">
          <Image src={"/Logo.png"} alt="Logo" width={100} height={100} />
        </div>
        <div className="flex gap-5 text-white/80 [*>&]:cursor-pointer">
          <div>Home</div>
          <div>Category</div>
          <div>Home</div>
        </div>
      </section>
    </nav>
  );
}

export default Nav;
