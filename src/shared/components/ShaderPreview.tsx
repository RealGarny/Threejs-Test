import { type MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { type FC, useEffect, useRef } from "react";
import { Mesh, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "./OrbitControls";

const SUZANNE_PATH = "/public/models/suzanne.glb";

export const ShaderPreview: FC<{ meshProps?: MeshProps }> = ({ meshProps }) => {
	const rotatingRefs = useRef<(Mesh | null)[]>([]);
	const suzanneGLTF = useLoader(GLTFLoader, SUZANNE_PATH);

	useEffect(() => {
		const suzanne = suzanneGLTF.scene;
		suzanne.traverse((child) => {
			if (!(child instanceof Mesh)) return;
			if (!meshProps?.material) {
				child.material = new MeshBasicMaterial();
				return;
			}
			child.material = meshProps.material;
		});
	}, [suzanneGLTF, meshProps]);

	useFrame(({ clock }) => {
		const elapsedTime = clock.elapsedTime;
		rotatingRefs.current.forEach((mesh) => {
			if (!mesh) return;
			mesh.rotation.x = -elapsedTime * 0.1;
			mesh.rotation.y = elapsedTime * 0.2;
		});
	});

	return (
		<>
			<OrbitControls />
			<mesh {...meshProps} position={[-3, 0, 0]} ref={(r) => (rotatingRefs.current[0] = r)}>
				<sphereGeometry />
			</mesh>
			<primitive
				object={suzanneGLTF.scene}
				position={[0, 0, 0]}
				ref={(r: Mesh) => (rotatingRefs.current[1] = r)}
			/>
			<mesh {...meshProps} position={[3, 0, 0]} ref={(r) => (rotatingRefs.current[2] = r)}>
				<torusKnotGeometry />
			</mesh>
		</>
	);
};
