import type { Configuration as devServerConfiguration } from "webpack-dev-server";
import type { BuildOptions } from "./types/buildWebpackConfig";

function buildDevServer(options: BuildOptions): devServerConfiguration {
	return {
		port: options.port,
		open: true,
		historyApiFallback: true,
		hot: true,
	};
}

export default buildDevServer;
