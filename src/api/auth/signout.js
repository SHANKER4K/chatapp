"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export const Signout = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signOut();
  redirect("/login");
};
