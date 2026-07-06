import { GroupProps } from "@react-three/fiber";
import { Vector3 } from "three";

export const Bush = (props: GroupProps) => {
  const bushColor = "#89c854";
  return (
    <group {...props}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={bushColor} />
      </mesh>
      <mesh position={[0.3, -0.1, 0]} scale={new Vector3(0.75, 0.75, 0.75)}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={bushColor} />
      </mesh>
      <mesh position={[-0.4, -0.05, 0]} scale={new Vector3(0.8, 0.8, 0.8)}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={bushColor} />
      </mesh>
    </group>
  );
};
