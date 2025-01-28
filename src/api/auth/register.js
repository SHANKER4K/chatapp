"use server";
import { redirect } from "next/navigation.js";
import { createClient } from "../../utils/supabase/server.js";
import { revalidatePath } from "next/cache.js";

export const register = async ({ email, username, password }) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      options: {
        data: {
          username: username,
        },
      },
      password: password,
    });

    if (data) {
      console.log("Registration successful");
    }
    if (error) {
      console.error("Registration error:", error);
    }
  } catch (error) {
    // Log the error and send a generic server error
    console.error("Registration error:", error);
  }
};
