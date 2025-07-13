// src/components/Taskbar.jsx
import { useState } from "react";
import morning from "../assets/buttons/morning.png";
import night from "../assets/buttons/night.png";
import clock from "../assets/buttons/clock.png";
import AboutIcon from "../assets/desktopIcons/about.png";
import ExperienceIcon from "../assets/desktopIcons/experience.png";
import StudyIcon from "../assets/desktopIcons/study.png";
import ProjectsIcon from "../assets/desktopIcons/projects.png";
import ArtIcon from "../assets/desktopIcons/art.png";
export default function Taskbar({ onAppClick, onThemeChange, currentTheme }) {

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <>
      {/* Start Menu */}
      {showMenu && (
        <div className="absolute bottom-12 left-0 w-48 border-t border-l border-white border-b-2 border-r-2 border-b-gray-700 border-r-gray-700 bg-gray-100 shadow-md z-50">
          <div
            onClick={() => {
              onAppClick("about");
              setShowMenu(false);
            }}
            className="px-3 py-2 hover:bg-blue-600 border-b-2 border-gray-300 hover:text-white cursor-pointer"
          >
            <img src={AboutIcon} alt="About" className="inline-block w-4 h-4 mr-2" /> About.exe
          </div>
          <div
            onClick={() => {
              onAppClick("projects");
              setShowMenu(false);
            }}
            className="px-3 py-2 hover:bg-blue-600 border-b-2 border-gray-300 hover:text-white cursor-pointer"
          >
          <img src={ProjectsIcon} alt="Projects" className="inline-block w-4 h-4 mr-2" /> Projects.exe
          </div>
          <div
            onClick={() => {
              onAppClick("study");
              setShowMenu(false);
            }}
            className="px-3 py-2 hover:bg-blue-600 border-b-2 border-gray-300 hover:text-white cursor-pointer"
          >
            <img src={StudyIcon} alt="Study" className="inline-block w-4 h-4 mr-2" /> Education.exe
          </div>
          <div
            onClick={() => {
              onAppClick("exp");
              setShowMenu(false);
            }}
            className="px-3 py-2 hover:bg-blue-600 border-b-2 border-gray-300 hover:text-white cursor-pointer"
          >
            <img src={ExperienceIcon} alt="Experience" className="inline-block w-4 h-4 mr-2" /> Experience.exe
          </div>
          <div
            onClick={() => {
              onAppClick("art");
              setShowMenu(false);
            }}
            className="px-3 py-2 hover:bg-blue-600 border-b-2 border-gray-300 hover:text-white cursor-pointer"
          >
            <img src={ArtIcon} alt="Art" className="inline-block w-4 h-4 mr-2" /> ArtStudio.exe
          </div>
          <div
            onClick={() => {
              onAppClick("contact");
              setShowMenu(false);
            }}
            className="px-3 py-2 hover:bg-blue-600 border-b-2 border-gray-300 hover:text-white cursor-pointer"
          >
            📬 Contact.exe
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 font-bold left-0 right-0 border-t border-l border-white border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-gray-200 shadow-md text-black text-sm sm:text-2xl p-1 flex items-center z-40">
        <button
          onClick={toggleMenu}
          className="mr-4 px-4 sm:w-32  border-t border-l border-white border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-gray-200 shadow-inner active:shadow-none hover:bg-gray-400"
        >
          Start
        </button>
        
        <div className="ml-auto flex leading-sm flex-row px-4 text-sm sm:text-2xl">
          {currentTheme === "morning" ? 
          ( <img src={morning} className= "hover:scale-110 w-4 h-4 sm:w-8 sm:h-8 mx-2 cursor-pointer" onClick={() => onThemeChange("night")}></img>):
           (<img src={night} className="hover:scale-110  w-4 h-4 sm:w-8 sm:h-8 w-8 h-8 mx-2 cursor-pointer" onClick={() => onThemeChange("morning")}></img>)
           }
          <img src={clock} className="sm:w-10 sm:h-9  w-4 h-4"></img>
          <div>{new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    </>
  );
}
