import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  FiSend,
  FiMic,
  FiPaperclip,
} from "react-icons/fi";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { generateResponse } from "../../services/gemini";
import TypingLoader from "./TypingLoader";

function ChatWindowV2({
  chats,
  setChats,
  currentChatIndex,
  mode,
}) {
  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  const currentChat =
    chats[currentChatIndex];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }, [
    currentChat?.messages,
    loading,
  ]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition not supported."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "en-US";

    recognition.start();

    recognition.onresult = (
      event
    ) => {
      const transcript =
        event.results[0][0]
          .transcript;

      setInput(transcript);
    };
  };

  const handleSend =
    async () => {
      if (!input.trim())
        return;

      const updatedChats =
        [...chats];

      updatedChats[
        currentChatIndex
      ].messages.push({
        text: input,
        sender: "user",
      });

      setChats(updatedChats);

      const userInput =
        input;

      setInput("");
      setLoading(true);

      try {
        const prompts = {
  Study:
    "You are a smart study assistant. Explain things simply, exam-focused, and beginner-friendly.",

  Coding:
    "You are an expert software engineer. Help with coding, debugging, DSA, and programming concepts clearly.",

  Creative:
    "You are a creative assistant helping with ideas, writing, imagination, content creation, and brainstorming.",

  Career:
    "You are a placement and career mentor helping with resumes, internships, interview prep, and career guidance.",
};

const aiReply =
  await generateResponse(
    `${prompts[mode]}

User Question:
${userInput}`
  
          );

        updatedChats[
          currentChatIndex
        ].messages.push({
          text: aiReply,
          sender: "bot",
        });

        setChats([
          ...updatedChats,
        ]);
      } catch (
        error
      ) {
        console.log(
          error
        );
      }

      setLoading(false);
    };

  const handleKeyDown =
    (e) => {
      if (
        e.key ===
        "Enter"
      ) {
        handleSend();
      }
    };

  return (
    <div className="h-full flex flex-col rounded-[32px] overflow-hidden border border-white/[0.06] bg-[#111827] shadow-[0_0_60px_rgba(91,127,255,0.08)]">

      {/* Top Bar */}
      <div className="px-8 py-5 border-b border-white/[0.06] bg-[#111827]/90 backdrop-blur-2xl flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-semibold text-[#F5F7FA]">
            NovaMind
          </h1>

          <p className="text-[#9CA3AF] text-sm">
            Your intelligent workspace
          </p>
        </div>

        <div className="bg-[#5B7FFF]/10 border border-[#5B7FFF]/20 px-4 py-2 rounded-2xl text-[#A5B4FC] text-sm">
          {mode} Mode
        </div>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#09090B]">

        {currentChat?.messages
          ?.length === 0 &&
          !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center">

              <div className="absolute w-[500px] h-[500px] rounded-full bg-[#5B7FFF]/10 blur-[120px]" />

              <h1 className="text-7xl font-bold bg-gradient-to-r from-[#FFFFFF] via-[#A5B4FC] to-[#7A5CFA] bg-clip-text text-transparent z-10">
                NovaMind
              </h1>

              <p className="text-[#9CA3AF] mt-5 text-lg z-10">
                Think Faster.
                Learn Smarter.
              </p>

            </div>
          )}

        {currentChat?.messages?.map(
          (
            msg,
            index
          ) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className={`flex ${
                msg.sender ===
                "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-[28px] px-6 py-5 shadow-lg ${
                  msg.sender ===
                  "user"
                    ? "bg-gradient-to-r from-[#5B7FFF] to-[#7A5CFA] text-white"
                    : "bg-[#1A1F2E] border border-white/[0.05] text-[#F5F7FA]"
                }`}
              >
                <ReactMarkdown
                  components={{
                    code({
                      children,
                      className,
                    }) {
                      const match =
                        /language-(\w+)/.exec(
                          className ||
                            ""
                        );

                      return match ? (
                        <SyntaxHighlighter
                          style={
                            oneDark
                          }
                          language={
                            match[1]
                          }
                        >
                          {String(
                            children
                          )}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-black/20 px-2 py-1 rounded">
                          {
                            children
                          }
                        </code>
                      );
                    },
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </motion.div>
          )
        )}

        {loading && (
          <TypingLoader />
        )}

        <div
          ref={
            messagesEndRef
          }
        />
      </div>

      {/* Input */}
      <div className="bg-[#111827] border-t border-white/[0.06] p-6">

        <div className="bg-[#1A1F2E] border border-white/[0.06] rounded-[28px] px-5 py-4 flex items-center">

          <button className="text-[#9CA3AF] text-xl mr-4 hover:text-white transition">
            <FiPaperclip />
          </button>

          <input
            type="text"
            placeholder="Ask NovaMind anything..."
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="flex-1 bg-transparent outline-none text-[#F5F7FA] placeholder-[#6B7280]"
          />

          <button
            onClick={
              startListening
            }
            className="text-[#A5B4FC] text-xl mr-4 hover:scale-110 transition"
          >
            <FiMic />
          </button>

          <button
            onClick={
              handleSend
            }
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#5B7FFF] to-[#7A5CFA] flex items-center justify-center text-white hover:scale-105 transition"
          >
            <FiSend />
          </button>

        </div>
      </div>
    </div>
  );
}

export default ChatWindowV2;