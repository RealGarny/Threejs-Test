import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import type { SceneComponent } from "@/shared/types/sceneTypes";
import { Smoke } from "./Smoke";

const COFFEE_MUG_ENVIRONMENT_PATH = "/public/models/CoffeeMugEnvironment/bakedModel.glb";

export const SceneCoffeeMug: SceneComponent = ({ canvasRef }) => {
	useThree(({ gl }) => {
		gl.setClearColor("#000");
	});
	const camera = useThree((c) => c.camera);
	const coffeeMugEnvironment = useLoader(GLTFLoader, COFFEE_MUG_ENVIRONMENT_PATH);
	useEffect(() => {
		new OrbitControls(camera, canvasRef.current);
	}, [camera, canvasRef.current]);

	useEffect(() => {
		const baked = coffeeMugEnvironment.scene.getObjectByName("baked");
		if (baked instanceof Mesh && baked.material.map) {
			baked.material.map.anisotropy = 8;
			baked.material.map.needsUpdate = true;
		}
	}, [coffeeMugEnvironment]);

	return (
		<>
			<Smoke position={[0, 1.7, 0]} />
			<primitive object={coffeeMugEnvironment.scene} />
		</>
	);
};
