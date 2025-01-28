"use client";

import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useId } from "react";
import { UserRound } from "lucide-react";
export function NavMain({ uid, cards }) {
  const id = useId();
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <RadioGroup className="flex flex-col" defaultValue="1">
          {cards.map(
            (val, index) =>
              val.id !== uid && (
                <label
                  key={val.id}
                  onClick={() => router.push(`/chat/${val.id}`)}
                  className="relative cursor-pointer flex items-center gap-3 rounded-lg border border-input text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                >
                  <RadioGroupItem
                    id={`${id}-${index + 1}`}
                    value={index + 1}
                    className=" sr-only after:absolute after:inset-0"
                  />
                  <SidebarMenuButton
                    asChild
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <Avatar className=" rounded-lg">
                          <AvatarImage src={val.image} alt={val.image} />
                          <AvatarFallback>
                            <UserRound
                              size={16}
                              strokeWidth={2}
                              className="opacity-60"
                              aria-hidden="true"
                            />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <p className="text-xs font-medium leading-none text-foreground">
                        <SidebarMenuSubItem key={val.username}>
                          <SidebarMenuSubButton asChild>
                            <span>{val.username}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </p>
                    </div>
                  </SidebarMenuButton>
                </label>
              )
          )}
        </RadioGroup>
      </SidebarMenu>
    </SidebarGroup>
  );
}
