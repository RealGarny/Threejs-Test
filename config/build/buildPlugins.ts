import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import type { BuildOptions } from "./types/buildWebpackConfig";

function buildPlugins({
	paths,
	isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] {
	const plugins: webpack.WebpackPluginInstance[] = [
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].css",
		}),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "public/assets", to: "public" }, // Копирует содержимое папки public в корень сборки
			],
		}),
	];

	if (isDev) {
		plugins.push(new webpack.HotModuleReplacementPlugin());
	}

	return plugins;
}

export default buildPlugins;
