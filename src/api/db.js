"use server";
import { createClient } from "../utils/supabase/server.js";

const supabase = await createClient();

export default supabase;
