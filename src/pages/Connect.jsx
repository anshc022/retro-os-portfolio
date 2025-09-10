import duck from "../assets/gif/duck.gif";
import LinkedIn from "../assets/desktopIcons/linkedin-pixel.png";
import Github from "../assets/desktopIcons/github-pixel.png";
import MailIcon from "../assets/desktopIcons/mail.png";

export default function Connect() {
    
    return(
<>
        <div className="max-w-[1000px] p-3 overflow-y-auto max-h-[600px] w-full text-black flex flex-col relative px-5 pt-3 sm:gap-4">
            <div className="flex flex-col justify-center items-center sm:flex-row font-bold gap-2 relative">
                 <img src={duck} className="h-24 w-24  sm:h-44 sm:w-44 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-white shadow-md"></img>
                 
                 <div className="flex flex-col p-4 text-xs sm:text-lg border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-white shadow-md">
                 Yo! You've reached the Ankita Hotline. ☎️  <br></br>
                 Got a project idea, some pixel art love, or just wanna nerd out about code? <br></br>
                 Drop a line - I'm all ears.<br></br>
                 <div className="flex flex-row gap-2 mt-2 items-end">
                    <a href="mailto:23052947@kiit.ac.in" target="_blank"><img src={MailIcon} className= "hover:scale-110 w-8 h-8 cursor-pointer" ></img></a>
                    <a href="https://github.com/ankitarahi1477/" target="_blank"><img src={Github} className= "hover:scale-110 w-8 h-8  cursor-pointer" ></img></a>
                    <a href="https://www.linkedin.com/in/ankitarahi1477/" target="_blank"><img src={LinkedIn} className= "hover:scale-110 w-8 h-8 cursor-pointer" ></img></a>
                </div>
                 </div> 
                 
            </div>                     
             
        </div>
</>
    )
}
