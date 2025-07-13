import lap from "../assets/me/lap.png"
import folder from "../assets/buttons/open-folder.png"
import strawberry from "../assets/me/starwberry.png"
import bunny from "../assets/me/catt.png"
import { useState } from "react";
import { art } from "../assets/constants/ArtConstants";
import ModelViewer from "../components/ModelViewer";


export default function Skills() {
    const [activeTab, setActiveTab] = useState(0);
    const current = art[activeTab];
    return(
<>

        <ModelViewer
            // url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
           url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Computer/glTF-Binary/Computer.glb"

            width={1000}
            height={600}
            />
            
        
</>
    );
}