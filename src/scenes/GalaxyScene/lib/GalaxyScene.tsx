import { useThree } from "@react-three/fiber";
import { type FC, useMemo, useRef } from "react";
import { AdditiveBlending, Color, type Points } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { TScene } from "@/shared/types/sceneTypes";

export const GalaxyScene: FC<TScene> = ({ canvasRef }) => {
	const { camera, gl } = useThree(({ camera, gl }) => ({
		camera,
		gl,
	}));
	gl.setClearColor("#000");
	new OrbitControls(camera, canvasRef.current);
	const parameters = useMemo(
		() => ({
			particleCount: 150000,
			radius: 5,
			size: 0.02,
			spin: 1,
			branches: 3,
			randomnessPower: 2,
			colorInside: "#ff6030",
			colorOutside: "#1b3984",
		}),
		[],
	);
	const particleGeometryRef = useRef<Points>(null);

	const { particleColors, particlePositions } = useMemo(() => {
		const colorInside = new Color(parameters.colorInside);
		const colorOutside = new Color(parameters.colorOutside);

		const particleColors = new Float32Array(parameters.particleCount * 3);
		const particlePositions = new Float32Array(parameters.particleCount * 3);
		const { branches, randomnessPower, radius, spin, particleCount } = parameters;

		for (let i = 0; i < particleCount; i++) {
			const pointRadius = Math.random() * radius;
			const pointSpin = pointRadius * spin;
			const pointAngle = ((i % branches) / branches) * Math.PI * 2;

			const randomizeNegativity = () => (Math.random() < 0.5 ? -1 : 1);

			const randomX = Math.random() ** randomnessPower * randomizeNegativity();
			const randomY = Math.random() ** randomnessPower * randomizeNegativity();
			const randomZ = Math.random() ** randomnessPower * randomizeNegativity();

			const x = Math.cos(pointAngle + pointSpin) * pointRadius + randomX;
			const y = randomY;
			const z = Math.sin(pointAngle + pointSpin) * pointRadius + randomZ;

			//color
			const mixedColor = colorInside.clone();
			mixedColor.lerp(colorOutside, pointRadius / radius);

			particleColors.set([mixedColor.r, mixedColor.g, mixedColor.b], i * 3);
			particlePositions.set([x, y, z], i * 3);
		}
		return { particlePositions, particleColors };
	}, [parameters]);

	return (
		<>
			<points ref={particleGeometryRef}>
				<bufferGeometry>
					<bufferAttribute
						attach={"attributes-position"}
						count={parameters.particleCount}
						array={particlePositions}
						itemSize={3}
					/>
					<bufferAttribute
						attach={"attributes-color"}
						count={parameters.particleCount}
						array={particleColors}
						itemSize={3}
					/>
				</bufferGeometry>
				<pointsMaterial
					vertexColors
					size={parameters.size}
					depthWrite={false}
					blending={AdditiveBlending}
				/>
			</points>
			<spotLight />
		</>
	);
};
