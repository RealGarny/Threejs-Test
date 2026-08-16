import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { CubeTextureLoader } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { SceneComponent } from "@/shared/types/sceneTypes.js";

export const RealisticRenderScene: SceneComponent = ({ canvasRef }) => {
	const { camera, scene } = useThree();

	const planeHelmet = useLoader(
		GLTFLoader,
		"/public/models/FlightHelmet/glTF/FlightHelmet.gltf",
	);

	planeHelmet.scene.scale.set(10, 10, 10);
	planeHelmet.scene.position.set(0, -4, 0);
	planeHelmet.scene.rotation.y = Math.PI * 0.5;

	useEffect(() => {
		const environmentLoader = new CubeTextureLoader();
		const environmentMap = environmentLoader.load([
			"/public/jpg/environmentMaps/0/px.jpg",
			"/public/jpg/environmentMaps/0/nx.jpg",
			"/public/jpg/environmentMaps/0/py.jpg",
			"/public/jpg/environmentMaps/0/ny.jpg",
			"/public/jpg/environmentMaps/0/pz.jpg",
			"/public/jpg/environmentMaps/0/nz.jpg",
		]);
		scene.background = environmentMap;
		scene.environment = environmentMap;
	}, [scene]);

	new OrbitControls(camera, canvasRef.current);
	return (
		<>
			<primitive object={planeHelmet.scene} />
			<directionalLight
				position={[0.25, 3, -2.25]}
				intensity={3}
				color={"#fff"}
			/>
		</>
	);
};
