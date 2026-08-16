import { useThree } from "@react-three/fiber";
import type { FC } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { TScene } from "@/shared/types/sceneTypes";
import { FlagMesh } from "./meshes/FlagMesh";

export const ShadersScene: FC<TScene> = ({ canvasRef }) => {
	const { camera } = useThree();
	new OrbitControls(camera, canvasRef.current);

	return <FlagMesh />;
};
