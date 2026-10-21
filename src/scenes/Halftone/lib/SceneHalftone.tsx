import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Color, type IUniform, ShaderMaterial, Uniform, Vector2 } from "three";
import shadingFragmentShader from "@/shaders/halftone/fragment.glsl";
import shadingVertexShader from "@/shaders/halftone/vertex.glsl";
import { ShaderPreview } from "@/shared/components/ShaderPreview";
import type { SceneComponent } from "@/shared/types/sceneTypes";

export const SceneHalftone: SceneComponent = () => {
	const size = useThree((state) => state.size);
	const dpr = useThree((state) => state.viewport.dpr);

	useThree((state) => state.gl.setClearColor(new Color("#26132f")));

	const uniforms = useMemo<Record<string, IUniform>>(
		() => ({
			uColor: new Uniform(new Color("#ff794d")),
			uResolution: new Uniform(new Vector2()),
		}),
		[],
	);

	useEffect(() => {
		uniforms.uResolution.value.set(size.width * dpr, size.height * dpr);
	}, [uniforms, size, dpr]);

	const shadingMaterial = useMemo(
		() =>
			new ShaderMaterial({
				fragmentShader: shadingFragmentShader,
				vertexShader: shadingVertexShader,
				uniforms,
			}),
		[uniforms],
	);

	return <ShaderPreview meshProps={{ material: shadingMaterial }} />;
};
