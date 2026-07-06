import { GroupProps, MeshStandardMaterialProps } from "@react-three/fiber";
import { useDoorMaterial } from "shared/textureLoaders/useDoorMaterial";
import { Euler } from "three";
import { Bush } from "./Bush";
import { useBricksMaterial } from "shared/textureLoaders/useBricksMaterial";

export const House = (props: GroupProps) => {
  const doorTextures = useDoorMaterial();
  const bricksTextures = useBricksMaterial();
  const doorMaterialProps: MeshStandardMaterialProps = {
    map: doorTextures[0],
    displacementMap: doorTextures[1],
    displacementScale: 0.1,
    normalMap: doorTextures[2],
    roughnessMap: doorTextures[3],
    aoMap: doorTextures[4],
    aoMapIntensity: 1,
    transparent: true,
    alphaMap: doorTextures[5],
  };
  const baseMaterialProps: MeshStandardMaterialProps = {
    map: bricksTextures[0],
    normalMap: bricksTextures[1],
    roughnessMap: bricksTextures[2],
    aoMap: bricksTextures[3],
    aoMapIntensity: 1,
  };

  return (
    <group {...props}>
      {/*BASE*/}
      <mesh>
        <boxGeometry args={[4, 2.5, 4]} />
        <meshStandardMaterial {...baseMaterialProps} />
      </mesh>
      {/*ROOF*/}
      <mesh
        position={[0, 2.5 / 2 + 0.5, 0]}
        rotation={new Euler(0, Math.PI * 0.25, 0)}
      >
        <coneGeometry args={[3.5, 1, 4]} />
        <meshStandardMaterial color={"#b35f45"} />
      </mesh>
      {/*DOOR*/}
      <mesh position={[0, -0.35, 2.0001]}>
        <planeGeometry args={[2, 2, 20, 20]} />
        <meshStandardMaterial {...doorMaterialProps} />
      </mesh>
      {/*BUSHES*/}
      <Bush
        position={[-1.2, -0.95, 2.4]}
        rotation={new Euler(0, Math.PI * 0.08, 0)}
      />
      <Bush
        position={[1.4, -0.95, 2.4]}
        rotation={new Euler(0, -Math.PI * 0.08, 0)}
      />
      {/*DOOR LIGHT*/}
      <pointLight
        position={[-0.3, 0.6, 2.9]}
        color={"#ff7d46"}
        intensity={2}
        distance={5}
      />
    </group>
  );
};
