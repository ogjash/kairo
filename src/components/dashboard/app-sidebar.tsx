import * as React from "react"

import { NavFavorites } from "@/components/dashboard/nav-favorites"
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

import { BsPersonWorkspace, BsCalendar3 } from "react-icons/bs";
import { MdTaskAlt } from "react-icons/md";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { RiUserSharedLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdCloudOutline } from "react-icons/io";



import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { getUserSpaces } from "@/lib/dashboard/space-actions";

const data = {
  navMain: [
    {
      title: "All Workspace",
      url: "/dashboard/all",
      icon: (
        <BsPersonWorkspace />
      ),
    },
    {
      title: "Recently Visited",
      url: "/dashboard/recent",
      icon: (
        <PiClockCounterClockwiseBold />
      ),
    },
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      icon: (
        <MdTaskAlt />
      ),
    },
    {
      title: "Calendar",
      url: "/dashboard/calendar",
      icon: (
        <BsCalendar3 />
      ),
    },
  ],
  navSecondary: [
    {
      title: "Imagine",
      url: "/dashboard/imagine",
      icon: (
        <IoMdCloudOutline />
      ),
    },
    {
      title: "Shared with Me",
      url: "/dashboard/shared-with-me",
      icon: (
        <RiUserSharedLine />
      ),
    },
    {
      title: "Trash",
      url: "/dashboard/trash",
      icon: (
        <FaRegTrashAlt />
      ),
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅",
    },
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
    {
      name: "Professional Development",
      emoji: "💼",
      pages: [
        {
          name: "Career Objectives & Milestones",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Skill Acquisition & Training Log",
          url: "#",
          emoji: "🧠",
        },
        {
          name: "Networking Contacts & Events",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
    {
      name: "Creative Projects",
      emoji: "🎨",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "✍️",
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "🖼️",
        },
        {
          name: "Music Composition & Practice Log",
          url: "#",
          emoji: "🎵",
        },
      ],
    },
    {
      name: "Home Management",
      emoji: "🏡",
      pages: [
        {
          name: "Household Budget & Expense Tracking",
          url: "#",
          emoji: "💰",
        },
        {
          name: "Home Maintenance Schedule & Tasks",
          url: "#",
          emoji: "🔧",
        },
        {
          name: "Family Calendar & Event Planning",
          url: "#",
          emoji: "📅",
        },
      ],
    },
    {
      name: "Travel & Adventure",
      emoji: "🧳",
      pages: [
        {
          name: "Trip Planning & Itineraries",
          url: "#",
          emoji: "🗺️",
        },
        {
          name: "Travel Bucket List & Inspiration",
          url: "#",
          emoji: "🌎",
        },
        {
          name: "Travel Journal & Photo Gallery",
          url: "#",
          emoji: "📸",
        },
      ],
    },
  ],
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const spaces = session?.user ? await getUserSpaces(session.user.id) : [];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SpaceSwitcher spaces={spaces} />
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
