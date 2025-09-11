// src/components/Window.jsx
import { motion } from "framer-motion";
import { X } from "lucide-react"; // optional close icon
import { useEffect, useRef, useState } from "react";
import { a11y, mobile } from "../utils/appUtils";

const Window = ({ title, children, onClose, onMinimize, initialPosition }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const handleCenter = () => {
      if (ref.current) {
        if (initialPosition && typeof initialPosition.x === 'number' && typeof initialPosition.y === 'number') {
          setPosition({ x: initialPosition.x, y: initialPosition.y });
        } else {
          const { offsetWidth, offsetHeight } = ref.current;
          const x = (window.innerWidth - offsetWidth) / 2;
          const y = (window.innerHeight - offsetHeight) / 2;
          setPosition({ x, y });
        }
      }
    };
    handleCenter();
    
    // Trap focus within window
    if (ref.current) {
      a11y.trapFocus(ref.current);
    }
    
    // Close on escape
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [initialPosition, onClose]);
  
  return (
    <motion.div
      ref={ref}
      className="absolute min-w-80 mt-10 select-none z-50 h-full"
      drag={!mobile.isSmallScreen()} // Disable drag on small screens
      dragConstraints={{ top: 0, left: 0 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, x: position.x, y: position.y }}
      role="dialog"
      aria-labelledby="window-title"
      aria-modal="true"
    >
      {/* Beveled Border */}
      <div className="border-t-2 border-l-2 border-white border-b-4 border-r-4 border-b-gray-500 border-r-gray-500 bg-gray-200 shadow-md">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-400 text-white text-lg px-2 py-1 flex justify-between items-center">
          <span id="window-title">{title}</span>
          <div className="flex items-center gap-1 window-controls">
            {onMinimize && (
              <button 
                onClick={onMinimize} 
                className="taskbar-button hover:bg-blue-600 p-1 focus:bg-blue-600"
                aria-label="Minimize window"
                title="Minimize"
              >
                _
              </button>
            )}
            <button 
              onClick={onClose} 
              className="taskbar-button hover:bg-red-600 p-1 focus:bg-red-600"
              aria-label="Close window"
              title="Close (Esc)"
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Inner Content */}
        <div className="window-content overflow-y-auto text-lg text-black font-retro border border-gray-400 bg-white">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Window;
