import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import HeaderTrigger from "./header-trigger";


export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-12 items-center justify-center px-4">

      <HeaderTrigger />

      <div className="flex max-w-md w-full  relative pointer-events-auto">
          <SearchIcon className="absolute m-2 h-3 w-3 text-sidebar-foreground/70" />
          <Input 
          type="search" 
          placeholder="Search workspaces, subjects, or documents..." 
          className="w-full bg-sidebar-accent/50 border-sidebar-border pl-9 text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus-visible:border-blue-300 focus-visible:ring-0 h-7"
          />
      </div>
    </header>
  );
}