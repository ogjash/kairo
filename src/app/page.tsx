"use client"

import NavbarComp from "@/components/home/navbar";
import VantaClouds from "@/components/home/cloud-background";
import Image from "next/image";

export default function Home() {
  return(
    <>
      <div className="relative overflow-hidden min-h-screen w-full flex flex-col items-center justify-center">
        <Image
          src="/assets/paper-texture.png"
          alt=""
          fill
          className="pointer-events-none object-cover opacity-20 mix-blend-multiply"
          aria-hidden
          priority
        />
        <VantaClouds />

        <div className="absolute z-10 text-4xl md:text-5xl font-laviossa text-center mx-20 max-w-4xl text-gray-600 -translate-y-40 md:leading-14">
          Think less about organizing, More about ideas
        </div>

        <NavbarComp />
        
      </div>
    </>
  );
}
