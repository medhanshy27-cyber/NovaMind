import {
  useState,
  useRef,
  useEffect,
} from "react";

import { Mic } from "lucide-react";

import ReactMarkdown from "react-markdown";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { generateResponse } from "../services/gemini";

function ChatWindow({
  chats,
  setChats,
  currentChatIndex,
}) {
  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  const currentChat =
    chats[currentChatIndex];

  // Voice Input
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition not supported on this browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "en-US";

    recognition.interimResults =
      false;

    recognition.maxAlternatives =
      1;

    recognition.start();

    recognition.onresult = (
      event
    ) => {
      const transcript =
        event.results[0][0]
          .transcript;

      setInput(transcript);
    };

    recognition.onerror = (
      event
    ) => {
      console.error(
        "Speech error:",
        event.error
      );
    };
  };

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );
  }, [
    currentChat?.messages,
    loading,
  ]);

  const handleSend =
    async () => {
      if (!input.trim())
        return;

      const updatedChats =
        [...chats];

      // User message
      updatedChats[
        currentChatIndex
      ].messages.push({
        text: input,
        sender: "user",
      });

      // Title
      if (
        updatedChats[
          currentChatIndex
        ].title ===
        "New Chat"
      ) {
        updatedChats[
          currentChatIndex
        ].title =
          input.slice(
            0,
            20
          );
      }

      setChats(
        updatedChats
      );

      const userInput =
        input;

      setInput("");
      setLoading(true);

      try {
        const aiReply =
          await generateResponse(
            userInput
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
        console.error(
          error
        );

        updatedChats[
          currentChatIndex
        ].messages.push({
          text:
            "Something went wrong.",
          sender: "bot",
        });

        setChats([
          ...updatedChats,
        ]);
      }

      setLoading(false);
    };

  // Enter to Send
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
    <div className="flex flex-col h-full w-full max-w-5xl bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-5">

        {currentChat
          ?.messages
          ?.length === 0 &&
          !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center">

              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                NovaMind
              </h1>

              <p className="text-gray-400 mt-4 text-lg">
                Ask anything.
                Learn everything 🚀
              </p>
            </div>
          )}

        {currentChat?.messages?.map(
          (
            msg,
            index
          ) => (
            <div
              key={index}
              className={`flex ${
                msg.sender ===
                "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-5 rounded-3xl text-lg overflow-hidden ${
                  msg.sender ===
                  "user"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                    : "bg-white/10 border border-white/10"
                }`}
              >
                <ReactMarkdown
                  components={{
                    code({
                      children,
                      className,
                      ...props
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
                          PreTag="div"
                          {...props}
                        >
                          {String(
                            children
                          ).replace(
                            /\n$/,
                            ""
                          )}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-black/40 px-2 py-1 rounded"
                          {...props}
                        >
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
            </div>
          )
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 border border-white/10 rounded-3xl px-6 py-4 animate-pulse">
              NovaMind is thinking...
            </div>
          </div>
        )}

        <div
          ref={
            messagesEndRef
          }
        />
      </div>

      {/* Input */}
      <div className="p-5 border-t border-white/10 bg-black/20">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Ask NovaMind anything..."
            value={input}
            onChange={(
              e
            ) =>
              setInput(
                e.target
                  .value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none placeholder-gray-400"
          />

          {/* Mic Button */}
          <button
            onClick={
              startListening
            }
            className="px-5 py-5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
          >
            <Mic />
          </button>

          {/* Send Button */}
          <button
            onClick={
              handleSend
            }
            className="px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:scale-105 transition"
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
}

export default ChatWindow;