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
import back from "./assets/gif/desktop-bg.gif"
import StickyNote from "./components/StickyNote";
import useRetroSounds from "./utils/sounds"
import butterfly from "./assets/gif/butterfly.gif"
import night from "./assets/gif/night-bg.jpg"
import CustomCursor from "./components/CustomCursor";
import { Button } from "pixel-react";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Study from "./pages/Study";
import Experience from "./pages/Experience";
import Art from "./pages/Art";
import Skills from "./pages/Skills";

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
            </Window>
          )}
          {openApps.includes("art") && (
            <Window title="ArtStudio.exe" onClose={() => closeWindow("art")}>
              <Art/>
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
