import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
	AdditiveBlending,
	BufferAttribute,
	BufferGeometry,
	Color,
	GLSL3,
	ImageLoader,
	Uniform,
	Vector2,
} from "three";
import fireworkFragmentShader from "@/shaders/fireworks/fragment.glsl";
import fireworkVertexShader from "@/shaders/fireworks/vertex.glsl";
import { OrbitControls } from "@/shared/components/OrbitControls";
import type { SceneComponent } from "@/shared/types/sceneTypes";
import { buildArrayTexture } from "../helpers/buildArrayTexture";

export const PARTICLE_URLS = Array.from(
	{ length: 8 },
	(_, i) => `public/png/particles/${i + 1}.png`,
);
const MAX_FIREWORKS = 16;
const PARTICLES_PER_FIREWORK = 1200;
const DURATION = 3;

const createGeometry = () => {
	const totalParticlesCount = MAX_FIREWORKS * PARTICLES_PER_FIREWORK;

	const positions = new Float32Array(totalParticlesCount * 3);
	const sizes = new Float32Array(totalParticlesCount);
	const timeMultipliers = new Float32Array(totalParticlesCount);
	const fireworkIndices = new Float32Array(totalParticlesCount);

	for (let i = 0; i < totalParticlesCount; i++) {
		const i3 = i * 3;

		const u = Math.random() * 2 - 1;
		const phi = Math.random() * Math.PI * 2;
		const s = Math.sqrt(1 - u * u);
		const jitter = 0.75 + Math.random() * 0.25;

		positions[i3] = s * Math.cos(phi) * jitter;
		positions[i3 + 1] = u * jitter;
		positions[i3 + 2] = s * Math.sin(phi) * jitter;

		sizes[i] = Math.random();
		timeMultipliers[i] = 1 + Math.random();
		fireworkIndices[i] = Math.floor(i / PARTICLES_PER_FIREWORK);
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute("position", new BufferAttribute(positions, 3));
	geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
	geometry.setAttribute("aTimeMultiplier", new BufferAttribute(timeMultipliers, 1));
	geometry.setAttribute("aFirework", new BufferAttribute(fireworkIndices, 1));

	return geometry;
};

export const SceneFireworks: SceneComponent = () => {
	const gl = useThree((state) => state.gl);
	const size = useThree((state) => state.size);
	const dpr = useThree((state) => state.viewport.dpr);

	const images = useLoader(ImageLoader, PARTICLE_URLS);

	const geometry = useMemo(createGeometry, []);
	const arrayTexture = useMemo(() => buildArrayTexture(images), [images]);

	const uniforms = useMemo(
		() => ({
			uResolution: new Uniform(new Vector2()),
			uTextures: new Uniform(arrayTexture),
			uTime: new Uniform(0),
			uDuration: new Uniform(DURATION),
			uOrigin: new Uniform(new Float32Array(MAX_FIREWORKS * 3)),
			uColor: new Uniform(new Float32Array(MAX_FIREWORKS * 3)),
			uStartTime: new Uniform(new Float32Array(MAX_FIREWORKS).fill(-1000)),
			uRadius: new Uniform(new Float32Array(MAX_FIREWORKS)),
			uSize: new Uniform(new Float32Array(MAX_FIREWORKS)),
			uTextureIndex: new Uniform(new Float32Array(MAX_FIREWORKS)),
		}),
		[arrayTexture],
	);

	useEffect(() => {
		uniforms.uResolution.value.set(size.width * dpr, size.height * dpr);
	}, [uniforms, size, dpr]);

	const slot = useRef(0);
	const scratchColor = useMemo(() => new Color(), []);

	useEffect(() => {
		gl.setClearColor("000");
	}, [gl]);

	useEffect(() => {
		const launch = () => {
			const i = slot.current;
			slot.current = (i + 1) % MAX_FIREWORKS;
			const i3 = i * 3;

			uniforms.uOrigin.value[i3] = (Math.random() - 0.5) * 2;
			uniforms.uOrigin.value[i3 + 1] = Math.random();
			uniforms.uOrigin.value[i3 + 2] = (Math.random() - 0.5) * 2;

			scratchColor.setHSL(Math.random(), 1, 0.7);
			uniforms.uColor.value[i3] = scratchColor.r;
			uniforms.uColor.value[i3 + 1] = scratchColor.g;
			uniforms.uColor.value[i3 + 2] = scratchColor.b;

			uniforms.uRadius.value[i] = 0.5 + Math.random();
			uniforms.uSize.value[i] = 0.1 + Math.random() * 0.1;
			uniforms.uTextureIndex.value[i] = Math.floor(Math.random() * arrayTexture.image.depth);
			uniforms.uStartTime.value[i] = uniforms.uTime.value;
		};

		launch();
		gl.domElement.addEventListener("pointerdown", launch);
		return () => gl.domElement.removeEventListener("pointerdown", launch);
	}, [gl, uniforms, arrayTexture, scratchColor]);

	useEffect(
		() => () => {
			geometry.dispose();
			arrayTexture.dispose();
		},
		[geometry, arrayTexture],
	);
	useFrame((state) => {
		uniforms.uTime.value = state.clock.elapsedTime;
	});

	return (
		<>
			<OrbitControls />
			<points geometry={geometry} frustumCulled={false}>
				<shaderMaterial
					vertexShader={fireworkVertexShader}
					fragmentShader={fireworkFragmentShader}
					glslVersion={GLSL3}
					defines={{ MAX_FIREWORKS }}
					uniforms={uniforms}
					transparent
					depthWrite={false}
					blending={AdditiveBlending}
				/>
			</points>
		</>
	);
};
