import { motion } from "framer-motion";

function TypingLoader() {
  return (
    <div className="flex justify-start">

      <div className="bg-white/5 border border-white/10 rounded-[2rem] px-6 py-5 flex items-center gap-3">

        <span className="text-gray-300">
          NovaMind
        </span>

        <div className="flex gap-2">

          {[0, 1, 2].map(
            (dot) => (
              <motion.div
                key={dot}
                animate={{
                  y: [
                    0,
                    -6,
                    0,
                  ],
                }}
                transition={{
                  duration:
                    0.6,
                  repeat:
                    Infinity,
                  delay:
                    dot *
                    0.2,
                }}
                className="w-2 h-2 rounded-full bg-cyan-400"
              />
            )
          )}

        </div>

      </div>
    </div>
  );
}

export default TypingLoader;