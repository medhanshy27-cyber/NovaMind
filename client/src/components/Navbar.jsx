import { Sparkles } from "lucide-react";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 px-8 py-4 bg-transparent">

      <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center shadow-2xl">

        <div className="flex items-center gap-2">
          <Sparkles className="text-cyan-400" />

          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            NovaMind
          </h1>
        </div>

        <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 rounded-xl hover:scale-105 transition">
          Login
        </button>

      </div>
    </div>
  );
}

export default Navbar;