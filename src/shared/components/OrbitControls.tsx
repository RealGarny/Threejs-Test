import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls as OrbitControlsClass } from "three/examples/jsm/Addons.js";

export const OrbitControls = () => {
	const camera = useThree((state) => state.camera);
	const gl = useThree((state) => state.gl);

	useEffect(() => {
		const controls = new OrbitControlsClass(camera, gl.domElement);

		return () => {
			controls.dispose();
		};
	}, [camera, gl]);

	return null;
};
