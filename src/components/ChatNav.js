import React from "react";
import { FaPhone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

export function ChatNav({ username, image }) {
  return (
    <div className="flex justify-between items-center pt-4">
      <div className="flex gap-5 items-center">
        <div className="relative">
          <Avatar>
            <AvatarImage src={image} alt="Kelly King" />
            <AvatarFallback>
              <UserRound
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 end-0 size-3 rounded-full border-2 border-background bg-emerald-500">
            <span className="sr-only">Online</span>
          </span>
        </div>
        <div>
          <p className="font-bold">{username}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="h-8 w-8 rounded-full m-auto hover:bg-neutral-400">
          <center>
            <FaPhone />
          </center>
        </button>
        <button className="h-8 w-8 rounded-full m-auto hover:bg-neutral-400">
          <center>
            <MdDelete />
          </center>
        </button>
      </div>
    </div>
  );
}
