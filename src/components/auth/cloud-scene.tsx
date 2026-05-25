"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

function usePointerParallax(strength: number) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      pointerX.set(x);
      pointerY.set(y);
    };

    const handlePointerLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [pointerX, pointerY]);

  const x = useSpring(useTransform(pointerX, [-1, 1], [-strength, strength]), {
    stiffness: 70,
    damping: 18,
    mass: 0.8,
  });
  const y = useSpring(useTransform(pointerY, [-1, 1], [-strength, strength]), {
    stiffness: 70,
    damping: 18,
    mass: 0.8,
  });

  return { x, y };
}

export function CloudScene() {
  const darkCloud = usePointerParallax(26);
  const lightCloud = usePointerParallax(14);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <motion.div
        style={darkCloud}
        className="absolute bottom-[-30%] left-[-5%] h-[min(65vw,900px)] w-[min(65vw,900px)] -scale-x-100 opacity-95"
      >
        <Image
          src="/assets/CloudDark.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 90vw, 58vw"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        style={lightCloud}
        className="absolute right-[18%] top-[30%] h-[min(26vw,340px)] w-[min(26vw,340px)] opacity-90"
      >
        <Image
          src="/assets/CloudDark.png"
          alt=""
          fill
          sizes="(max-width: 768px) 38vw, 26vw"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}