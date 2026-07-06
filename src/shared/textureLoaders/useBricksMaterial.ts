import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export const useBricksMaterial = () => {
  return useLoader(TextureLoader, [
    "public/jpg/materials/bricks/color.jpg",
    "public/jpg/materials/bricks/normal.jpg",
    "public/jpg/materials/bricks/roughness.jpg",
    "public/jpg/materials/bricks/ambientOcclusion.jpg",
  ]);
};
