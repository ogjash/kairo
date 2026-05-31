import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function HeaderTrigger(){
  return (
    <div className="absolute left-4 flex items-center h-8 w-fit rounded-md border border-transparent hover:bg-accent hover:text-accent-foreground transition-colors overflow-hidden">
        
      <SidebarTrigger className="h-full cursor-pointer rounded-none hover:bg-transparent focus-visible:ring-0" />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button 
            variant="ghost" 
            className="h-full cursor-pointer w-auto p-1 rounded-none hover:bg-transparent focus-visible:ring-0"
          >
            <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
          
        <DropdownMenuContent
          className="w-40 rounded-lg"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <DropdownMenuItem className="gap-2 p-2">
            Enable Focus Mode
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 p-2">
            Customize Sidebar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}