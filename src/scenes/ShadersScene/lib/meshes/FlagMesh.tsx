import flagVertexShader from "shaders/flag/vertex.glsl";
import flagFragmentShader from "shaders/flag/fragment.glsl";
import { useEffect, useRef } from "react";
import { BufferAttribute, PlaneGeometry, RawShaderMaterial } from "three";
import { useFrame, useThree } from "@react-three/fiber";

export const FlagMesh = () => {
  const flagGeometryRef = useRef<PlaneGeometry>(null);
  const flagMaterialRef = useRef<RawShaderMaterial>(null);

  useFrame((state) => {
    if (!flagMaterialRef.current) return;
    flagMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  useEffect(() => {
    if (!flagGeometryRef.current) return;
    const { current: flagGeometry } = flagGeometryRef;
    const count = flagGeometry.attributes.position.count;
    const random = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      random[i] = Math.random();
    }
    flagGeometry.setAttribute("aRandom", new BufferAttribute(random, 1));
  }, [flagGeometryRef.current]);

  return (
    <>
      <mesh>
        <planeGeometry ref={flagGeometryRef} args={[1, 0.5, 32, 32]} />
        <rawShaderMaterial
          ref={flagMaterialRef}
          uniforms={{
            uTime: { value: 0 },
          }}
          vertexShader={flagVertexShader}
          fragmentShader={flagFragmentShader}
        />
      </mesh>
    </>
  );
};
