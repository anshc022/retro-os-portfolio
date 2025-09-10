// src/components/SkillsComputer.jsx
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, Environment, PresentationControls } from "@react-three/drei";
import { useState } from "react";

import { X } from "lucide-react"; // optional close icon

function ComputerModel({ onPartClick }) {
  const  gltf = useGLTF("/models/retro-computer.glb");


  return (
    <group
      position={[-1, -1.2, -0.5]} // ← tweak these values
      rotation={[0, Math.PI / 5, 0]} // optional: fine-tune rotation
      onClick={onPartClick}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState("");

  const handlePartClick = ({partName}) => {
    console.log("Clicked:", partName);

    if (partName.toLowerCase().includes("monitor")) setActiveSkill("frontend");
    else if (partName.toLowerCase().includes("cpu")) setActiveSkill("backend");
    else if (partName.toLowerCase().includes("keyboard"))
      setActiveSkill("tools");
    else if (partName.toLowerCase().includes("aiml"))
      setActiveSkill("aiml");
    else setActiveSkill("unknown");
  };

  const skillsMap = {
    frontend: ["React.js", "Next.js", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    backend: ["Node.js", "Express.js", "Python", "FastAPI", "C", "C++"],
    tools: ["Git", "Docker", "MongoDB", "MySQL", "TensorFlow", "OpenCV"],
    aiml: ["TensorFlow", "OpenCV", "NLP", "BERT", "LLMs", "Ollama"],
    unknown: ["🤖 Just clicked something random!"],
  };

  return (
    <>
    
    <div className="sm:w-[800px] w-full h-[400px] w-[300px] sm:h-[600px] flex justify-center items-center relative">
    
      <Canvas className=" " shadows camera={{ position: [5, 1,0], fov: 35 }}> 
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Environment preset="city" />

        {/* Replace OrbitControls with this */}
        <PresentationControls
          global
          config={{ mass: 1, tension: 10 }}
          snap={true}
          rotation={[0, 0.3, 0]}
          polar={[-0.2, 0.2]} // vertical movement range
          azimuth={[-0.4, 0.4]} // horizontal movement range
        >
          <ComputerModel onPartClick={handlePartClick} />
        </PresentationControls>
      </Canvas>
<button onClick={() => handlePartClick({partName: "monitor"})} className="hover:scale-110 absolute top-24 left-5 sm:left-44 px-4 bg-blue-500 border-t border-l border-white border-b-2 border-r-2 border-b-gray-700 border-r-gray-700 shadow-md "> 
  Frontend</button>
<button onClick={() => handlePartClick({partName: "cpu"})} className="hover:scale-110 absolute bottom-24 sm:bottom-52 right-5 sm:right-64 px-4 bg-blue-500 border-t border-l border-white border-b-2 border-r-2 border-b-gray-700 border-r-gray-700 shadow-md "> 
  Backend</button>
<button onClick={() => handlePartClick({partName: "keyboard"})} className="hover:scale-110 absolute sm:bottom-44 bottom-10 left-10 sm:left-52 px-4 bg-blue-500 border-t border-l border-white border-b-2 border-r-2 border-b-gray-700 border-r-gray-700 shadow-md "> 
  Tools</button>
<button onClick={() => handlePartClick({partName: "aiml"})} className="hover:scale-110 absolute top-10 right-5 sm:right-44 px-4 bg-green-500 border-t border-l border-white border-b-2 border-r-2 border-b-gray-700 border-r-gray-700 shadow-md "> 
  AI/ML</button>

      {activeSkill && (
        <div className="absolute top-4 p-1 left-4 border-t-2 border-l-2 border-white border-b-4 border-r-4 border-b-gray-500 border-r-gray-500 bg-gray-200 shadow-md text-sm sm:text-lg w-[280px] sm:w-[400px] z-50 ">
          
          <div className= "uppercase bg-gradient-to-r from-blue-800 to-blue-400 text-white text-lg px-2 py-1 flex justify-between items-center">
          <span>{activeSkill} Skills </span>
          <button onClick={() => setActiveSkill("")} className="hover:bg-red-600 p-1">
            <X size={12} />
          </button>
        </div>
          <ul className="list-disc p-4">
            {skillsMap[activeSkill].map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}
