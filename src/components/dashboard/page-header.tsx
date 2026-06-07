"use client"

import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { NavActions } from "./nav-actions";

interface Props{
  title: string;
}

export default function PageHeader({ title }: Props) {
  return(
    <header className="flex shrink-0 items-center gap-2">
      <div className="flex items-center gap-4 absolute left-30">
        <div className="block p-0.5 bg-input/20 items-center size-8 rounded-lg outline outline-border outline-inset-5 overflow-hidden shrink-0 relative">
          <Button variant="ghost" className="hover:!bg-input/30 size-full flex items-center justify-center">
            <FaCirclePlus className="size-4"/>
          </Button>
        </div>
        <div className="flex items-center text-2xl font-semibold">{title}</div>
      </div>
      <div className="flex items-center absolute right-30 pointer-events-auto gap-2">
        <NavActions />
      </div>
    </header>
  )
}