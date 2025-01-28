import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// This is sample data.

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="-ml-1 self-end" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain uid={props.uid} cards={props.cards} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          email={props.email}
          username={props.username}
          image={props.image}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
