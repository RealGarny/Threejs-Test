import buildResolvers from "./buildResolvers";
import buildPlugins from "./buildPlugins";
import buildLoaders from "./buildLoaders";
import webpack from "webpack";
import BuildOptions from "./types/buildWebpackConfig";
import buildDevServer from "./buildDevServer";

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
