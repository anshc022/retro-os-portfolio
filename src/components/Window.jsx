// src/components/Window.jsx
import { motion } from "framer-motion";
import { X } from "lucide-react"; // optional close icon
import { useEffect, useRef, useState } from "react";

const Window = ({ title, children, onClose }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const handleCenter = () => {
      if (ref.current) {
        const { offsetWidth, offsetHeight } = ref.current;
        const x = (window.innerWidth - offsetWidth) / 2;
        const y = (window.innerHeight - offsetHeight) / 2;
        setPosition({ x, y });
      }
    };
    handleCenter();
  }, []);
  return (
    <motion.div
      ref={ref}
      className="absolute min-w-80 mt-10 select-none z-50 h-full"
      drag
      dragConstraints={{ top: 0, left: 0 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
    >
      {/* Beveled Border */}
      <div className=" border-t-2 border-l-2 border-white border-b-4 border-r-4 border-b-gray-500 border-r-gray-500 bg-gray-200 shadow-md">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-400 text-white text-lg px-2 py-1 flex justify-between items-center">
          <span>{title}</span>
          <button onClick={onClose} className="hover:bg-red-600 p-1">
            <X size={12} />
          </button>
        </div>

        {/* Inner Content */}
        <div className=" overflow-y-auto text-lg text-black font-retro border border-gray-400 bg-white">{children}</div>
      </div>
    </motion.div>
  );
};

export default Window;
