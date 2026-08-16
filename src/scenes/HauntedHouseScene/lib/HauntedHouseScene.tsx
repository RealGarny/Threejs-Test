import {
	type MeshStandardMaterialProps,
	useThree,
	type Vector3,
} from "@react-three/fiber";
import { type FC, useEffect, useRef } from "react";
import { Euler, type Mesh, RepeatWrapping } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useGrassMaterial } from "@/shared/textureLoaders/useGrassMaterial";
import type { TScene } from "@/shared/types/sceneTypes";
import { Grave } from "../meshes/Grave";
import { House } from "../meshes/House";

export const HauntedHouseScene: FC<TScene> = ({ canvasRef }) => {
	const { camera, gl } = useThree();
	gl.setClearColor("#262837");
	gl.shadowMap.enabled = true;

	const planeRef = useRef<Mesh>(null);
	new OrbitControls(camera, canvasRef.current);
	const grassTextures = useGrassMaterial();

	useEffect(() => {
		if (!planeRef.current) return;
		planeRef.current.rotation.x = -Math.PI * 0.5;
	}, []);

	grassTextures.forEach((texture) => {
		texture.repeat.set(8, 8);
		texture.wrapS = RepeatWrapping;
		texture.wrapT = RepeatWrapping;
	});

	const planeMaterial: MeshStandardMaterialProps = {
		map: grassTextures[0],
		normalMap: grassTextures[1],
		roughnessMap: grassTextures[2],
		aoMap: grassTextures[3],
		aoMapIntensity: 1,
	};

	const generateGraves = () => {
		const graves: React.ReactNode[] = [];
		for (let i = 0; i < 50; i++) {
			const angle = Math.random() * Math.PI * 2;
			const radius = 4 + Math.random() * 6;
			const position: Vector3 = [
				Math.sin(angle) * radius,
				0.3,
				Math.cos(angle) * radius,
			];
			const rotation = new Euler(
				0,
				(Math.random() - 0.5) * 0.4,
				(Math.random() - 0.5) * 0.4,
			);

			graves.push(<Grave position={position} rotation={rotation} castShadow />);
		}
		return graves;
	};

	return (
		<>
			<mesh ref={planeRef} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial {...planeMaterial} />
			</mesh>
			<House position={[0, 1.2, 0]} receiveShadow castShadow />
			{generateGraves()}
			<ambientLight color={"#b9d5ff"} intensity={0.12} />
			<directionalLight
				castShadow
				color={"#b9d5ff"}
				intensity={0.12}
				position={[4, 5, -2]}
			/>
			<fog attach={"fog"} color={"#262837"} near={1} far={15} />
		</>
	);
};
