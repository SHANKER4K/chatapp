"use client";
import React, { useState } from "react";
import Message from "./message";
import { getConversation } from "@/api/Database/getCoversation";
import { useEffect } from "react";
function Conversation({ thisUser, useruid, data }) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((val, i) => (
        <div
          key={i}
          className={`${
            thisUser === val.sender_uid ? "self-end bg-popover" : "bg-ring"
          }  text-lg border max-w-sm md:max-w-md lg:max-w-2xl rounded-lg p-2`}
        >
          {val.content}
        </div>
      ))}
    </div>
  );
}

export default Conversation;
