import {
  MeshMatcapMaterialProps,
  MeshNormalMaterialProps,
  MeshStandardMaterialProps,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { useDoorMaterial } from "shared/textureLoaders/useDoorMaterial";
import { TScene } from "shared/types/sceneTypes";
import {
  DoubleSide,
  Mesh,
  MeshMatcapMaterial,
  MeshStandardMaterial,
  TextureLoader,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const MaterialScene: FC<TScene> = ({ canvasRef }) => {
  const { camera } = useThree();
  const meshRefs = useRef<Mesh[]>([]);
  const controls = new OrbitControls(camera, canvasRef.current);
  const doorTextures = useDoorMaterial();
  const matcapTexture = useLoader(TextureLoader, "public/png/matcaps/3.png");
  const gradientTexture = useLoader(
    TextureLoader,
    "public/jpg/gradients/3.jpg"
  );

  const matcapMaterialProps: MeshMatcapMaterialProps = {
    matcap: matcapTexture,
    flatShading: true,
  };
  const normalMaterialProps: MeshNormalMaterialProps = {
    flatShading: true,
  };

  const standardMaterialProps: MeshStandardMaterialProps = {
    map: doorTextures[0],
    displacementMap: doorTextures[1],
    displacementScale: 0.02,
    normalMap: doorTextures[2],
    roughnessMap: doorTextures[3],
    aoMap: doorTextures[4],
    aoMapIntensity: 1,
    transparent: true,
    alphaMap: doorTextures[5],
    side: DoubleSide,
  };

  const materialProps: any = {};
  let material = new MeshStandardMaterial(standardMaterialProps as any);

  useFrame((state, delta) => {
    if (meshRefs.current) {
      meshRefs.current.forEach((mesh) => {
        if (mesh.rotation.x > 6.3) {
          mesh.rotation.x = mesh.rotation.x - 6.3;
        }
        if (mesh.rotation.y > 6.3) {
          mesh.rotation.y = mesh.rotation.y - 6.3;
        }
        mesh.rotation.x += 0.1 * delta;
        mesh.rotation.y += 0.2 * delta;
        console.log(mesh.rotation);
      });
    }
    controls.update();
  });

  useEffect(() => {
    controls.enableDamping = true;
  });

  const pushToMeshRefs = (ref: Mesh) => {
    ref && meshRefs.current.push(ref);
  };

  return (
    <>
      <mesh ref={pushToMeshRefs} material={material} position={[2, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5, 24, 24]} />
      </mesh>
      <mesh ref={pushToMeshRefs} material={material} position={[-5, 0, 0]}>
        <sphereGeometry />
      </mesh>
      <mesh material={material} position={[-2, 0, 0]} ref={pushToMeshRefs}>
        <torusGeometry args={[0.5, 0.5, 24, 24]} />
      </mesh>
      <mesh material={material} ref={pushToMeshRefs}>
        <planeGeometry args={[0.5, 0.5, 24, 24]} />
      </mesh>
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 0, 4]} intensity={10} />
    </>
  );
};
