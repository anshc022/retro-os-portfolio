import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import exp from "../assets/me/exp.gif";
import { RefreshCw } from "lucide-react";

export default function Experience() {
  const [focus, setFocus] = useState("none");
// inside Experience component
const [screenWidth, setScreenWidth] = useState(window.innerWidth);

// Update screenWidth on resize
useEffect(() => {
  const handleResize = () => setScreenWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

const panelWidth = screenWidth < 640 ? "310px" : "500px";
  // Define zoom areas
  const zoomConfig = {
    none: { scale: 1, x: 0, y: 0 },
    topLeft: { scale: 1.5, x: "25%", y: "25%" },
    center: { scale: 2, x: "40%", y: "-50%" },
    bottomRight: { scale: 1.5, x: "-10%", y: "10%" },
    bottomLeft: { scale: 1.5, x: "20%", y: "-15%" },
  };
  const focusText = {
  topLeft: (
    <>
      <div className="w-full bg-blue-500 text-white leading-sm pl-2">Co-founder, GrafikGalore (2023–Present)</div><br />
      - Managing e-commerce operations and customer relations<br />
      - Specialized in graphic design and custom products<br />
      - Building brand presence and managing business operations
    </>
  ),
  center: (
    <>
      <div className="w-full bg-blue-500 text-white leading-sm pl-2">AI Intern, ApanaGhr (June–Sep 2025)</div><br />
      - Contributing to AI/ML projects in rental housing ecosystem<br />
      - Developing solutions using JavaScript, TypeScript, and Python<br />
      - Working on innovative AI applications for real estate
    </>
  ),
  bottomRight: (
    <>
      <div className="w-full bg-blue-500 text-white leading-sm pl-2">Campus Roles (2025–2026)</div><br />
      - Perplexity Campus Partner, KIIT: Promoting Comet Browser<br />
      - Campus Ambassador, Unstop: Leading networking initiatives<br />
      - Building community engagement and innovation awareness
    </>
  ),
  bottomLeft: (
    <>
      <div className="w-full bg-blue-500 text-white leading-sm pl-2">Co-founder & CMO, Fasal Seva (2024–Present)</div><br />
      - Leading marketing strategies and brand development<br />
      - Managing agricultural technology initiatives<br />
      - Driving growth and farmer engagement programs
    </>
  ),
};

  return (
    <div className="sm:h-[500px] sm:w-[900px] overflow-hidden text-sm sm:text-lg font-bold w-full h-[500px] flex flex-col sm:flex-row relative">
      <div className="sm:h-[530px] sm:w-[900px] h-full w-full relative overflow-hidden">

        {/* Zoomable Image */}
        <motion.img
          src={exp}
          className="h-full w-full object-cover absolute top-0 left-0"
          animate={zoomConfig[focus]}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {/* Centered Expanding Info Panel */}
        {focus !== "none" && (
          <>
          <motion.div
            key={focus} // so animation restarts when focus changes
            initial={{ width: 0, opacity: 0, color:"transparent" }}
            animate={{ width: panelWidth, opacity: 1, color:"black"  }}
            transition={{ duration: 0.6, ease: "easeInOut", type:"spring", delay: 1 }}
            className="absolute  overflow-hidden sm:h-44 top-32 sm:left-48 p-4 shadow-xl text-sm sm:text-lg z-30 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-gray-300 text-black cursor-pointer shadow-md"
          >
            {focusText[focus]}
          </motion.div>
          
          </>
        )}
        {/* Buttons */}
        <div className="absolute bottom-5 sm:bottom-14 w-full justify-between flex flex-row sm:px-10 p-5">
          <button
            onClick={() => setFocus("topLeft")}
            className="hover:bg-blue-400 text-sm sm:text-lg flex justify-center items-center w-16 sm:w-24 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-blue-600 text-white cursor-pointer shadow-md"
          >
            GrafikGalore
          </button>
          <button
            onClick={() => setFocus("center")}
            className="hover:bg-blue-400 text-sm sm:text-lg flex justify-center items-center w-16 sm:w-24 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-blue-600 text-white cursor-pointer shadow-md"
          >
            ApanaGhr
          </button>
          <button
            onClick={() => setFocus("bottomLeft")}
            className="hover:bg-blue-400 text-sm sm:text-lg flex justify-center items-center w-16 sm:w-24 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-blue-600 text-white cursor-pointer shadow-md"
          >
            Fasal Seva
          </button>
          <button
            onClick={() => setFocus("bottomRight")}
            className="hover:bg-blue-400 text-sm sm:text-lg flex justify-center items-center w-16 sm:w-24 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-blue-600 text-white cursor-pointer shadow-md"
          >
            Campus
          </button>
          
        </div>
        <button
            onClick={() => setFocus("none")}
            className="absolute top-5 right-5 hover:bg-blue-400 text-sm sm:text-2xl flex justify-center items-center p-1 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-blue-600 text-white cursor-pointer shadow-md"
          >
            <RefreshCw />
          </button>
      </div>
    </div>
  );
}
