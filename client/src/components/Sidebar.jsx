import { Trash2 } from "lucide-react";

function Sidebar({
  chats,
  currentChatIndex,
  setCurrentChatIndex,
  createNewChat,
  deleteChat,
}) {
  return (
    <div className="w-72 h-full bg-white/10 backdrop-blur-2xl border-r border-white/10 p-5 overflow-y-auto">

      <button
        onClick={createNewChat}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl p-4 mb-8 font-semibold"
      >
        + New Chat
      </button>

      <h2 className="text-gray-400 text-sm mb-4">
        Recent Chats
      </h2>

      <div className="space-y-3">

        {chats.map(
          (chat, index) => (
            <div
              key={index}
              onClick={() =>
                setCurrentChatIndex(
                  index
                )
              }
              className={`p-4 rounded-2xl cursor-pointer transition flex justify-between items-center ${
                currentChatIndex ===
                index
                  ? "bg-cyan-500/30 border border-cyan-400"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <span className="truncate">
                {chat.title}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(
                    index
                  );
                }}
                className="text-red-400"
              >
                <Trash2
                  size={18}
                />
              </button>
            </div>
          )
        )}

      </div>
    </div>
  );
}

export default Sidebar;