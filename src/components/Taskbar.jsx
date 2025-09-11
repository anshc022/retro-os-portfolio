// src/components/Taskbar.jsx
import { useEffect, useState } from "react";
import morning from "../assets/buttons/morning.png";
import night from "../assets/buttons/night.png";
import clock from "../assets/buttons/clock.png";
import AboutIcon from "../assets/desktopIcons/about.png";
import ExperienceIcon from "../assets/desktopIcons/experience.png";
import StudyIcon from "../assets/desktopIcons/study.png";
import ProjectsIcon from "../assets/desktopIcons/projects.png";
import LinkedIn from "../assets/desktopIcons/linkedin-pixel.png";
import Github from "../assets/desktopIcons/github-pixel.png";
import MailIcon from "../assets/desktopIcons/mail.png";
import CertificateIcon from "../assets/desktopIcons/skills.png";

export default function Taskbar({ onAppClick, onThemeChange, currentTheme, isDarkMode }) {
  const [showMenu, setShowMenu] = useState(false);
  const [time, setTime] = useState(() => new Date());
  const [batterySupported, setBatterySupported] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(null); // 0-100
  const [batteryCharging, setBatteryCharging] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let batteryRef;
    const setupBattery = async () => {
      if (navigator.getBattery) {
        try {
          const battery = await navigator.getBattery();
          batteryRef = battery;
          setBatterySupported(true);
          const update = () => {
            setBatteryLevel(Math.round((battery.level || 0) * 100));
            setBatteryCharging(!!battery.charging);
          };
          update();
          battery.addEventListener("levelchange", update);
          battery.addEventListener("chargingchange", update);
        } catch (_) {
          setBatterySupported(false);
        }
      }
    };
    setupBattery();
    return () => {
      if (batteryRef) {
        batteryRef.removeEventListener("levelchange", () => {});
        batteryRef.removeEventListener("chargingchange", () => {});
      }
    };
  }, []);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <>
      {/* Start Menu (retro list) */}
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
              onAppClick("certificates");
              setShowMenu(false);
            }}
            className="px-3 py-2 hover:bg-blue-600 border-b-2 border-gray-300 hover:text-white cursor-pointer"
          >
            <img src={CertificateIcon} alt="Certificates" className="inline-block w-4 h-4 mr-2" /> Certificates.exe
          </div>
          <div
            onClick={() => {
              onAppClick("connect");
              setShowMenu(false);
            }}
            className="px-3 py-2 hover:bg-blue-600 border-b-2 border-gray-300 hover:text-white cursor-pointer"
          >
            <img src={MailIcon} alt="Mail" className="inline-block w-4 h-4 mr-2" /> Contact.exe
          </div>
        </div>
      )}

      {/* Retro Taskbar */}
            {/* Retro Taskbar */}
      <div className={`fixed bottom-0 left-0 right-0 h-12 flex items-center justify-between px-2 border-t-2 border-gray-300 shadow-lg z-40 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-600 text-gray-200' 
          : 'bg-gray-400 text-black'
      }`}>
        <button
          onClick={toggleMenu}
          className="mr-4 px-4 sm:w-32 border-t border-l border-white border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-gray-200 shadow-inner active:shadow-none hover:bg-gray-400"
        >
          Start
        </button>

        <div className="ml-auto flex leading-sm flex-row px-4 text-sm gap-2 sm:text-2xl items-center">
          <a href="mailto:23052947@kiit.ac.in" target="_blank" rel="noreferrer">
            <img src={MailIcon} className="hover:scale-110 w-4 h-4 sm:w-8 sm:h-8 cursor-pointer" />
          </a>
          <a href="https://github.com/ankitarahi1477/" target="_blank" rel="noreferrer">
            <img src={Github} className="hover:scale-110 w-4 h-4 sm:w-8 sm:h-8 cursor-pointer" />
          </a>
          <a href="https://www.linkedin.com/in/ankitarahi1477/" target="_blank" rel="noreferrer">
            <img src={LinkedIn} className="hover:scale-110 w-4 h-4 sm:w-8 sm:h-8 cursor-pointer" />
          </a>

          {currentTheme === "morning" ? (
            <img
              src={morning}
              className="hover:scale-110 w-4 h-4 sm:w-8 sm:h-8 cursor-pointer"
              onClick={() => onThemeChange("night")}
            />
          ) : (
            <img
              src={night}
              className="hover:scale-110 w-4 h-4 sm:w-8 sm:h-8 cursor-pointer"
              onClick={() => onThemeChange("morning")}
            />
          )}

          <img src={clock} className="sm:w-10 sm:h-9 w-4 h-4" />
          <div className="tabular-nums">{time.toLocaleTimeString()}</div>

          {/* Battery indicator */}
          <div className="ml-3 text-xs sm:text-sm flex items-center gap-1">
            {batterySupported && batteryLevel !== null ? (
              <span title={batteryCharging ? "Charging" : "On Battery"}>
                {batteryCharging ? "⚡" : "🔋"} {batteryLevel}%
              </span>
            ) : (
              <span className="opacity-70" title="Battery info not available">🔋 --%</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
