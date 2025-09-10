import me from "../assets/me/ankita.jpeg"
import happy from "../assets/smiley/love-eyes.png"
import cherry from "../assets/me/cherry.png"
import bunny from "../assets/me/_.gif"

export default function About() {
    return(
<>
        <div className="sm:h-[350px] sm:w-[600px] flex flex-col sm:flex-row relative p-4 pl-10 sm:pl-4 sm:pt-8  sm:gap-4">
            <div className="h-80 w-[250px] relative">
            <div className=" overflow-hidden absolute h-72 top-0 border-t-2 border-l-2 border-gray-300 border-b-4 border-r-4 border-b-gray-500 border-r-gray-500 bg-gray-300 shadow-md">
            <img src={me} className="h-full w-full hover:scale-150 transition-all duration-0.05" ></img></div>
            <img src={happy}  className="absolute h-12  top-5 -left-1 -rotate-45"></img>
            <img src={cherry}  className="absolute h-14  bottom-5 -left-2 "></img>
            <img src={bunny}  className="absolute h-24  bottom-5 -right-2 "></img>
            </div>
            <div className="h-full w-[250px] sm:w-[300px] text-sm sm:text-lg">
                I'm Ankita Rahi, a 3rd-year B.Tech Computer Science student at KIIT University, Bhubaneswar. With expertise in AI/ML and full-stack development, I've earned recognition at prestigious hackathons including MIT AI Hackathon (Top 10/800+ teams) and Smart India Hackathon. As co-founder of GrafikGalore and an AI intern at ApanaGhr, I blend technical innovation with entrepreneurial spirit. I specialize in React.js, Python, AI/ML technologies, and creating impactful digital solutions that solve real-world problems.
            </div>
        </div>
</>
    );
}