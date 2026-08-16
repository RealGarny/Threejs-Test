import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const useDoorMaterial = () => {
	return useLoader(TextureLoader, [
		"public/jpg/materials/door/color.jpg",
		"public/jpg/materials/door/height.jpg",
		"public/jpg/materials/door/normal.jpg",
		"public/jpg/materials/door/roughness.jpg",
		"public/jpg/materials/door/ambientOcclusion.jpg",
		"public/jpg/materials/door/alpha.jpg",
	]);
};
