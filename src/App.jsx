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
import back from "./assets/gif/desktop-bg.gif"
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
import RabbitGame from "./components/RabbitGame";
import Connect from "./pages/Connect";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [openApps, setOpenApps] = useState([]);
  const [theme, setTheme] = useState("morning");
  const { playClick } = useRetroSounds();

  const openWindow = (id) => {
    playClick();
    setOpenApps((prev) => [...new Set([...prev, id])]);
  };

  const closeWindow = (id) => {
    setOpenApps((prev) => prev.filter((w) => w !== id));
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
          <img src={back} className="h-full w-full object-cover fixed top-0"></img>
           {theme == "night" && <img src={night} className="h-full w-full object-cover fixed top-0"></img>
          //  <div className="h-screen w-screen bg-gradient-to-r from-black/60 via-blue-900/20 to-black/60  absolute top-0">
          }
           <img src={butterfly} className="h-24 w-24 object-cover fixed bottom-20 right-10 cursor-pointer"></img>
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
              <RabbitGame />
            </Window>
          )}
          {openApps.includes("connect") && (
            <Window title="LetsConnect.exe" onClose={() => closeWindow("connect")}>
              <Connect  />
            </Window>
          )}
          <StickyNote defaultText="Im Shruti! A full-stack developer blending modern code with nostalgic pixels."
           color="bg-yellow-300"/>
          <Taskbar onAppClick={openWindow} onThemeChange={handleTheme} currentTheme={theme} />


        </div>
      )}
    </>
  );
}
