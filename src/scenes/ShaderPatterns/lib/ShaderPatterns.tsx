import { useThree } from "@react-three/fiber";
import type { FC } from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import defaultVertexShader from "@/shaders/default/vertex.glsl";
import pattern from "@/shaders/patterns/learning/43/fragment.glsl";
import type { TScene } from "@/shared/types/sceneTypes.js";

export const ShaderPatterns: FC<TScene> = ({ canvasRef }) => {
	const { camera } = useThree();
	//set the camera in front of the shader plane
	camera.position.set(0, 0, 1);
	new OrbitControls(camera, canvasRef.current);

	return (
		<mesh>
			<planeGeometry args={[1, 1, 32, 32]} />
			<shaderMaterial
				vertexShader={defaultVertexShader}
				fragmentShader={pattern}
			/>
		</mesh>
	);
};
