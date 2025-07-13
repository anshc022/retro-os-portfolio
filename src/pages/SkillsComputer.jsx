// src/components/SkillsComputer.jsx
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF, Environment, PresentationControls } from "@react-three/drei";
import { useState } from "react";
import ModelViewer from "../components/ModelViewer";

export default function SkillsComputer() {
  const [activeSkill, setActiveSkill] = useState("");

  return (
    <div className="sm:w-[800px] bg-yellow-300 w-full h-[400px] sm:h-[600px] flex justify-center items-center relative">
     <ModelViewer
        url="/retro-os-portfolio/models/retro-computer.glb"
        width={"100%"}
        height={"100%"}
        />
  </div>

  );
}
