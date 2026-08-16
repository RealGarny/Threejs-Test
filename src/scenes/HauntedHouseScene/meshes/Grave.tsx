import type { MeshProps } from "@react-three/fiber";

export const Grave: React.FC<MeshProps> = (props) => {
	return (
		<mesh {...props}>
			<boxGeometry args={[0.6, 0.8, 0.2]} />
			<meshStandardMaterial color={"#b2b6b1"} />
		</mesh>
	);
};
