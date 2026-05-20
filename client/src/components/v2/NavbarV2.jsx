import React from "react";

function NavbarV2({ mode, setMode }) {
  const modes = [
    "Study",
    "Coding",
    "Career",
    "Creative",
  ];

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0b1120]">
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          NovaMind
        </h1>
        <p className="text-gray-400 text-sm">
          Your intelligent workspace
        </p>
      </div>

      {/* Modes */}
      <div className="flex gap-3">
        {modes.map((item) => (
          <button
            key={item}
            onClick={() => setMode(item)}
            className={`px-4 py-2 rounded-xl transition-all duration-300 ${
              mode === item
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                : "bg-[#111827] text-gray-300 hover:bg-[#1f2937]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavbarV2;