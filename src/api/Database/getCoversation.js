"use server";
import { createClient } from "@/utils/supabase/server";

export const getConversation = async (receiver_uid) => {
  const supabase = await createClient();
  console.log(receiver_uid);

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("receiver_uid", receiver_uid);

  let messages = [];
  if (
    data &&
    data[0] &&
    data[0].messages_id &&
    data[0].messages_id.length > 0
  ) {
    const messageIds = data[0].messages_id;
    const { data: messagesData, error: messagesError } = await supabase
      .from("message")
      .select("*")
      .in("id", messageIds)
      .order("timestamp", { ascending: true });

    if (messagesError) {
      console.log(messagesError);
    } else {
      messages = messagesData;
    }
  }
  return messages;
};
