"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Signout } from "@/api/auth/signout";
import { useRouter } from "next/navigation"; // Change this import
import { createClient } from "@/utils/supabase/server";
import { isUser } from "@/components/isUser";
function Nav() {
  const router = useRouter();

  const handleSignout = async () => {
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-secondary text-white h-full rounded-lg">
      <h1>Private Page</h1>
      {!isUser() && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-transparent"
                variant="secondary"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  <Button onClick={handleSignout}>Logout</Button>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      {isUser() && (
        <div className="space-x-4">
          <Button
            variant={buttonVariants.secondary}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant={buttonVariants.secondary}
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
