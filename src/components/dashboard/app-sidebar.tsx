import * as React from "react"

import { NavStarred } from "@/components/dashboard/nav-starred"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavWorkspaces } from "@/components/dashboard/nav-workspaces"
import { SpaceSwitcher } from "@/components/dashboard/space-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { LuNotebook } from "react-icons/lu";
import { BsCalendar3 } from "react-icons/bs";
import { MdTaskAlt } from "react-icons/md";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { RiUserSharedLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdCloudOutline } from "react-icons/io";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { getUserSpaces } from "@/lib/dashboard/space-actions";
import { getSpaceWorkspacesWithNotebooks, getStarredNotebooksInSpace } from "@/lib/dashboard/sidebar-actions"

const DEFAULT_WORKSPACE_COLOR = "#6366f1";

export async function AppSidebar({
  spaceId,
  ...props 
}: React.ComponentProps<typeof Sidebar> & { spaceId: string }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if(!session?.user) return null;

  const [spaces, workspaceRows, starredNotebooks] = await Promise.all([
    getUserSpaces(session.user.id),
    getSpaceWorkspacesWithNotebooks(spaceId, session.user.id),
    getStarredNotebooksInSpace(spaceId),
  ]);

  const navMain = [
    {
      title: "All Notebooks",
      url: `/s/${spaceId}/all`,
      icon: <LuNotebook />,
    },
    {
      title: "Recently Visited",
      url: `/s/${spaceId}/recent`,
      icon: <PiClockCounterClockwiseBold />,
    },
    {
      title: "Tasks",
      url: `/s/${spaceId}/tasks`,
      icon: <MdTaskAlt />,
    },
    {
      title: "Calendar",
      url: `/s/${spaceId}/calendar`,
      icon: <BsCalendar3 />,
    },
  ]
  const navSecondary = [
    {
      title: "Imagine",
      url: `/s/${spaceId}/imagine`,
      icon: <IoMdCloudOutline />,
    },
    {
      title: "Shared with Me",
      url: `/s/${spaceId}/shared-with-me`,
      icon: <RiUserSharedLine />,
    },
    {
      title: "Trash",
      url: `/s/${spaceId}/trash`,
      icon: <FaRegTrashAlt />,
    },
  ];
  
  const starred = starredNotebooks.map((nb) => ({
    id: nb.id,
    name: nb.name,
    url: `/s/${spaceId}/w/${nb.workspaceId}/n/${nb.id}`,
    color: nb.color,
  }));

  const workspaces = workspaceRows.map((ws) => ({
    id: ws.id,
    name: ws.name,
    isDefault: ws.isDefault,
    color: ws.color ?? DEFAULT_WORKSPACE_COLOR,
    url: `/s/${spaceId}/w/${ws.id}`,
    notebooks: ws.notebooks.map((nb) => ({
      id: nb.id,
      name: nb.name,
      url: `/s/${spaceId}/w/${ws.id}/n/${nb.id}`,
      color: nb.color,
    })),
  }));
  
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SpaceSwitcher spaces={spaces} currentSpaceId={spaceId} />
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarHeader>
      <SidebarContent>
        <NavStarred starred={starred} />
        <NavWorkspaces spaceId={spaceId} workspaces={workspaces} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
