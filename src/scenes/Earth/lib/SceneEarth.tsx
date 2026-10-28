import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
	BackSide,
	Color,
	IcosahedronGeometry,
	type IUniform,
	Mesh,
	MeshBasicMaterial,
	ShaderMaterial,
	SphereGeometry,
	Spherical,
	SRGBColorSpace,
	TextureLoader,
	Uniform,
	Vector3,
} from "three";
import atmosphereFragmentShader from "@/shaders/atmosphere/fragment.glsl";
import atmosphereVertexShader from "@/shaders/atmosphere/vertex.glsl";
import earthFragmentShader from "@/shaders/earth/fragment.glsl";
import earthVertexShader from "@/shaders/earth/vertex.glsl";
import { OrbitControls } from "@/shared/components/OrbitControls";
import type { SceneComponent } from "@/shared/types/sceneTypes";

const EARTH_DAY_PATH = "/public/jpg/textures/earth/day.jpg";
const EARTH_NIGHT_PATH = "/public/jpg/textures/earth/night.jpg";
const EARTH_SPECULAR_CLOUDS_PATH = "/public/jpg/textures/earth/specularClouds.jpg";

export const SceneEarth: SceneComponent = () => {
	useThree((state) => state.gl.setClearColor("rgba(0, 0, 0, 1)"));

	const earthDayTexture = useLoader(TextureLoader, EARTH_DAY_PATH);
	const earthNightTexture = useLoader(TextureLoader, EARTH_NIGHT_PATH);
	const earthSpecularCloudsTexture = useLoader(TextureLoader, EARTH_SPECULAR_CLOUDS_PATH);

	const lightParams = useMemo(
		() => ({
			spherical: new Spherical(1, Math.PI * 0.5, 0.5),
			direction: new Vector3(),
			mesh: new Mesh(new IcosahedronGeometry(0.1, 2), new MeshBasicMaterial()),
		}),
		[],
	);

	const earthUniforms = useRef<Record<string, IUniform>>({
		uDayTexture: new Uniform(earthDayTexture),
		uNightTexture: new Uniform(earthNightTexture),
		uSpecularCloudsTexture: new Uniform(earthSpecularCloudsTexture),
		uSunDirection: new Uniform(lightParams.direction),
		uAtmosphereDayColor: new Uniform(new Color("#00aaff")),
		uAtmposphereNightColor: new Uniform(new Color("#ff6600")),
	});

	const atmosphereUniforms = useRef<Record<string, IUniform>>({
		uSunDirection: new Uniform(lightParams.direction),
		uAtmosphereDayColor: new Uniform(new Color("#00aaff")),
		uAtmposphereNightColor: new Uniform(new Color("#ff6600")),
	});

	const shadingMaterial = useMemo(
		() =>
			new ShaderMaterial({
				fragmentShader: earthFragmentShader,
				vertexShader: earthVertexShader,
				uniforms: earthUniforms.current,
			}),
		[],
	);

	const earth = useMemo(() => {
		const earthGeometry = new SphereGeometry(2, 64, 64);
		const mesh = new Mesh(earthGeometry, shadingMaterial);

		const atmosphere = new Mesh(
			earthGeometry,
			new ShaderMaterial({
				side: BackSide,
				transparent: true,
				vertexShader: atmosphereVertexShader,
				fragmentShader: atmosphereFragmentShader,
				uniforms: atmosphereUniforms.current,
			}),
		);
		atmosphere.scale.set(1.04, 1.04, 1.04);

		return {
			mesh,
			atmosphere,
		};
	}, [shadingMaterial]);

	useEffect(() => {
		lightParams.direction.setFromSpherical(lightParams.spherical);

		lightParams.mesh.position.copy(lightParams.direction).multiplyScalar(5);
	}, [lightParams]);

	useEffect(() => {
		earthDayTexture.colorSpace = SRGBColorSpace;
		earthDayTexture.anisotropy = 8;
		earthNightTexture.colorSpace = SRGBColorSpace;
		earthDayTexture.anisotropy = 8;
		earthSpecularCloudsTexture.colorSpace = SRGBColorSpace;
		earthSpecularCloudsTexture.anisotropy = 8;
	}, [earthDayTexture, earthNightTexture, earthSpecularCloudsTexture]);

	useFrame((_, delta) => {
		earth.mesh.rotateY(0.1 * delta);
	});

	return (
		<>
			<OrbitControls />
			<primitive object={lightParams.mesh} />
			<primitive object={earth.mesh} />
			<primitive object={earth.atmosphere} />
		</>
	);
};
