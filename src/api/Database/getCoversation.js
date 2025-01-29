"use server";
import supabase from "../db";

export const getConversation = async (thisUser, user) => {
  const { data: sender_messages, error: error1 } = await supabase
    .from("message")
    .select("*")
    .eq("sender_uid", thisUser)
    .eq("receiver_uid", user)
    .order("timestamp", { ascending: true });
  const { data: receiver_messages, error: error2 } = await supabase
    .from("message")
    .select("*")
    .eq("receiver_uid", thisUser)
    .eq("sender_uid", user)
    .order("timestamp", { ascending: true });

  if (!error1 && !error2)
    return [...receiver_messages, ...sender_messages].sort(
      (a, b) =>
        new Date(a.timestamp.split(".")[0]) -
        new Date(b.timestamp.split(".")[0])
    );
};
