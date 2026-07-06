type BuildModes = "development" | "production";
type BuildPaths = {
  html: string;
  entry: string;
  publicPath: string;
  build: string;
  src: string;
};

type BuildEnv = {
  mode: BuildModes;
  port: number;
};

export default interface BuildOptions {
  mode: BuildModes;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
}
