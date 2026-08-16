import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const useGrassMaterial = () => {
	return useLoader(TextureLoader, [
		"public/jpg/materials/grass/color.jpg",
		"public/jpg/materials/grass/normal.jpg",
		"public/jpg/materials/grass/roughness.jpg",
		"public/jpg/materials/grass/ambientOcclusion.jpg",
	]);
};
