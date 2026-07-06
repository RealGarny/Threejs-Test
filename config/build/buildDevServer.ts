import BuildOptions from "./types/buildWebpackConfig";
import type { Configuration as devServerConfiguration } from "webpack-dev-server";

function buildDevServer(options: BuildOptions): devServerConfiguration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
    };
}

export default buildDevServer;
