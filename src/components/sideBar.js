import { getUsers } from "@/api/Database/getUsers";
import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";

async function sideBar(props) {
  let cards = [];
  try {
    cards = await getUsers();
  } catch (error) {
    console.log("Error");
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  let { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id);
  user = user[0];

  return (
    <AppSidebar
      cards={cards}
      uid={user.id}
      email={data.user.email}
      username={user.username}
      image={user.image}
    />
  );
}

export default sideBar;
