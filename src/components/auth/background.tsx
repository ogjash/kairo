"use client"

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { CloudScene } from "@/components/auth/cloud-scene";

export default function Background() {
  return(
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-linear-to-t from-[#C73F3F] to-[#252525] flex-col items-center justify-center">

      <ShootingStars />
      <StarsBackground />
      <CloudScene />
    </div>
  );
}