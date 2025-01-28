"use server";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "./getUsers";

export const addMessage = async (message, useruid) => {
  const supabase = await createClient();
  const user = await getUser();

  const { data, error } = await supabase.from("message").insert([
    {
      sender_uid: user.user.id,
      receiver_uid: useruid,
      content: message,
    },
  ]);

  if (error) {
    console.log("error adding a message" + error.message);
  }
  if (data) {
    console.log("Message added seccessfuly");
  }
};
