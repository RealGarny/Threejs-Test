import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Clock, PointLight } from "three";

export const Ghosts = () => {
  const ghost1Ref = useRef<PointLight>(null);
  const ghost2Ref = useRef<PointLight>(null);
  const ghost3Ref = useRef<PointLight>(null);

  let ghost1Rotation = 0;
  let ghost2Rotation = 0;
  let ghost3Rotation = 0;

  useFrame((state, delta) => {
    if (ghost1Ref.current) {
      const ghost1 = ghost1Ref.current;
      //ghost1.position.x =
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
