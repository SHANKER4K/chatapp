"use server";
import supabase from "@/api/db";

export const isUser = async () => {
  let {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? true : false;
};
