import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { PointLight } from "three";

export const Ghosts = () => {
	const ghost1Ref = useRef<PointLight>(null);
	const ghost2Ref = useRef<PointLight>(null);
	const ghost3Ref = useRef<PointLight>(null);

	useFrame(() => {
		//TODO: add position animation
		if (ghost1Ref.current) {
			//const ghost1 = ghost1Ref.current;
		}
	});

	return (
		<>
			<pointLight ref={ghost1Ref} />
			<pointLight ref={ghost2Ref} />
			<pointLight ref={ghost3Ref} />
		</>
	);
};
