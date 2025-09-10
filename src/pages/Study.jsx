import me from "../assets/me/ankita.jpeg"
import happy from "../assets/smiley/love-eyes.png"
import StudyRoom from "../assets/me/study-room.gif"
import paintWindow from "../assets/me/paint-window.jpeg"

export default function Study() {
    
    return(
<>

        <div className="sm:h-[600px] sm:w-[800px] text-sm sm:text-lg font-bold w-full h-[500px] flex flex-col sm:flex-row relative">
            <div className="sm:h-[600px] sm:w-[800px] h-full w-full relative">
            
                <img src={paintWindow} className="h-full w-full hidden sm:block absolute top-0" ></img>

                <img src={StudyRoom} className="sm:h-[415px] sm:w-[640px] h-full w-full absolute sm:top-10 sm:right-10"></img>
                <div className="absolute  sm:top-14 top-5 m-2 sm:m-0  sm:left-32 sm:bg-white/80 flex  border-t-2 border-l-2 border-gray-500 border-b-2 border-r-2 border-b-gray-200 border-r-gray-200 bg-white  p-2"> 
                   <ul>
                    <li>Education</li>
                    <li className=" hidden sm:block">-----------------------------------------------------</li>
                    <li className="text-lg sm:text-2xl">B.Tech Computer Science Engineering</li> 
                     <li>KIIT University, Bhubaneswar. (<span className="italic mr-2">2022 - 2026 </span>)</li>
                     <li className="hidden sm:block" >-----------------------------------------------------</li>
                    <li className="text-lg sm:text-2xl">Specialization: AI/ML & Full-Stack Development</li> 
                    <li>Currently 3rd Year Student (<span className="italic sm:mr-2">Expected Graduation: 2026</span>)</li>
                    <li className="hidden sm:block">-----------------------------------------------------</li>
                    </ul>
                </div>
                <a
                    href="/resume/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-14 right-10 hover:bg-blue-400 text-sm sm:text-2xl flex justify-center items-center w-32 border-t-2 border-l-2 border-gray-200 border-b-2 border-r-2 border-b-gray-500 border-r-gray-500 bg-blue-600 text-white cursor-pointer shadow-md"
                    >
                    Resume
                    </a>
           
            </div>
            
        </div>
</>
    );
}