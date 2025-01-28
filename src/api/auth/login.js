"use server";
import { createClient } from "@/utils/supabase/server";
export const login = async ({ email, password }) => {
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
