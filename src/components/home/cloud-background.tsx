"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function VantaClouds() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the effect initializes only once and the DOM ref is ready
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          skyColor: 0x0b1020,
          cloudColor: 0x95a4c9,
          cloudShadowColor: 0x2a3552,
          sunColor: 0x5b7fff,
          sunGlareColor: 0x9bb3ff,
          sunlightColor: 0x2d4fc4,
        })
      );
    }

    // Cleanup memory when the component unmounts
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="top-0 left-0 w-screen h-screen -z-10"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
