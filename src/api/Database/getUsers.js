"use server";
import { createClient } from "@/utils/supabase/server";

export const getUsers = async () => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.log("error fetching users : " + error);
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("error fetching users : " + error);
  }
};

export const getUserbyId = async (id) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);
    if (error) {
      console.log("error fetching user : " + error);
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log("error fetching user : " + error);
  }
};

export const getUser = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log("error getting user");
  }
  if (data) {
    return data;
  }
};
