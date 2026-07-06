import { Canvas } from "@react-three/fiber";
import "./styles/index.scss";
import { useRef } from "react";
import { GalaxyScene } from "scenes/GalaxyScene";
import { ShadersScene } from "scenes/ShadersScene/lib/ShadersScene";
import { ShaderPatterns } from "scenes/ShaderPatterns/lib/ShaderPatterns";
import { GalaxySceneRepeat } from "scenes/GalaxyScene/lib/GalaxySceneRepeat";
//import { RealisticRenderScene } from "scenes/RealisticRender/lib/RealisticRenderScene";
//import { MaterialScene } from "scenes/MaterialScene";
//import { HauntedHouseScene } from "scenes/HauntedHouseScene";

export const App: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas gl={{antialias:true}} dpr={[1,2]} ref={canvas} camera={{ position: [2, 2, 5] }} shadows>
      <ShaderPatterns canvasRef={canvas} />
    </Canvas>
  );
};
