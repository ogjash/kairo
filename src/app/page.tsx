import { CloudScene } from "@/components/home/cloude-scene";
import NavbarDemo from "@/components/home/resizable-navbar-demo";
import Image from "next/image";


export default function Home() {
  return(
    <div className="relative isolate min-h-screen overflow-hidden bg-linear-to-t from-[#5a6776] to-[#ff7b74]">
      <Image
        src="/assets/paper-texture.png"
        alt=""
        fill
        className="pointer-events-none object-cover opacity-20 mix-blend-multiply"
        aria-hidden
        priority
      />
      <CloudScene />

      <NavbarDemo />
    </div> 
  );
}
