import webpack from "webpack";
import BuildOptions from "./types/buildWebpackConfig";
import { buildCssLoader } from "./loaders/buildCssLoader";

function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const cssLoader = buildCssLoader(isDev);

  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    exclude: /node_modules/,
    use: ["file-loader"],
  };

  const shaderLoader = {
    test: /\.(glsl|vs|fs|vert|frag)$/i,
    exclude: /node_modules/,
    use: ["raw-loader"],
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [typescriptLoader, cssLoader, svgLoader, fileLoader, shaderLoader];
}

export default buildLoaders;
