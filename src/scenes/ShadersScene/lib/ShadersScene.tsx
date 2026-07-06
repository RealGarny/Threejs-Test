import { useThree } from "@react-three/fiber";
import { FlagMesh } from "./meshes/FlagMesh";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TScene } from "shared/types/sceneTypes";
import { FC } from "react";

export const ShadersScene: FC<TScene> = ({ canvasRef }) => {
  const { camera } = useThree();
  new OrbitControls(camera, canvasRef.current);
  return (
    <>
      <FlagMesh />
    </>
  );
};
