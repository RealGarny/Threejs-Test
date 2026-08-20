import { Canvas } from "@react-three/fiber";
import "./styles/index.scss";
import { useRef } from "react";
import { SceneHologramShader } from "@/scenes/HologramShader";

export const App: React.FC = () => {
	const canvas = useRef<HTMLCanvasElement>(null);

	return (
		<Canvas
			gl={{ antialias: true }}
			dpr={[1, 2]}
			ref={canvas}
			camera={{ position: [2, 2, 5] }}
			shadows
		>
			<SceneHologramShader canvasRef={canvas} />
		</Canvas>
	);
};
