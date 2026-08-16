import { useThree } from "@react-three/fiber";
import { type FC, useEffect, useMemo } from "react";
import { AdditiveBlending } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { TScene } from "@/shared/types/sceneTypes";

const DIMENSION = 3;

export const GalaxySceneRepeat: FC<TScene> = ({ canvasRef }) => {
	const { gl, camera } = useThree(({ gl, camera }) => ({ gl, camera }));
	const config = useMemo(
		() => ({
			particleCount: 150000,
			particleSize: 0.02,
			branches: 3,
			radius: 5,
			spread: 3,
			spin: 1,
		}),
		[],
	);

	const { positionsArray } = useMemo(() => {
		const positionsArray = new Float32Array(config.particleCount * 3);
		const { branches, spread, radius, spin, particleCount } = config;
		for (let i = 0; i < particleCount; i++) {
			const pointRadius = Math.random() * radius;
			const pointSpin = pointRadius * spin;
			const pointAngle = ((i % branches) / branches) * Math.PI * 2;

			const randomizeNegativity = () => (Math.random() < 0.5 ? -1 : 1);

			const randomX = Math.random() ** spread * randomizeNegativity();
			const randomY = Math.random() ** spread * randomizeNegativity();
			const randomZ = Math.random() ** spread * randomizeNegativity();

			const x = Math.cos(pointAngle + pointSpin) * pointRadius + randomX;
			const y = randomY;
			const z = Math.sin(pointAngle + pointSpin) * pointRadius + randomZ;

			positionsArray.set([x, y, z], i * 3);
		}
		return { positionsArray };
	}, [config]);

	useEffect(() => {
		gl.setClearColor("#000");
		new OrbitControls(camera, canvasRef.current);
	}, [canvasRef, camera, gl]);

	return (
		<>
			<points>
				<bufferGeometry>
					<bufferAttribute
						attach={"attributes-position"}
						count={config.particleCount}
						array={positionsArray}
						itemSize={DIMENSION}
					/>
				</bufferGeometry>
				<pointsMaterial size={config.particleSize} depthWrite={false} blending={AdditiveBlending} />
			</points>
			<spotLight />
		</>
	);
};
