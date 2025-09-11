import lap from "../assets/me/lap.png"
import folder from "../assets/buttons/open-folder.png"
import strawberry from "../assets/me/starwberry.png"
import bunny from "../assets/me/bunny.gif"
import { useState, useEffect } from "react";
import { projects } from "../assets/constants/ProjectsConstants";
import { Typewriter } from "../components/TypeWriter";
import Ticker from "framer-motion-ticker";

export default function Projects() {
    const [activeTab, setActiveTab] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const current = projects[activeTab];

    // Auto slideshow for projects with multiple images
    useEffect(() => {
        if (current.slideImages && current.slideImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlideIndex((prev) => 
                    (prev + 1) % current.slideImages.length
                );
            }, 3000); // Change image every 3 seconds
            
            return () => clearInterval(interval);
        }
    }, [current, activeTab]);

    // Reset slide index when switching projects
    useEffect(() => {
        setCurrentSlideIndex(0);
    }, [activeTab]);

    // Get current image to display
    const getCurrentImage = () => {
        if (current.slideImages && current.slideImages.length > 1) {
            return current.slideImages[currentSlideIndex];
        }
        return current.img;
    };
    return(
<>

        <div className="max-w-[1000px] p-3 overflow-y-auto max-h-[600px] w-full text-black flex flex-col sm:flex-row relative px-5 pt-3 sm:gap-4">
           
            
            <div className="flex flex-col font-bold gap-2 relative">
                Projects/{current.title}
               <div className="w-64 sm:w-[650px] sm:h-[320px] overflow-hidden border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-white shadow-md relative">
                 <a href={current.link} target="_blank" className="h-full w-full">
                   <img 
                     src={getCurrentImage()} 
                     className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                     alt={current.title}
                   />
                 </a>
                 {/* Slideshow indicators for projects with multiple images */}
                 {current.slideImages && current.slideImages.length > 1 && (
                   <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                     {current.slideImages.map((_, index) => (
                       <div
                         key={index}
                         className={`w-2 h-2 rounded-full transition-all duration-300 ${
                           index === currentSlideIndex ? 'bg-white' : 'bg-white/50'
                         }`}
                       />
                     ))}
                   </div>
                 )}
               </div> 
               <div className="w-64 sm:w-[650px] text-xl text-blue-600 overflow-hidden flex flex-row">
                Tech Stack :
                <div className="w-64 sm:w-[550px] text-lg text-black overflow-hidden">
                <Ticker duration={10}>
                    {current.techStack.map((tech, i) => (
                    <p className="mx-2 ">
                        <span>{tech}</span>   
                    </p>
                    ))}
                </Ticker>
                </div>
                </div>
                <div className="w-64 sm:w-[650px] text-sm sm:text-lg flex flex-row leading-xs border-t-2 border-l-2 border-gray-500 border-b-2 border-r-2 border-b-gray-200 border-r-gray-200 bg-white p-4">
                   
                    <Typewriter text={current.description} ></Typewriter>
                </div>
                {current.achievement && (
                  <div className="w-64 sm:w-[650px] bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-md font-bold text-sm sm:text-base flex items-center justify-center shadow-lg">
                    {current.achievement}
                  </div>
                )}  
                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <button className="hover:bg-blue-400 text-sm sm:text-xl flex justify-center items-center w-32 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-blue-600 text-white cursor-pointer shadow-md">
                    <a href={current.link} target="_blank" className="h-full w-full py-2">
                      {current.linkLabels?.primary || 'Run'}
                    </a>  
                  </button>
                  {current.secondaryLink && (
                    <button className="hover:bg-green-400 text-sm sm:text-xl flex justify-center items-center w-32 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-green-600 text-white cursor-pointer shadow-md">
                      <a href={current.secondaryLink} target="_blank" className="h-full w-full py-2">
                        {current.linkLabels?.secondary || 'Docs'}
                      </a>  
                    </button>
                  )}
                </div>
                    {/* sticker */}
                <img src={strawberry} className="absolute top-5 left-0 sm:-left-8 h-14 sm:h-24"></img>
                <img src={bunny} className="absolute z-30 -bottom-0 right-0 sm:-right-10 w-14 sm:w-24"></img>
            </div>
                
            <div className="mt-9 sm:relative flex w-full sm:w-1/3 h-full sm:h-[480px] flex-row sm:flex-col text-left items-start border-t-2 border-l-2 border-gray-500 border-b-2 border-r-2 border-b-gray-200 border-r-gray-200 bg-gray-100 p-2">
                <img src={lap} className="w-32 hidden sm:block absolute bottom-44 -right-5"></img>
                <span className="text-xl flex flex-row w-full "> <img className="h-6" src={folder}></img>Projects</span>
                 {projects.map((project, i) => (
               <>
                <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`hidden sm:block text-sm px-2  hover:bg-blue-600 hover:text-white font-bold transition-transform duration-300 ${
                    activeTab === i ? "bg-blue-600 text-white" : " text-black"
                }`}
                
                >
               |--{ project.title}
                </button>
                <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`sm:hidden block text-lg px-1  hover:bg-blue-600 hover:text-white font-bold transition-transform duration-300 ${
                    activeTab === i ? "bg-blue-600 text-white" : " text-black"
                }`}
                
                >
               0{i+1}
                </button>
                </>
            ))}
            </div>
    </div>
</>
    );
}