import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import SidebarV2 from "../components/v2/SidebarV2";
import ChatWindowV2 from "../components/v2/ChatWindowV2";
import BackgroundGlow from "../components/BackgroundGlow";

function Home() {
  const [chats, setChats] =
    useState([]);

  const [
    currentChatIndex,
    setCurrentChatIndex,
  ] = useState(0);

  const [mode, setMode] =
    useState("Study");

  const token =
    localStorage.getItem(
      "token"
    );

  // Load chats
  useEffect(() => {
    const fetchChats =
      async () => {
        try {
          const res =
            await axios.get(
              "https://novamind-backend-1b22.onrender.com",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          if (
            res.data.length >
            0
          ) {
            setChats(
              Array.isArray(res.data)
    ? res.data
    : Array.isArray(res.data.chats)
    ? res.data.chats
    : []
            );
          } else {
            setChats([
              {
                title:
                  "New Chat",
                messages:
                  [],
              },
            ]);
          }
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    fetchChats();
  }, []);

  // Auto Save Chats
  useEffect(() => {
    const saveChats =
      async () => {
        if (
          chats.length ===
          0
        )
          return;

        try {
          await axios.post(
            "https://novamind-backend-1b22.onrender.com",
            {
              chats,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      };

    saveChats();
  }, [chats]);

  const createNewChat =
    () => {
      setChats([
        ...chats,
        {
          title:
            "New Chat",
          messages: [],
        },
      ]);

      setCurrentChatIndex(
        chats.length
      );
    };

  return (
    <div className="h-screen bg-[#09090B] text-white overflow-hidden relative">

      <BackgroundGlow />

      <div className="flex h-full">

        <SidebarV2
          chats={chats}
          setChats={setChats}
          currentChatIndex={
            currentChatIndex
          }
          setCurrentChatIndex={
            setCurrentChatIndex
          }
          createNewChat={
            createNewChat
          }
          mode={mode}
          setMode={setMode}
        />

        <div className="flex-1 p-6">

          <ChatWindowV2
            chats={chats}
            setChats={setChats}
            currentChatIndex={
              currentChatIndex
            }
            mode={mode}
          />

        </div>

      </div>
    </div>
  );
}

export default Home;