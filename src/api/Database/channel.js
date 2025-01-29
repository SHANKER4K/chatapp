"use server";
import supabase from "../db";
export const createChannel = async (useruid, thisUser, setData) => {
  return supabase
    .channel("message_handle")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "message" },
      (payload) => {
        const newMessage = payload.new;

        // Check if the message belongs to the current conversation
        if (
          (newMessage.sender_id === useruid &&
            newMessage.receiver_id === thisUser) ||
          (newMessage.sender_id === thisUser &&
            newMessage.receiver_id === useruid)
        ) {
          setData((prev) =>
            [...prev, newMessage.content].sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            )
          );
        }
      }
    )
    .subscribe((status, err) => {
      if (err) {
        console.error("Error subscribing to channel:", err);
      } else {
        console.log("Subscribed to channel with status:", status);
      }
    });
};
