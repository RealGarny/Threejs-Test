import type webpack from "webpack";
import buildDevServer from "./buildDevServer";
import buildLoaders from "./buildLoaders";
import buildPlugins from "./buildPlugins";
import buildResolvers from "./buildResolvers";
import type { BuildOptions } from "./types/buildWebpackConfig";

function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
	const { paths, mode, isDev } = options;
	return {
		mode: mode,
		entry: paths.entry,
		output: {
			filename: "[name][contenthash].js",
			//publicPath: paths.publicPath,
			path: paths.build,
			clean: true,
		},
		module: {
			rules: buildLoaders(options),
		},
		devtool: isDev ? "inline-source-map" : undefined,
		plugins: buildPlugins(options),
		resolve: buildResolvers(options),
		devServer: isDev ? buildDevServer(options) : undefined,
	};
}
export default buildWebpackConfig;
