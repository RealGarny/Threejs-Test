import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { Color, DoubleSide, type ShaderMaterial } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import seaFragmentShader from "@/shaders/raging-sea/fragment.glsl";
import seaVertexShader from "@/shaders/raging-sea/vertex.glsl";
import type { SceneComponent } from "@/shared/types/sceneTypes";

export const RagingSea: SceneComponent = ({ canvasRef }) => {
	const { camera } = useThree();
	const shaderRef = useRef<ShaderMaterial>(null);

	useFrame(({ clock }) => {
		if (!shaderRef.current) return;
		shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
	});
	useLayoutEffect(() => {
		camera.position.set(0.6, 0.4, 1.5);
		new OrbitControls(camera, canvasRef.current);
	}, [camera, canvasRef.current]);

	return (
		<mesh rotation={[-(Math.PI * 0.5), 0, 0]}>
			<shaderMaterial
				uniforms={{
					uTime: { value: 0 },
					uDepthColor: { value: new Color("#186691") },
					uSurfaceColor: { value: new Color("#9BD8FF") },
					uColorOffset: { value: 0.15 },
					uColorMultiplier: { value: 5 },
				}}
				ref={shaderRef}
				side={DoubleSide}
				fragmentShader={seaFragmentShader}
				vertexShader={seaVertexShader}
			/>
			<planeGeometry args={[2, 2, 512, 512]} />
		</mesh>
	);
};
