import { useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, type IUniform, ShaderMaterial, Uniform } from "three";
import shadingFragmentShader from "@/shaders/lightShading/fragment.glsl";
import shadingVertexShader from "@/shaders/lightShading/vertex.glsl";
import { ShaderPreview } from "@/shared/components/ShaderPreview";
import type { SceneComponent } from "@/shared/types/sceneTypes";

export const SceneLighting: SceneComponent = () => {
	useThree((state) => state.gl.setClearColor("rgba(0, 0, 0, 1)"));

	const lightUniforms = useRef<Record<string, IUniform>>({
		uColor: new Uniform(new Color("#ffffff")),
	});

	const shadingMaterial = useMemo(
		() =>
			new ShaderMaterial({
				fragmentShader: shadingFragmentShader,
				vertexShader: shadingVertexShader,
				uniforms: lightUniforms.current,
			}),
		[],
	);

	return <ShaderPreview meshProps={{ material: shadingMaterial }} />;
};
