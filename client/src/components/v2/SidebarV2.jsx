import { FiPlus } from "react-icons/fi";

function Sidebar({
  chats = [],
  setChats,
  currentChatIndex = 0,
  setCurrentChatIndex,
}) {
  const handleNewChat = () => {
    const safeChats = Array.isArray(chats)
      ? chats
      : [];

    const newChat = {
      title: `Chat ${safeChats.length + 1}`,
      messages: [],
    };

    const updatedChats = [
      ...safeChats,
      newChat,
    ];

    setChats(updatedChats);
    setCurrentChatIndex(
      updatedChats.length - 1
    );
  };

  const safeChats = Array.isArray(chats)
    ? chats
    : [];

  return (
    <div className="w-[300px] h-screen bg-[#111827] border-r border-white/[0.06] flex flex-col p-5">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          NovaMind
        </h1>

        <p className="text-sm text-gray-400">
          Think Faster. Learn Smarter.
        </p>
      </div>

      {/* New Chat Button */}
      <button
        onClick={handleNewChat}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#5B7FFF] to-[#7A5CFA] hover:opacity-90 transition-all text-white py-3 rounded-2xl font-medium mb-8"
      >
        <FiPlus />
        New Chat
      </button>

      {/* Recent Chats */}
      <h2 className="text-gray-400 text-sm mb-4">
        Recent Chats
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3">

        {safeChats.length === 0 ? (
          <div className="text-gray-500 text-sm">
            No chats yet
          </div>
        ) : (
          safeChats.map(
            (chat, index) => (
              <div
                key={index}
                onClick={() =>
                  setCurrentChatIndex(
                    index
                  )
                }
                className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                  currentChatIndex ===
                  index
                    ? "bg-[#1A1F2E] border-[#5B7FFF]/30"
                    : "bg-[#151A24] border-transparent hover:bg-[#1A1F2E]"
                }`}
              >
                <h3 className="text-white text-sm font-medium truncate">
                  {chat?.title ||
                    `Chat ${
                      index + 1
                    }`}
                </h3>

                <p className="text-gray-400 text-xs mt-1 truncate">
                  {Array.isArray(
                    chat?.messages
                  ) &&
                  chat.messages
                    .length > 0
                    ? chat.messages[
                        0
                      ]?.text ||
                      "New Chat"
                    : "New Chat"}
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
export default Sidebar;