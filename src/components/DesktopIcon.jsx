// src/components/DesktopIcon.jsx
import { motion } from "framer-motion";
import { mobile } from "../utils/appUtils";
import { useEffect, useRef } from "react";

export default function DesktopIcon({ icon, label, onClick }) {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current) {
      mobile.addTouchFeedback(ref.current);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      className="desktop-icon flex flex-col items-center cursor-pointer select-none w-20 sm:w-44 sm:h-32 text-xs text-white hover:scale-110 focus:scale-110 transition-transform"
      drag
      dragConstraints={{ top: 0, left: 0 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${label}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <img 
        src={icon} 
        alt="" 
        className="w-10 h-10 sm:w-20 sm:h-20 hover:border-2 hover:border-amber-300 hover:rounded-lg" 
        draggable={false}
      />
      <span className="mt-1 text-black text-center text-sm sm:text-xl bg-amber-300 px-2 sm:px-5">
        {label}
      </span>
    </motion.div>
  );
}
