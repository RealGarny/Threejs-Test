import type { SceneComponent } from "@/shared/types/sceneTypes";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, DoubleSide, type IUniform, Mesh, ShaderMaterial, Uniform } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import hologramVertexShader from "@/shaders/hologramShader/vertex.glsl";
import hologramFragmentShader from "@/shaders/hologramShader/fragment.glsl";
import { OrbitControls } from "@/shared/components/OrbitControls";

const SUZANNE_PATH = "/public/models/suzanne.glb";

export const SceneHologramShader: SceneComponent = () => {
	useThree((state) => state.gl.setClearColor("rgba(22, 26, 26, 1)"));

	const rotatingRefs = useRef<(Mesh | null)[]>([]);
	const hologramUniforms = useRef<Record<string, IUniform>>({
		uTime: new Uniform(0),
	});

	const suzanneGLTF = useLoader(GLTFLoader, SUZANNE_PATH);

	const hologramMaterial = useMemo(
		() =>
			new ShaderMaterial({
				vertexShader: hologramVertexShader,
				fragmentShader: hologramFragmentShader,
				uniforms: hologramUniforms.current,
				transparent: true,
				side: DoubleSide,
				depthWrite: false,
				blending: AdditiveBlending,
			}),
		[],
	);

	useEffect(() => {
		const suzanne = suzanneGLTF.scene;
		suzanne.traverse((child) => {
			if (!(child instanceof Mesh)) return;
			child.material = hologramMaterial;
		});
	}, [suzanneGLTF, hologramMaterial]);

	useFrame(({ clock }) => {
		const elapsedTime = clock.elapsedTime;

		hologramUniforms.current.uTime.value = elapsedTime;

		rotatingRefs.current.forEach((mesh) => {
			if (!mesh) return;
			mesh.rotation.x = -elapsedTime * 0.1;
			mesh.rotation.y = elapsedTime * 0.2;
		});
	});

	return (
		<>
			<OrbitControls />
			<mesh
				material={hologramMaterial}
				position={[-3, 0, 0]}
				ref={(r) => (rotatingRefs.current[0] = r)}
			>
				<sphereGeometry />
			</mesh>
			<primitive
				object={suzanneGLTF.scene}
				position={[0, 0, 0]}
				ref={(r: Mesh) => (rotatingRefs.current[1] = r)}
			/>
			<mesh
				material={hologramMaterial}
				position={[3, 0, 0]}
				ref={(r) => (rotatingRefs.current[2] = r)}
			>
				<torusKnotGeometry />
			</mesh>
		</>
	);
};
