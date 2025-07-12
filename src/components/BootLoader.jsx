// src/components/BootLoader.jsx
import { useEffect, useState } from "react";
import rabbitGif from "../assets/gif/rabbit-hopping.gif";

export default function BootLoader({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 3000); // show for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-rose-300 text-sm sm:text-lg font-mono">
      <div className="flex flex-col items-center gap-4">
        <img src={rabbitGif} alt="Booting..." className="w-full h-32 sm:h-44" />
        <p>Hop on to my portfolio...</p>
      </div>
    </div>
  );
}
