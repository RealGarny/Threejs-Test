import { type MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { type FC, useEffect, useMemo, useRef } from "react";
import {
	DoubleSide,
	type IUniform,
	PlaneGeometry,
	RepeatWrapping,
	TextureLoader,
	Uniform,
} from "three";
import coffeeSmokeFragmentShader from "@/shaders/coffeeMug/smoke/fragment.glsl";
import coffeeSmokeVertexShader from "@/shaders/coffeeMug/smoke/vertex.glsl";

const PERLIN_NOISE_PATH = "/public/png/noiseMaps/perlin.png";

export const Smoke: FC<MeshProps> = (props) => {
	const perlinNoise = useLoader(TextureLoader, PERLIN_NOISE_PATH);

	const smokeUniforms = useRef<Record<string, IUniform>>({
		uPerlinNoise: new Uniform(perlinNoise),
		uTime: new Uniform(0),
	});

	const smokeGeometry = useMemo(() => {
		const geom = new PlaneGeometry(1, 1, 16, 64);
		geom.translate(0, 0.5, 0);
		return geom;
	}, []);

	useEffect(() => {
		perlinNoise.wrapS = RepeatWrapping;
		perlinNoise.wrapT = RepeatWrapping;

		return () => perlinNoise.dispose();
	}, [perlinNoise]);

	useEffect(() => {
		return () => smokeGeometry.dispose();
	}, [smokeGeometry]);

	useFrame(({ clock }) => {
		smokeUniforms.current.uTime.value = clock.getElapsedTime();
	});

	return (
		<mesh scale={[1.5, 6, 1.5]} geometry={smokeGeometry} {...props}>
			<shaderMaterial
				vertexShader={coffeeSmokeVertexShader}
				fragmentShader={coffeeSmokeFragmentShader}
				uniforms={smokeUniforms.current}
				transparent
				depthWrite={false}
				side={DoubleSide}
			/>
		</mesh>
	);
};
