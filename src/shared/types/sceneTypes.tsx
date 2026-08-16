import type { FC } from "react";

type TScene = {
	canvasRef: React.RefObject<HTMLCanvasElement>;
};

type SceneComponent = FC<TScene>;

export type { SceneComponent, TScene };
