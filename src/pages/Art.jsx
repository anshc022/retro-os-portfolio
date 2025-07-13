import lap from "../assets/me/lap.png"
import folder from "../assets/buttons/open-folder.png"
import strawberry from "../assets/me/starwberry.png"
import bunny from "../assets/me/catt.png"
import { useState } from "react";
import { art } from "../assets/constants/ArtConstants";


export default function Art() {
    const [activeTab, setActiveTab] = useState(0);
    const current = art[activeTab];
    return(
<>

        <div className="max-w-[1000px] p-3 overflow-y-auto max-h-[600px] w-full text-black flex flex-col relative px-5 pt-3 sm:gap-4">
           
            
            <div className="flex flex-col font-bold gap-2 relative">
                After hours, you'll often find me painting!
               <div className="w-64 h-64 ml-2 mb-2 sm:mb-0 sm:ml-0 sm:w-[400px] sm:h-[400px] overflow-hidden border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-white shadow-md">
                 <a href={current.link} target="_blank" className="h-full w-full"><img src={current.img} className="w-full h-full object-cover scale-150 hover:scale-110 transition-all duration-0.05"></img></a></div> 
                    {/* sticker */}
                <img src={strawberry} className="absolute top-5 right-0 sm:-right-8 h-14 sm:h-24"></img>
                <img src={bunny} className="absolute z-30 -bottom-1 sm:-bottom-14 -left-10 sm:-left-14 w-32 sm:w-44"></img>
            </div>
                
            <div className="p-1 sm:relative flex w-full  h-full flex-row justify-between items-center border-t-2 border-l-2  border-gray-500 border-b-2 border-r-2  border-b-gray-200 border-r-gray-200 bg-gray-100">
                {/* <img src={lap} className=" hidden sm:block absolute bottom-44 -right-5"></img> */}
                {/* <span className="text-xl flex flex-row w-full "> <img className="h-6" src={folder}></img>Projects</span> */}
                 {art.map((art, i) => (
               <>
                
                <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={` relative text-lg px-1 h-14 w-14  sm:h-20 sm:w-20 font-bold transition-transform duration-300 `}
                
                >
            
                <img src={art.img} className="absolute top-0 h-full w-full object-cover hover:border-l-4 hover:border-t-4 hover:border-b-4 hover:border-r-4 border-t-2 border-l-2 border-gray-500 border-b-2 border-r-2 border-b-gray-200 border-r-gray-200 bg-gray-100"></img>
                <div className={` absolute hover:bg-blue-500/50 h-14 w-14  sm:h-20 sm:w-20 top-0
                    ${
                    activeTab === i ? "bg-blue-500/50" : "bg-transparent"
                }`} ></div>
                </button>
                </>
            ))}
            </div>
    </div>
</>
    );
}