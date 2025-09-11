import { useState, useEffect } from "react";
import BootLoader from "./components/BootLoader";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import AboutIcon from "./assets/desktopIcons/about.png";
import ExperienceIcon from "./assets/desktopIcons/experience.png";
import StudyIcon from "./assets/desktopIcons/study.png";
import ProjectsIcon from "./assets/desktopIcons/projects.png";
import SkillIcon from "./assets/desktopIcons/skills.png";
import MailIcon from "./assets/desktopIcons/mail.png";
import GameIcon from "./assets/desktopIcons/games.png";
import TerminalIcon from "./assets/buttons/open-folder.png";
import CertificateIcon from "./assets/desktopIcons/skills.png";
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
import Skills from "./pages/Skills";
import Certificates from "./pages/Certificates";
import {motion} from "framer-motion";
import GameHub from "./components/GameHub";
import Connect from "./pages/Connect";
import Terminal from "./components/Terminal";
import MusicPlayer from "./components/MusicPlayer";
import { analytics, pwa, mobile, a11y } from "./utils/appUtils";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [openApps, setOpenApps] = useState([]);
  const [theme, setTheme] = useState("morning");
  const [showImageNote, setShowImageNote] = useState(true); // Auto show when website opens
  const [minimizedApps, setMinimizedApps] = useState([]); // Track minimized apps
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const { playClick } = useRetroSounds();

  // Initialize PWA and analytics
  useEffect(() => {
    pwa.init();
    analytics.track('app_loaded');
    
    // Check if PWA can be installed
    if (!pwa.isInstalled()) {
      setTimeout(() => setShowInstallPrompt(true), 5000);
    }
    
    // Dark mode from localStorage
    const savedDarkMode = localStorage.getItem('ankita-dark-mode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Keyboard shortcuts
    const handleKeyboard = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'd':
            e.preventDefault();
            toggleDarkMode();
            break;
          case 'k':
            e.preventDefault();
            openWindow('terminal');
            break;
        }
      }
      
      if (e.key === 'Escape' && openApps.length > 0) {
        closeWindow(openApps[openApps.length - 1]);
      }
    };
    
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  const openWindow = (id) => {
    playClick();
    setOpenApps((prev) => [...new Set([...prev, id])]);
    analytics.track('app_opened', { app: id });
    a11y.announceToScreenReader(`Opened ${id} application`);
  };

  const closeWindow = (id) => {
    setOpenApps((prev) => prev.filter((w) => w !== id));
    setMinimizedApps((prev) => prev.filter((w) => w !== id));
    analytics.track('app_closed', { app: id });
    a11y.announceToScreenReader(`Closed ${id} application`);
  };
  
  const minimizeApp = (id) => {
    setMinimizedApps((prev) => [...prev, id]);
    analytics.track('app_minimized', { app: id });
  };
  
  const restoreApp = (id) => {
    setMinimizedApps((prev) => prev.filter((w) => w !== id));
    analytics.track('app_restored', { app: id });
  };
  
  const handleTheme = (theme) => {
    setTheme(theme);
    analytics.track('theme_changed', { theme });
  };
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('ankita-dark-mode', newDarkMode);
    analytics.track('dark_mode_toggled', { enabled: newDarkMode });
    a11y.announceToScreenReader(`${newDarkMode ? 'Enabled' : 'Disabled'} dark mode`);
  };
  
  const installPWA = async () => {
    const installed = await pwa.install();
    if (installed) {
      setShowInstallPrompt(false);
    }
  };
  return (
    <>
      {!booted && <BootLoader onFinish={() => setBooted(true)} />}
      {booted && (
        <div className={`h-screen cursor w-screen overflow-hidden relative ${isDarkMode ? 'dark' : ''}`}>
          {/* PWA Install Prompt */}
          {showInstallPrompt && !pwa.isInstalled() && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-3 rounded shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">Install Ankita's Portfolio</span>
                <button
                  onClick={() => setShowInstallPrompt(false)}
                  className="text-white hover:bg-blue-700 px-2 py-1 rounded text-xs"
                  aria-label="Close install prompt"
                >
                  ×
                </button>
              </div>
              <button
                onClick={installPWA}
                className="bg-white text-blue-600 px-3 py-1 rounded text-sm hover:bg-gray-100"
              >
                Install App
              </button>
            </motion.div>
          )}
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`fixed top-4 left-4 z-50 p-2 rounded-full transition-colors ${
              isDarkMode 
                ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
                : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            }`}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title="Ctrl+D to toggle"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {/* Accessibility skip link */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
          >
            Skip to main content
          </a>
          
          <div id="main-content" className={`h-full w-full ${isDarkMode ? 'filter brightness-75 contrast-125' : ''}`}>
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
              icon={TerminalIcon}
              label="Terminal.exe"
              onClick={() => openWindow("terminal")}
            />
            <DesktopIcon
              icon={SkillIcon}
              label="Music.exe"
              onClick={() => openWindow("music")}
            />
            <DesktopIcon
              icon={CertificateIcon}
              label="Certificates.exe"
              onClick={() => openWindow("certificates")}
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
          {openApps.includes("certificates") && !minimizedApps.includes("certificates") && (
            <Window 
              title="Certificates.exe"
              onClose={() => closeWindow("certificates")}
              onMinimize={() => minimizeApp("certificates")}
              initialPosition={{ x: 100, y: 100 }}
            >
              <Certificates />
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
            isDarkMode={isDarkMode}
          />
          </div>
        </div>
      )}
    </>
  );
}
