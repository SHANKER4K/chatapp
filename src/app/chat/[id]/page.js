import { ChatNav } from "@/components/ChatNav";
import React from "react";
import { getUser, getUserbyId } from "@/api/Database/getUsers";
import MessageContainer from "@/components/messageContainer";
import { getConversation } from "@/api/Database/getCoversation";
async function Chat({ params }) {
  const { id } = await params;
  let user = await getUserbyId(id);
  user = user[0];
  const thisUser = await getUser();
  const data0 = await getConversation(id);
  const data1 = await getConversation(thisUser.user.id);
  let messages = [...data0, ...data1].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return (
    <div className="h-[100dvh] w-full flex flex-col p-4">
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <div className="flex-none">
          <ChatNav username={user.username} image={user.image} />
        </div>

        <MessageContainer
          thisUser={thisUser.user.id}
          useruid={id}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default Chat;
