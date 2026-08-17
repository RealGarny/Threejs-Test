import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { OrbitControls as OrbitControlsClass } from "three/examples/jsm/Addons.js";

export const OrbitControls = () => {
	const { domElement, camera } = useThree(({ gl, camera }) => ({
		domElement: gl.domElement,
		camera,
	}));
	const _ = useMemo(() => new OrbitControlsClass(camera, domElement), [camera, domElement]);

	return null;
};
