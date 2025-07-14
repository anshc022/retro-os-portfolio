// src/components/StickyNote.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import welcome from "../assets/smiley/love.png"

export default function StickyNote({ defaultText = "📝 Type something...", color = "bg-yellow-200" }) {
  const [text, setText] = useState(defaultText);

  return (
    <motion.div
    initial={{top:10 ,right:10}}
      drag
      dragConstraints={{ top: 0, right: 0}}
      className={`absolute w-44 h-44 sm:w-64 sm:h-44 p-2 sm:p-4 rounded-sm shadow-lg ${color} cursor-move text-lg`}
    >
        <span className="flex flex-row sm:text-2xl gap-2"><img src={welcome} className="w-8 h-8"></img> <span className="mt-1">Hello!</span></span>
        {/* <Button className="absolute top-0 h-44 w-44" label="Button Label" variant="primary"/> */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-full text-sm sm:text-lg bg-transparent leading-sm outline-none resize-none"
      >
        

      </textarea>
    </motion.div>
  );
}
