// src/components/CustomCursor.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cursor from "../assets/cursors/cursor.png"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999]"
      animate={{
        x: position.x - 12, // offset to center
        y: position.y - 12,
      }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 50,
      }}
    >
<img src={cursor}></img>
    </motion.div>
  );
}
