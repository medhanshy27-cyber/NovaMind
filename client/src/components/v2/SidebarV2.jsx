import { motion } from "framer-motion";

import {
  FiPlus,
  FiBook,
  FiCode,
  FiPenTool,
  FiTrendingUp,
  FiLogOut,
  FiTrash2,
  FiEdit2,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

function SidebarV2({
  chats,
  setChats,
  currentChatIndex,
  setCurrentChatIndex,
  createNewChat,
  mode,
  setMode,
}) {
  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );

  // Logout
  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/login");
    };

  // Delete chat
  const handleDeleteChat =
    (indexToDelete) => {
      if (
        chats.length === 1
      )
        return;

      const updatedChats =
        chats.filter(
          (
            _,
            index
          ) =>
            index !==
            indexToDelete
        );

      setChats(
        updatedChats
      );

      if (
        currentChatIndex >=
        updatedChats.length
      ) {
        setCurrentChatIndex(
          updatedChats.length -
            1
        );
      }
    };

  // Rename chat
  const handleRenameChat =
    (index) => {
      const newTitle =
        prompt(
          "Rename chat:"
        );

      if (
        !newTitle?.trim()
      )
        return;

      const updatedChats =
        [...chats];

      updatedChats[
        index
      ].title =
        newTitle;

      setChats(
        updatedChats
      );
    };

  return (
    <motion.div
      initial={{
        x: -80,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="w-[320px] h-full bg-[#111827] border-r border-white/[0.06] p-6 flex flex-col"
    >

      {/* Logo */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-[#A5B4FC] to-[#7A5CFA] bg-clip-text text-transparent">
          NovaMind
        </h1>

        <p className="text-[#9CA3AF] mt-2 text-sm">
          Think Faster.
          Learn Smarter.
        </p>

      </div>

      {/* AI Modes */}
      <div className="mb-8">

        <h2 className="text-[#9CA3AF] text-xs uppercase tracking-[0.2em] mb-4">
          AI Modes
        </h2>

        <div className="space-y-3">

          {/* Study */}
          <div
            onClick={() =>
              setMode(
                "Study"
              )
            }
            className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition ${
              mode ===
              "Study"
                ? "bg-[#5B7FFF]/20 border border-[#5B7FFF]/30"
                : "bg-[#1A1F2E] hover:bg-[#232A3D]"
            }`}
          >
            <FiBook className="text-[#A5B4FC]" />
            <span>
              Study Mode
            </span>
          </div>

          {/* Coding */}
          <div
            onClick={() =>
              setMode(
                "Coding"
              )
            }
            className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition ${
              mode ===
              "Coding"
                ? "bg-[#5B7FFF]/20 border border-[#5B7FFF]/30"
                : "bg-[#1A1F2E] hover:bg-[#232A3D]"
            }`}
          >
            <FiCode className="text-[#A5B4FC]" />
            <span>
              Coding Mode
            </span>
          </div>

          {/* Creative */}
          <div
            onClick={() =>
              setMode(
                "Creative"
              )
            }
            className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition ${
              mode ===
              "Creative"
                ? "bg-[#5B7FFF]/20 border border-[#5B7FFF]/30"
                : "bg-[#1A1F2E] hover:bg-[#232A3D]"
            }`}
          >
            <FiPenTool className="text-[#A5B4FC]" />
            <span>
              Creative Mode
            </span>
          </div>

          {/* Career */}
          <div
            onClick={() =>
              setMode(
                "Career"
              )
            }
            className={`rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition ${
              mode ===
              "Career"
                ? "bg-[#5B7FFF]/20 border border-[#5B7FFF]/30"
                : "bg-[#1A1F2E] hover:bg-[#232A3D]"
            }`}
          >
            <FiTrendingUp className="text-[#A5B4FC]" />
            <span>
              Career Mode
            </span>
          </div>

        </div>
      </div>

      {/* New Chat */}
      <button
        onClick={
          createNewChat
        }
        className="mb-8 flex items-center justify-center gap-2 bg-gradient-to-r from-[#5B7FFF] to-[#7A5CFA] rounded-2xl py-4 font-semibold hover:scale-[1.02] transition"
      >
        <FiPlus />
        New Chat
      </button>

      {/* Recent Chats */}
      <div className="flex-1 overflow-y-auto">

        <h2 className="text-[#9CA3AF] text-xs uppercase tracking-[0.2em] mb-4">
          Recent Chats
        </h2>

        <div className="space-y-3">

          {chats.map(
            (
              chat,
              index
            ) => (
              <div
                key={index}
                className={`rounded-2xl p-4 transition flex items-center justify-between ${
                  currentChatIndex ===
                  index
                    ? "bg-[#5B7FFF]/20 border border-[#5B7FFF]/30"
                    : "bg-[#1A1F2E] hover:bg-[#232A3D]"
                }`}
              >

                <div
                  onClick={() =>
                    setCurrentChatIndex(
                      index
                    )
                  }
                  className="flex-1 cursor-pointer"
                >
                  <p className="truncate text-sm">
                    {
                      chat.title
                    }
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-3">

                  {/* Rename */}
                  <button
                    onClick={() =>
                      handleRenameChat(
                        index
                      )
                    }
                    className="text-[#9CA3AF] hover:text-[#A5B4FC] transition"
                  >
                    <FiEdit2 size={16} />
                  </button>

                  {/* Delete */}
                  {chats.length >
                    1 && (
                    <button
                      onClick={() =>
                        handleDeleteChat(
                          index
                        )
                      }
                      className="text-[#9CA3AF] hover:text-red-400 transition"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}

                </div>

              </div>
            )
          )}

        </div>
      </div>

      {/* Profile */}
      <div className="mt-6 bg-[#1A1F2E] rounded-2xl p-4 border border-white/[0.05]">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#5B7FFF] to-[#7A5CFA] flex items-center justify-center font-bold text-lg">
              {user?.name?.[0] ||
                "U"}
            </div>

            <div>
              <p className="font-medium">
                {user?.name ||
                  "User"}
              </p>

              <p className="text-xs text-[#9CA3AF]">
                NovaMind User
              </p>
            </div>

          </div>

          <button
            onClick={
              handleLogout
            }
            className="text-[#9CA3AF] hover:text-red-400 transition text-xl"
          >
            <FiLogOut />
          </button>

        </div>
      </div>

    </motion.div>
  );
}

export default SidebarV2;