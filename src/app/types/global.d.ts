declare module "*.scss" {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}

declare module "*.svg" {
	import type React from "react";

	const SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module "*.png" {
	// biome-ignore lint/suspicious/noExplicitAny: type for png file is not important
	const value: any;
	export = value;
}

declare module "*.glsl" {
	const value: string;
	export = value;
}

declare const __IS_DEV__: boolean;
