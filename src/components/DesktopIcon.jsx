// src/components/DesktopIcon.jsx
import { motion } from "framer-motion";

export default function DesktopIcon({ icon, label, onClick }) {
  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer select-none w-20 sm:w-44 sm:h-32 text-xs text-white"
      drag
      dragConstraints={{ top: 0, left: 0 }}
      onClick={onClick}
    >
      <img src={icon} alt={label} className="w-10 h-10 sm:w-20 sm:h-20 hover:border-2 hover:border-amber-300 hover:rounded-lg" />
      <span className="mt-1 text-black text-center text-sm sm:text-xl bg-amber-300 px-2 sm:px-5">{label}</span>
    </motion.div>
  );
}
