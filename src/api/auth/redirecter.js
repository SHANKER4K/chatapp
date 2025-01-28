"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const redirecter = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  } else redirect("/chat");
};
