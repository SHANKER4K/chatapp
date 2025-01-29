"use client";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useRef, useEffect, useState } from "react";
import { useId } from "react";
import { addMessage } from "@/api/Database/addMessage";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import supabase from "@/api/db";
function MessageContainer({ thisUser, useruid, messages }) {
  const scrollAreaRef = useRef(null);
  const id = useId();
  const [message, setMessage] = useState("");
  const [data, setData] = useState(messages);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      let msg = message;
      const newMessage = {
        sender_uid: thisUser,
        receiver_uid: useruid,
        content: message,
        timestamp: new Date().toISOString(),
      };
      await addMessage(msg, useruid);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyUp = async (e) => {
    if (e.key === "Enter") {
      await sendMessage();
    }
  };

  const handleClick = async () => {
    await sendMessage();
  };

  // Scroll to bottom on mount and when messages change
  useEffect(() => {
    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [data]); // Add data as dependency to scroll on new messages

  useEffect(() => {
    // Subscribe to real-time updates
    const channel = supabase
      .channel(`messages_${useruid}_${thisUser}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message" },
        (payload) => {
          const newMessage = payload.new;
          console.log("here");

          setData((prev) =>
            [...prev, newMessage].sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            )
          );
          console.log(data);
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <div className="flex-1 min-h-0">
        <ScrollArea
          ref={scrollAreaRef}
          className="h-full border rounded-md px-2 py-4"
        >
          <div className="flex flex-col gap-2">
            {data.map((val, i) => (
              <div
                key={i}
                className={`${
                  thisUser === val.sender_uid
                    ? "self-end bg-popover"
                    : "bg-ring"
                }  text-lg border max-w-sm md:max-w-md lg:max-w-2xl rounded-lg p-2`}
              >
                {val.content}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-none">
        <div className="relative">
          <Input
            value={message}
            onChange={handleMessage}
            onKeyUp={handleKeyUp}
            id={id}
            className="pe-9"
            placeholder="Message"
            type="message"
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border-transparent text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
            onClick={handleClick}
          >
            <Send size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}

export default MessageContainer;
