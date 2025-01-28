import React from "react";
import "@/app/globals.css";
import Sidebar from "@/components/sideBar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
