"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  NavGestion: [
    {
      title: "Planning et Dispatching",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Missions",
          url: "/gestion/planning-dispatching/missions",
        },
        {
          title: "Historiques des trajets",
          url: "/gestion/planning-dispatching/trips",
        },
      ],
    },
    {
      title: "Gestion des ressources",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Chauffeurs",
          url: "/gestion/ressources/drivers",
        },
        {
          title: "Véhicules",
          url: "/gestion/ressources/cars",
        },
        {
          title: "Incidents et conformités",
          url: "/gestion/ressources/issues",
        },
      ],
    },
  ],
  NavSettings: [
    {
      title: "Paramètres",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  NavDashboard: [
    {
      title: "Analyse",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Reporting et pilotage",
          url: "/dashboard/analyse/reporting-pilotage",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {/* <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span> */}
                  <Image src={Logo} alt="logo AMD" width={80} height={40} />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain section="Tableau de bord" items={data.NavDashboard} />
        <NavMain section="Gestion" items={data.NavGestion} />
        <NavMain section="Paramètres" items={data.NavSettings} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
