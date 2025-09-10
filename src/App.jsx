import { useState } from "react";
import BootLoader from "./components/BootLoader";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import AboutIcon from "./assets/desktopIcons/about.png";
import ExperienceIcon from "./assets/desktopIcons/experience.png";
import StudyIcon from "./assets/desktopIcons/study.png";
import ProjectsIcon from "./assets/desktopIcons/projects.png";
import ArtIcon from "./assets/desktopIcons/art.png";
import SkillIcon from "./assets/desktopIcons/skills.png";
import MailIcon from "./assets/desktopIcons/mail.png";
import GameIcon from "./assets/desktopIcons/games.png";
import TerminalIcon from "./assets/buttons/open-folder.png";
import desktopBg from "./assets/gif/desktop-bg.gif"
import ankitaImg from "./assets/me/ankita-cose-no-bg.png"
import StickyNote from "./components/StickyNote";
import useRetroSounds from "./utils/sounds"
import butterfly from "./assets/gif/butterfly.gif"
import night from "./assets/gif/night-bg.jpg"
import About from "./pages/About";
import Projects from "./pages/Projects";
import Study from "./pages/Study";
import Experience from "./pages/Experience";
import Art from "./pages/Art";
import Skills from "./pages/Skills";
import {motion} from "framer-motion";
import GameHub from "./components/GameHub";
import Connect from "./pages/Connect";
import Terminal from "./components/Terminal";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [openApps, setOpenApps] = useState([]);
  const [theme, setTheme] = useState("morning");
  const [showImageNote, setShowImageNote] = useState(true); // Auto show when website opens
  const [minimizedApps, setMinimizedApps] = useState([]); // Track minimized apps
  const { playClick } = useRetroSounds();

  const openWindow = (id) => {
    playClick();
    setOpenApps((prev) => [...new Set([...prev, id])]);
  };

  const closeWindow = (id) => {
    setOpenApps((prev) => prev.filter((w) => w !== id));
    setMinimizedApps((prev) => prev.filter((w) => w !== id));
  };
  
  const minimizeApp = (id) => {
    setMinimizedApps((prev) => [...prev, id]);
  };
  
  const restoreApp = (id) => {
    setMinimizedApps((prev) => prev.filter((w) => w !== id));
  };
  
  const handleTheme =(theme) =>{
    setTheme(theme);
    // console.log(theme);
  }
  return (
    <>
      {!booted && <BootLoader onFinish={() => setBooted(true)} />}
      {booted && (
        <div className="h-screen cursor w-screen overflow-hidden relative">
          {/* <CustomCursor/> */}
          <img 
            src={desktopBg} 
            className="h-full w-full object-cover fixed top-0"
            alt="Desktop Background"
          />
           {theme == "night" && <img src={night} className="h-full w-full object-cover fixed top-0"></img>
          //  <div className="h-screen w-screen bg-gradient-to-r from-black/60 via-blue-900/20 to-black/60  absolute top-0">
          }
           <img src={butterfly} className="h-24 w-24 object-cover fixed bottom-20 right-10 cursor-pointer"></img>
          
          {/* Ankita Image on Desktop */}
          <motion.img 
            src={ankitaImg} 
            className="h-40 w-32 sm:h-60 sm:w-48 object-contain fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer hover:scale-105 transition-transform"
            drag
            /* Allow free movement across the viewport */
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
            onClick={() => {
              playClick();
              setShowImageNote(!showImageNote);
            }}
            alt="Ankita"
          />
          
          {/* Speech Bubble Sticky Note */}
          {showImageNote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              className="fixed bottom-72 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="relative bg-yellow-300 border-2 border-gray-400 rounded-lg p-4 shadow-lg max-w-xs">
                <div className="text-black text-sm font-medium">
                  👋 Hi! I'm Ankita Rahi! A 3rd-year B.Tech CSE student at KIIT University specializing in AI/ML and full-stack development. Click around to explore my portfolio!
                </div>
                {/* Speech bubble arrow */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-yellow-300"></div>
                {/* Close button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowImageNote(false);
                  }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Desktop Icons */}
          <div className="absolute top-4 left-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DesktopIcon
              icon={AboutIcon}
              label="About.exe"
              onClick={() => openWindow("about")}
            />
            <DesktopIcon
              icon={ProjectsIcon}
              label="Projects.exe"
              onClick={() => openWindow("projects")}
            />
            <DesktopIcon
              icon={ExperienceIcon}
              label="Experience.exe"
              onClick={() => openWindow("exp")}
            />
            <DesktopIcon
              icon={StudyIcon}
              label="Education.exe"
              onClick={() => openWindow("study")}
            />
            <DesktopIcon
              icon={SkillIcon}
              label="Skills.exe"
              onClick={() => openWindow("skills")}
            />
            <DesktopIcon
              icon={ArtIcon}
              label="ArtStudio.exe"
              onClick={() => openWindow("art")}
            />
            <DesktopIcon
              icon={TerminalIcon}
              label="Terminal.exe"
              onClick={() => openWindow("terminal")}
            />
            <DesktopIcon
              icon={ArtIcon}
              label="Music.exe"
              onClick={() => openWindow("music")}
            />
            
            
          </div>
          <motion.div
                  className="absolute top-64 right-5 flex flex-col items-center cursor-pointer select-none w-20 sm:w-44 sm:h-32 text-xs text-white"
                  drag
                  dragConstraints={{ top: 0, left: 0 }}
                  onClick={() => openWindow("game")}
                >
                  <img src={GameIcon} alt={"Game.exe"} className="w-10 h-10 sm:w-20 sm:h-20 hover:border-2 hover:border-amber-300 hover:rounded-lg" />
                  <span className="mt-1 text-black text-center text-sm sm:text-xl bg-amber-300 px-2 sm:px-5">Game.exe</span>
           </motion.div>
          <motion.div
                  className="absolute bottom-44 right-5 flex flex-col items-center cursor-pointer select-none w-20 sm:w-44 sm:h-32 text-xs text-white"
                  drag
                  dragConstraints={{ top: 0, left: 0 }}
                  onClick={() => openWindow("connect")}
                >
                  <img src={MailIcon} alt={"LetsConnect.exe"} className="w-10 h-10 sm:w-20 sm:h-20 hover:border-2 hover:border-amber-300 hover:rounded-lg" />
                  <span className="mt-1 text-black text-center text-sm sm:text-xl bg-amber-300 px-2 sm:px-5">LetsConnect.exe</span>
           </motion.div>

          {/* Windows */}
          {openApps.includes("about") && (
            <Window title="About.exe" onClose={() => closeWindow("about")}>
              <About />
            </Window>
          )}
          {openApps.includes("projects") && (
            <Window title="Projects.exe" onClose={() => closeWindow("projects")}>
              <Projects/>
            </Window>
          )}
          {openApps.includes("study") && (
            <Window title="Education.exe" onClose={() => closeWindow("study")}>
              <Study/>
            </Window>
          )}
           {openApps.includes("exp") && (
            <Window title="Experience.exe" onClose={() => closeWindow("exp")}>
              <Experience/>
            </Window>
          )}
          {openApps.includes("skills") && (
            <Window title="Skills.exe" onClose={() => closeWindow("skills")}>
              <Skills/>
              {/* <SkillsComputer /> */}
            </Window>
          )}
          {openApps.includes("art") && (
            <Window title="ArtStudio.exe" onClose={() => closeWindow("art")}>
              <Art/>
            </Window>
          )}
          {openApps.includes("game") && (
            <Window title="Game.exe" onClose={() => closeWindow("game")}>
              <GameHub />
            </Window>
          )}
          {openApps.includes("terminal") && (
            <Window title="Terminal.exe" onClose={() => closeWindow("terminal")}>
              <Terminal />
            </Window>
          )}
          {openApps.includes("connect") && (
            <Window title="LetsConnect.exe" onClose={() => closeWindow("connect")}>
              <Connect  />
            </Window>
          )}
          {openApps.includes("music") && !minimizedApps.includes("music") && (
            <Window 
              title="Music.exe"
              onClose={() => closeWindow("music")}
              onMinimize={() => minimizeApp("music")}
              initialPosition={{ x: 120, y: 120 }}
            >
              <MusicPlayer 
                onMinimize={() => minimizeApp("music")}
                onClose={() => closeWindow("music")}
                showChrome={false}
              />
            </Window>
          )}
          
          {/* Minimized Music Player */}
          {openApps.includes("music") && minimizedApps.includes("music") && (
            <div 
              className="fixed bottom-16 left-4 bg-gray-300 border border-gray-600 p-2 cursor-pointer z-50"
              onClick={() => restoreApp("music")}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">🎵 Music.exe</span>
                <span className="text-xs animate-pulse">♪</span>
              </div>
            </div>
          )}
          
          <Taskbar 
            onAppClick={openWindow} 
            onThemeChange={handleTheme} 
            currentTheme={theme}
            openApps={openApps}
            onCloseApp={closeWindow}
          />
        </div>
      )}
    </>
  );
}
