import { motion } from "framer-motion";

function BackgroundGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      <motion.div
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"
      />

      <motion.div
        animate={{
          x: [0, -80, 80, 0],
          y: [0, -40, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-[150px] opacity-20"
      />
    </div>
  );
}

export default BackgroundGlow;